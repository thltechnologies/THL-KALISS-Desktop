# 🏦 THL-KALIX - Public Testing Instance

Welcome to the public testing repository for **THL-KALIX**! This project provides a plug-and-play Docker Compose environment to quickly evaluate the Multi-Client Core Banking System.

---

## 📋 Prerequisites

To run the application, choose one of the options below:

### Option 1: Native Desktop Installer (Recommended - Zero-Configuration)
- **None!** The desktop installer bundles everything automatically (embedded database, JRE, and frontend). Simply download and run.

### Option 2: Standalone JAR
- **Java Runtime Environment (JRE) 17** or higher installed on your machine.
- A running **PostgreSQL** database (version 15 or higher).

### Option 3: Docker Compose (Alternative)
- [Docker](https://www.docker.com/products/docker-desktop/) (v20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0 or higher)

---

## 🔐 License Activation Key

To run the application, you must provide a valid **Activation Key**. The application will not start without one.

### How to request a key:
Send an email to **contact@thltechnologies.com** with the subject **"THL-KALIX Public Testing Key Request"**. Please include:
- Your name/organization.
- The purpose of your test.

You will receive a temporary license key valid for testing.

---

## 🚀 Quick Start

### Method 1: Install via Native Desktop Installer (Recommended)

1. **Download the installer**:
   Download the installer for your platform (`THL-KALIX-Setup.exe` for Windows or `THL-KALIX.dmg` for macOS) from our releases page or server.
2. **Install and Launch**:
   Double-click the downloaded file and follow the standard installation prompts.
3. **Activation Key**:
   Set the `KALIX_LICENSE_KEY` environment variable on your system, or follow the onscreen activation prompts.
4. **Usage**:
   The desktop app will automatically spin up its own database and launch the core banking interface.

---

### Method 2: Run via Standalone JAR

1. **Download the executable JAR**:
   [Download corebanking-testing.jar](https://github.com/thltechnologies/THL-KALIX/releases) (or download it from your server/release page).
2. **Configure your database**:
   Create a database named `corebanking` in your PostgreSQL instance.
3. **Run the application**:
   Set the required environment variables in your command terminal and start the JAR:
   
   **Windows (Command Prompt)**:
   ```cmd
   set KALIX_LICENSE_KEY=your_received_jwt_activation_key_here
   set SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/corebanking
   set SPRING_DATASOURCE_USERNAME=your_db_username
   set SPRING_DATASOURCE_PASSWORD=your_db_password
   java -jar corebanking-testing.jar
   ```

   **Linux / macOS (Bash)**:
   ```bash
   export KALIX_LICENSE_KEY="your_received_jwt_activation_key_here"
   export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/corebanking"
   export SPRING_DATASOURCE_USERNAME="your_db_username"
   export SPRING_DATASOURCE_PASSWORD="your_db_password"
   java -jar corebanking-testing.jar
   ```
4. **Access the application**:
   Open [http://localhost:8080](http://localhost:8080) in your browser.

---

### Method 3: Run via Docker Compose

1. **Clone this repository** (or copy `docker-compose.yml` and the `init-db` directory).
2. **Set your Activation Key** in your shell or directly inside a `.env` file in the same folder as `docker-compose.yml`:
   ```env
   KALIX_LICENSE_KEY=your_received_jwt_activation_key_here
   ```
3. **Start the stack**:
   ```bash
   docker-compose up -d
   ```
4. **Access the application**:
   - **Frontend UI**: Open [http://localhost](http://localhost) in your browser.
   - **Backend API Docs**: Open [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html).

---

## 👤 Default Testing Credentials

Once the application is running, you can log in as a **Super Admin**. The default credentials will be sent to you privately along with your **License Activation Key** when you request it.

> [!NOTE]
> Upon logging in for the first time, you will be guided through the **Initial Setup Wizard** to configure your enterprise branding, theme colors, and basic business rules.

---

## 🔧 Configuration Customization (For Docker Compose)

If you need to change ports or database settings, customize the environment variables in your `.env` file or modify `docker-compose.yml`:

| Service | Setting | Description | Default |
|---------|---------|-------------|---------|
| **Database** | `POSTGRES_DB` | Database name | `corebanking` |
| **Database** | `POSTGRES_USER` | Database username | `corebanking` |
| **Database** | `POSTGRES_PASSWORD`| Database password | `corebanking` |
| **Backend** | `SPRING_PROFILES_ACTIVE`| Configuration profile | `prod` |

---

## 📞 Support & Feedback

If you experience any issues or have questions, please reach out to us at:
- **Email**: contact@thltechnologies.com
- **Website**: [THL Technologies](https://thltechnologies.com)
