# 🚀 Deployment Guide — Activity Tracker

This guide covers step-by-step instructions for deploying the **Activity Tracker** full-stack application to production.

---

## 📌 Architecture Overview

A production deployment consists of three core components:
1. **Database**: Managed MongoDB cluster (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))
2. **Backend**: Node.js & Express REST API (e.g., [Render](https://render.com), [Railway](https://railway.app), or VPS)
3. **Frontend**: React (Vite) Single Page Application (e.g., [Vercel](https://vercel.com), [Netlify](https://netlify.com))

---

## 🌟 Method 1: The Modern Cloud Stack (Recommended & 100% Free Tier Available)

### Step 1: Set Up MongoDB Atlas (Database)

1. Sign up for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new project and build a cluster (Select **M0 Free Shared Tier**).
3. Under **Database Access**:
   - Create a database user (e.g., `app_user` with a strong password).
4. Under **Network Access**:
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere, required for dynamic cloud hosting providers).
5. Click **Connect** → **Drivers** (Node.js) and copy your connection string:
   ```text
   mongodb+srv://app_user:<password>@cluster0.abcde.mongodb.net/activity_tracker?retryWrites=true&w=majority
   ```
   *(Replace `<password>` with your database user password).*

---

### Step 2: Deploy Backend to Render (or Railway)

1. Push your project code to a **GitHub** repository.
2. Sign in to [Render.com](https://render.com).
3. Click **New +** → **Web Service**.
4. Connect your GitHub repository.
5. Configure the service:
   - **Name**: `activity-tracker-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
6. Under **Environment Variables**, add:
   | Key | Value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGODB_URI` | `mongodb+srv://app_user:password@cluster0.abcde.mongodb.net/activity_tracker` |
   | `JWT_SECRET` | *(Generate a 32+ character random string)* |
   | `JWT_EXPIRE` | `30d` |
   | `CLIENT_URL` | *(Will be your Vercel frontend URL from Step 3)* |
7. Click **Create Web Service**.
8. Once deployed, Render will provide a live URL, for example:
   `https://activity-tracker-api.onrender.com`
   *(Test it by opening `https://activity-tracker-api.onrender.com/api/health`)*.

---

### Step 3: Deploy Frontend to Vercel (or Netlify)

1. Sign in to [Vercel.com](https://vercel.com).
2. Click **Add New...** → **Project** and import your GitHub repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   | Key | Value |
   | :--- | :--- |
   | `VITE_API_BASE_URL` | `https://activity-tracker-api.onrender.com/api` |
   *(Use the Render backend URL from Step 2 with `/api` appended).*
5. Click **Deploy**.
6. Vercel will deploy your site to a global CDN (e.g. `https://activity-tracker.vercel.app`).
7. **Important**: Go back to your Render Backend environment variables and update `CLIENT_URL` to match your Vercel URL (`https://activity-tracker.vercel.app`).

---

## 🐳 Method 2: Single-Server VPS with Docker Compose (DigitalOcean / AWS / Ubuntu)

If you have a Linux server (Ubuntu 22.04 / 24.04 LTS):

### 1. Install Docker & Docker Compose
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose git
sudo systemctl enable --now docker
```

### 2. Clone the Repository & Configure Environment
```bash
git clone https://github.com/your-username/activity-tracker.git
cd activity-tracker
```

Create or adjust `.env` or `backend/.env`:
```bash
nano backend/.env
```
Ensure your `JWT_SECRET` is set securely.

### 3. Launch with Docker Compose
```bash
sudo docker-compose up -d --build
```
This automatically runs:
- MongoDB on port `27017`
- Express API on port `5000`
- React Frontend (Nginx) on port `3000`

### 4. Setup Domain and Free SSL with Nginx & Certbot
Install Nginx on the host:
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

Configure `/etc/nginx/sites-available/activity-tracker`:
```nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:5000/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable site and request SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/activity-tracker /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 📋 Production Checklist

- [ ] MongoDB Atlas IP access whitelist configured (`0.0.0.0/0` or server IP).
- [ ] Strong `JWT_SECRET` set (do not use default development string in production).
- [ ] `VITE_API_BASE_URL` on frontend points to your production backend URL with `/api`.
- [ ] HTTPS (SSL) active on both frontend and backend to allow secure cookies/local storage.
- [ ] SPA routing configured (`vercel.json` and `_redirects` are already included in the `frontend` folder).
