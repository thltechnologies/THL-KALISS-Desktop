const { app, BrowserWindow, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

let mainWindow;
let backendProcess;
const backendPort = 8080;
const healthUrl = `http://localhost:${backendPort}/actuator/health`;

const fs = require('fs');

function getJavaExecutablePath() {
    const isWin = process.platform === 'win32';
    const binaryName = isWin ? 'java.exe' : 'java';

    // 1. Try JAVA_HOME
    if (process.env.JAVA_HOME) {
        const javaHomePath = path.join(process.env.JAVA_HOME, 'bin', binaryName);
        if (fs.existsSync(javaHomePath)) {
            return javaHomePath;
        }
    }

    // 2. Try common Windows paths
    if (isWin) {
        const commonPaths = [
            'C:\\Program Files\\Java\\jdk-21.0.11\\bin\\java.exe',
            'C:\\Program Files\\Java\\latest\\bin\\java.exe',
            'C:\\Program Files\\Common Files\\Oracle\\Java\\javapath\\java.exe',
            'C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath\\java.exe'
        ];
        for (const p of commonPaths) {
            if (fs.existsSync(p)) {
                return p;
            }
        }
    }

    // 3. Fallback to global command
    return binaryName;
}

function startBackend() {
    const jarPath = app.isPackaged
        ? path.join(process.resourcesPath, 'corebanking-testing.jar')
        : path.join(__dirname, 'corebanking-testing.jar');
    console.log(`Starting backend JAR: ${jarPath}`);

    // Read license key from environment variable or local license.key file
    let licenseKey = process.env.KALISS_LICENSE_KEY || '';
    const licenseFilePath = app.isPackaged
        ? path.join(path.dirname(process.execPath), 'license.key')
        : path.join(__dirname, 'license.key');

    if (fs.existsSync(licenseFilePath)) {
        try {
            licenseKey = fs.readFileSync(licenseFilePath, 'utf8').trim();
            console.log(`Loaded license key from local license.key file: ${licenseFilePath}`);
        } catch (err) {
            console.error("Failed to read local license.key file:", err);
        }
    }

    // Find the java executable path to avoid shell spawn issues on Windows
    const javaBin = getJavaExecutablePath();
    console.log(`Using Java executable: ${javaBin}`);

    // Set up environment with custom properties
    const envCopy = { ...process.env };
    envCopy.KALISS_LICENSE_KEY = licenseKey;

    // Spawn the Spring Boot backend
    const cwdPath = app.isPackaged ? process.resourcesPath : __dirname;
    backendProcess = spawn(javaBin, ['-Dspring.profiles.active=test', '-jar', jarPath], {
        cwd: cwdPath,
        env: envCopy
    });

    backendProcess.stdout.on('data', (data) => {
        console.log(`[Backend]: ${data}`);
    });

    backendProcess.stderr.on('data', (data) => {
        console.error(`[Backend-Error]: ${data}`);
    });

    backendProcess.on('close', (code) => {
        console.log(`Backend process exited with code ${code}`);
        if (code !== 0) {
            dialog.showErrorBox(
                'Application Startup Error',
                'The core banking backend has stopped unexpectedly.\n\n' +
                'Please check the logs or contact support if the problem persists.'
            );
            app.quit();
        }
    });
}

function checkBackendHealth(callback) {
    const request = http.get(healthUrl, (res) => {
        if (res.statusCode === 200) {
            callback(true);
        } else {
            callback(false);
        }
    });

    request.on('error', () => {
        callback(false);
    });

    request.end();
}

function pollBackend(onReady) {
    let attempts = 0;
    const maxAttempts = 180; // 180 seconds timeout
    const interval = setInterval(() => {
        attempts++;
        checkBackendHealth((isHealthy) => {
            if (isHealthy) {
                clearInterval(interval);
                onReady();
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                dialog.showErrorBox(
                    'Timeout Error',
                    'The backend server took too long to start. The application will close.'
                );
                app.quit();
            }
        });
    }, 1000);
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        title: 'THL-KALISS Core Banking',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadURL(`http://localhost:${backendPort}`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    // 1. Start the Java backend child process
    startBackend();

    // 2. Wait for backend to be online before showing UI window
    pollBackend(() => {
        createWindow();
    });
});

app.on('window-all-closed', () => {
    // Kill the backend process when app windows are closed
    if (backendProcess) {
        backendProcess.kill();
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('quit', () => {
    if (backendProcess) {
        backendProcess.kill();
    }
});
