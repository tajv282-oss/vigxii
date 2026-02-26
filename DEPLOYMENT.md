# VIGXII Visuals — Deployment Guide

> **Backend → Render** | **Frontend → Vercel**

---

## Table of Contents
1. [Pre-Deployment Checklist](#1-pre-deployment-checklist)
2. [Deploy Backend to Render](#2-deploy-backend-to-render)
3. [Deploy Frontend to Vercel](#3-deploy-frontend-to-vercel)
4. [Connect Frontend to Backend](#4-connect-frontend-to-backend)
5. [Environment Variables Reference](#5-environment-variables-reference)
6. [Post-Deployment Checklist](#6-post-deployment-checklist)

---

## 1. Pre-Deployment Checklist

### Push your code to GitHub
```bash
cd D:\vigxii
git init                          # skip if already a git repo
git add .
git commit -m "ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/vigxii.git
git push -u origin main
```

### Add a `start` script to `server/package.json`
Open `server/package.json` and make sure `scripts` has a start command:
```json
"scripts": {
  "start": "node index.js"
}
```

### Update CORS in `server/index.js`
After you know your Vercel URL (e.g. `https://vigxii.vercel.app`), update the CORS config:
```js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://vigxii.vercel.app',           // ← your Vercel URL
    'https://www.vigxii.com'               // ← your custom domain (if any)
  ],
  credentials: true,
}));
```
Commit and push after this change.

---

## 2. Deploy Backend to Render

### Step-by-step

1. Go to **https://render.com** → Sign in / Sign up (use GitHub)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository → select `vigxii`
4. Configure the service:

| Setting | Value |
|---|---|
| **Name** | `vigxii-backend` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` |
| **Instance Type** | Free (or Starter for always-on) |

5. Click **Advanced** → **Add Environment Variables** and add each variable from the table in [Section 5](#5-environment-variables-reference).

6. Click **Create Web Service**

7. Wait for the build to complete. Your backend URL will be:
   ```
   https://vigxii-backend.onrender.com
   ```
   (Copy this — you need it for the frontend.)

> ⚠️ **Free tier note:** Render free instances spin down after 15 minutes of inactivity. First request after idle may take ~30 seconds. Upgrade to Starter ($7/mo) to avoid this.

---

## 3. Deploy Frontend to Vercel

### Step-by-step

1. Go to **https://vercel.com** → Sign in / Sign up (use GitHub)
2. Click **Add New** → **Project**
3. Import your GitHub repository `vigxii`
4. Configure the project:

| Setting | Value |
|---|---|
| **Framework Preset** | `Create React App` |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |

5. Under **Environment Variables**, add:

| Key | Value |
|---|---|
| `REACT_APP_API_URL` | `https://vigxii-backend.onrender.com/api` |

6. Click **Deploy**

7. Your frontend URL will be:
   ```
   https://vigxii.vercel.app
   ```

### Add `vercel.json` for client-side routing
Create the file `client/vercel.json` so React Router works on page refresh:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Commit and push this file before or after deploying — Vercel will auto-redeploy.

---

## 4. Connect Frontend to Backend

The `client/src/services/api.js` already reads:
```js
const API_BASE = process.env.REACT_APP_API_URL || '/api';
```

As long as `REACT_APP_API_URL` is set to your Render backend URL in Vercel's environment variables, all API calls will route correctly.

### Update CORS on backend (important!)
Once you have your Vercel URL, go to Render → your service → **Environment** and add/update:
```
FRONTEND_URL = https://vigxii.vercel.app
```

And update `server/index.js` CORS as shown in Section 1, then redeploy.

---

## 5. Environment Variables Reference

### Backend (Render)

| Variable | Value / Where to get it |
|---|---|
| `PORT` | `5000` (Render sets its own PORT automatically) |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | MongoDB Atlas connection string (from Atlas → Connect) |
| `CLOUDINARY_CLOUD_NAME` | From https://console.cloudinary.com |
| `CLOUDINARY_API_KEY` | From Cloudinary console |
| `CLOUDINARY_API_SECRET` | From Cloudinary console |
| `FIREBASE_PROJECT_ID` | `vigxii-visuals` |
| `FIREBASE_CLIENT_EMAIL` | From Firebase Console → Project Settings → Service Accounts |
| `FIREBASE_PRIVATE_KEY` | Full private key string including `-----BEGIN PRIVATE KEY-----` |
| `ADMIN_EMAILS` | Comma-separated admin email(s) |

> ⚠️ For `FIREBASE_PRIVATE_KEY` on Render, paste the raw value with actual newlines (not `\n` escaped). Render handles multiline env vars correctly in the dashboard.

### Frontend (Vercel)

| Variable | Value |
|---|---|
| `REACT_APP_API_URL` | `https://vigxii-backend.onrender.com/api` |

---

## 6. Post-Deployment Checklist

- [ ] Visit your Vercel URL and confirm the homepage loads
- [ ] Check Films, Portfolio, Testimonials pages load data
- [ ] Submit the Contact form and verify it sends
- [ ] Log in to Admin panel (`/admin`) and confirm Firebase auth works
- [ ] Upload a test image and confirm Cloudinary upload works
- [ ] Test on mobile browser
- [ ] (Optional) Add a custom domain in Vercel Settings → Domains

### Custom Domain (optional)
1. In Vercel → Project → **Settings → Domains** → add `www.vigxii.com`
2. Update your domain's DNS:
   - Add a `CNAME` record: `www` → `cname.vercel-dns.com`
   - Or `A` record for apex domain: `76.76.21.21`
3. Update CORS on Render to include `https://www.vigxii.com`

---

## Quick Reference

```
Frontend (Vercel):  https://vigxii.vercel.app
Backend (Render):   https://vigxii-backend.onrender.com
Admin Panel:        https://vigxii.vercel.app/admin
```
