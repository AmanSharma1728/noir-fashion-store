# 🛍️ Noir Fashion Store: Full-Stack Monorepo

Welcome to **Noir**, a sleek e-commerce foundation built with a focus on modularity and clean code. This project is structured as a **Monorepo** to provide a high-performance development workflow for both the frontend and backend.

## 🏗️ Architecture & Engineering
Instead of a monolithic mess, this project is built to be **scalable and maintainable**:
* **Decoupled Design:** A clear boundary between the Node.js API and the client-side UI.
* **Monorepo Workflow:** Managed with `NPM` and `Concurrently` to simplify local development.
* **Clean Code:** Implementation follows basic **SOLID principles** to ensure the codebase remains readable as features are added.

---

## 🛠️ Current Tech Stack
* **Frontend:** Angular (TypeScript, SCSS/BEM)
* **Backend:** Node.js & Express (RESTful API)
* **Dev Tools:** Concurrently (Multi-process management), NPM Scripts

---

## 📂 Project Structure
```text
noir-fashion-store/
├── client/          # Angular Frontend (UI & Styling)
├── server/          # Node.js & Express Backend (API Logic)
├── package.json     # Root configuration & Automation scripts
└── README.md        # You are here
```

---

## 🚀 Quick Start (Local Setup)

Get the environment running in seconds:

### 1. Install Dependencies
Run this in the root folder to handle both the server and the client:
```bash
npm run install-all
```

### 2. Launch Development Servers
Start the Express API and the Angular dev server simultaneously:
```bash
npm run dev
```
* **Frontend:** `http://localhost:4200`
* **Backend API:** `http://localhost:5000`
