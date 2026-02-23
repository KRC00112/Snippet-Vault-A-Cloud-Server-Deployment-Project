# 📦 Snippet Vault — Cloud Deployment Project

A code snippet manager app deployed on AWS EC2, served over HTTPS at a custom domain. The stack uses **Nginx** as the web server, **Duck DNS** for a free subdomain, and **Let's Encrypt** (via Certbot) for a trusted SSL/TLS certificate.

🌐 **Live site:** [https://snippetvault2138.duckdns.org](https://snippetvault2138.duckdns.org)

---

## 🧩 About the App

**Snippet Vault** is a browser-based code snippet manager that lets developers save, organize, and quickly retrieve reusable code — all in one place.

**Features include:**
- ✏️ **Save snippets:** with a title, programming language tag, and code body
- 🏷️ **Filter by language:** supports JavaScript, Python, Java, C#, C, C++, TypeScript, PHP, Go, and Swift
- 🔍 **Search by title:** to find snippets instantly
- 📋 **Copy to clipboard:** with a single click
- 🗑️ **Delete snippets:** you no longer need
- 💾 **Persistent storage:** via the browser's `localStorage`.Snippets survive page refreshes

---

## 🛠️ Stack Overview

| Layer | Tool |
|---|---|
| ☁️ Cloud Provider | AWS EC2 (Amazon Linux 2023) |
| ⚡ Web Server | Nginx |
| 🦆 Domain | Duck DNS |
| 🔒 SSL/TLS Certificate | Let's Encrypt via Certbot |
| ⚛️ Frontend | React (Vite build) |

---
