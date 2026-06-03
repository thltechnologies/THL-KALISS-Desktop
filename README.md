# 🏦 THL-KALIX - Public Testing Instance

Welcome to the public testing repository for **THL-KALIX**! This project provides a plug-and-play Docker Compose environment to quickly evaluate the Multi-Client Core Banking System.

---

## 📋 Prerequisites

To run this environment, you need to have the following installed on your machine:
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

1. **Clone this repository** (or copy `docker-compose.yml` and the `init-db` directory).
2. **Set your Activation Key** in your shell or directly inside the `.env` file:
   Create a `.env` file in the same folder as `docker-compose.yml` and add your key:
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

## 👤 Default Testing Credentials

Once the application is running, you can log in as a **Super Admin**. The default credentials will be sent to you privately along with your **License Activation Key** when you request it.

> [!NOTE]
> Upon logging in for the first time, you will be guided through the **Initial Setup Wizard** to configure your enterprise branding, theme colors, and basic business rules.

---

## 🔧 Configuration Customization

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
