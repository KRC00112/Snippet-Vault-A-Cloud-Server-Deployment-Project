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

## 📋 Deployment Overview

The server setup is broken into four parts:

### A. 🖥️ EC2 Instance: Provisioning & SSH Access

A `t3.micro` instance (free tier eligible) was provisioned with the **Amazon Linux 2023** AMI. A security group was configured to allow inbound **SSH (22)**, **HTTP (80)**, and **HTTPS (443)** traffic.

The instance is accessed via SSH using a `.pem` key pair:

```bash
# Fix overly open key permissions
chmod 400 "[private-key].pem"

# Connect to instance
ssh -i "[private-key].pem" [username]@[remote-hostname]
```

> ⚠️ Without `chmod 400`, SSH will refuse the key with a `Permissions too open` error.

---

### B. ⚡ Nginx: Install, Start, and Enable

Nginx was installed via the `dnf` package manager, started immediately, and enabled to run automatically on every boot:

```bash
sudo dnf update -y && sudo dnf install nginx
sudo nginx -v                   # Verify install
sudo systemctl start nginx      # Start the server
sudo systemctl enable nginx     # Auto-start on reboot
```

At this point, visiting `http://[public-ip]` will show the default **"Welcome to nginx!"** page. Confirming the server is live.

---

### C. 🦆🔒 Duck DNS + Let's Encrypt: Custom Domain & HTTPS

At this stage the site is reachable only via a raw IP over plain HTTP. Two things are needed to fix that: a **domain name** and an **SSL/TLS certificate**.

#### 🦆 Duck DNS

SSL/TLS certificates cannot be issued for raw IP addresses. A domain is required first. Duck DNS provides free subdomains.

1. Create an account on duckdns.org
2. Register a unique subdomain (e.g. `snippetvault2138.duckdns.org`)
3. Set the IP field to your EC2 instance's **public IPv4 address**

Now `http://snippetvault2138.duckdns.org` resolves to the same Nginx page.

#### 🔒 Let's Encrypt via Certbot

Certbot was installed into a Python virtual environment and run with the Nginx plugin to automatically obtain and configure a certificate:

```bash
# Install dependencies
sudo dnf install python3 python-devel augeas-devel gcc

# Remove any system-level Certbot to avoid conflicts
sudo dnf remove certbot

# Create a virtual environment and install Certbot
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot certbot-nginx

# Make Certbot accessible system-wide
sudo ln -s /opt/certbot/bin/certbot /usr/local/bin/certbot
```

Before running Certbot, ensure Nginx is configured with the domain name:

```bash
sudo nano /etc/nginx/nginx.conf
```

Inside the `server` block, add:

```nginx
server_name snippetvault2138.duckdns.org;
```

Test and reload Nginx, then run Certbot:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx
```

Certbot will prompt for an email address, Terms of Service agreement, and domain name. After that, it'll handle the rest automatically, including updating the Nginx config to serve HTTPS.

---

### D. 📄 Deploying the React App

With Nginx running and HTTPS configured, the final step is placing the built app files on the server.

By default, Nginx on Amazon Linux 2023 serves content from `/usr/share/nginx/html/`. The default placeholder files look like:

```
404.html  50x.html  icons  index.html  nginx-logo.png  poweredby.png
```

The built React app (output of `npm run build`) was transferred into this directory, replacing the defaults:

```
index.html    assets/
```

Where `assets/` contains the compiled output:

```
assets/index.css    assets/index.js
```

`index.html` is the entry point. The browser automatically loads the CSS and JS bundle from there.

> 🔐 Files in `/usr/share/nginx/html/` are owned by root. Always use `sudo` when writing here, otherwise changes will fail silently or end up in the wrong location.

No Nginx restart is required after deploying files. **Changes are served immediately.**

---

## 📸 Screenshots


---
