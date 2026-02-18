# Deploying Gold & Silver Rates to Hostinger

## Option A: Static HTML Export (Shared Hosting)

Generate a **static HTML export** and upload to Hostinger shared hosting (cPanel). No Node.js needed.

### Steps

1. **Build static export**
   ```bash
   npm run build:static
   ```
   This creates an `out` folder with HTML, CSS, and JS.

2. **Upload to Hostinger**
   - Log into Hostinger **hPanel**
   - Go to **File Manager** → **public_html**
   - Upload **all contents** of the `out` folder (not the folder itself)
   - Or use **FTP/SFTP** with FileZilla or similar

3. **Important limitation**
   Gold and silver prices are **fixed at build time**. To refresh rates, run `npm run build:static` again and re-upload the `out` folder (e.g. daily or weekly).

### What gets excluded for static export

The build script temporarily removes: API routes, Sign-in/Sign-up pages, and Clerk auth. Your main site (home, all country pages) works fully as static HTML.

---

## Option B & C: Node.js Hosting

If you need **live updating prices** or auth, you need Node.js. Hostinger shared hosting doesn't support it. Use either:

---

## Option B: Hostinger VPS (Node.js on VPS)

If you have or buy a Hostinger **VPS** plan:

### 1. Get VPS Access
- Buy a Hostinger VPS plan (Ubuntu 22.04 or 25.10)
- Note your VPS IP address
- Connect via SSH: `ssh root@YOUR_VPS_IP`

### 2. Install Node.js & PM2
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js (LTS) via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Install PM2 (process manager)
npm install -g pm2
```

### 3. Deploy Your Project
```bash
# Clone your repo (or upload via SFTP/git)
cd /var/www
git clone https://github.com/YOUR_USERNAME/gold-silver-rates.git
cd gold-silver-rates

# Install dependencies and build
npm install
npm run build

# Create .env.local with your API keys (see below)
nano .env.local
```

### 4. Environment Variables
Create `.env.local` on the server with:

```
GOLD_API_COM_KEY=your_key_here
GOLDAPI_KEY=your_goldapi_key_here
# Add Clerk keys if you use auth
```

### 5. Start with PM2
```bash
pm2 start npm --name "gold-silver" -- start
pm2 save
pm2 startup   # Run the command it outputs to start on reboot
```

### 6. Setup Nginx Reverse Proxy
```bash
apt install nginx -y
nano /etc/nginx/sites-available/default
```

Replace with:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
nginx -t && systemctl restart nginx
```

### 7. Add SSL (HTTPS)
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 8. Point Your Hostinger Domain
In Hostinger → Domains → DNS:
- **A record**: `@` → your VPS IP
- **A record**: `www` → your VPS IP

---

## Option C: Vercel + Hostinger Domain (Recommended)

Vercel is built for Next.js and offers a free tier. You keep your Hostinger domain and point it to Vercel.

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Deploy"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Add environment variables (GOLD_API_COM_KEY, GOLDAPI_KEY, etc.)
5. Deploy

### 3. Use Your Hostinger Domain
1. In Vercel: Project → Settings → Domains → Add your domain
2. Vercel will show DNS records to add
3. In Hostinger → Domains → DNS, add the records Vercel provides (usually a CNAME for www, A record for root)

---

## Quick Comparison

| | Static (A) | Hostinger VPS (B) | Vercel (C) |
|---|---|---|---|---|
| Hosting | Shared (cPanel) | VPS | Vercel |
| Cost | Any Hostinger plan | VPS (~$4–20/mo) | Free tier |
| Live prices | No (baked at build) | Yes | Yes |
| Setup | `npm run build:static` + upload | Manual (SSH, Node, PM2) | One-click from GitHub |

---

## After Deployment

1. **Test**: Visit your domain and check all pages (home, India, Pakistan, Saudi, etc.)
2. **API keys**: Ensure `.env` vars are set (never commit them to git)
3. **Updates**: For VPS, `git pull && npm install && npm run build && pm2 restart gold-silver`
