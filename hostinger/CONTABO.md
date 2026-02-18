# Deploy Gold & Silver Rates on Contabo VPS – Step by Step

Contabo offers affordable VPS hosting. Follow these steps to deploy your Next.js app with live API.

---

## Step 1: Buy a Contabo VPS

1. Go to [contabo.com](https://contabo.com)
2. Click **VPS** or **Cloud VPS**
3. Pick a plan (e.g. **VPS S** – lowest tier is enough)
4. Choose **Ubuntu 22.04** or **Ubuntu 24.04**
5. Pick a location close to your users:
   - India/Pakistan → **Mumbai** or **Singapore**
   - Gulf → **Germany** or **Singapore**
6. Complete checkout (card, PayPal, etc.)
7. Wait for the welcome email with:
   - **VPS IP address**
   - **Root password**
   - **SSH port** (usually 22)

---

## Step 2: Connect to Your VPS via SSH

1. Open **Terminal** (Mac/Linux) or **PowerShell** (Windows).

2. Connect:
   ```bash
   ssh root@YOUR_VPS_IP
   ```
   Replace `YOUR_VPS_IP` with the IP from Contabo (e.g. `123.45.67.89`).

3. When asked for a password, paste the **root password** from the email.

4. You should see a prompt like:
   ```
   root@vps123456:~#
   ```

---

## Step 3: Update the Server

```bash
apt update && apt upgrade -y
```
Type `Y` and press Enter if asked to confirm. Wait for it to finish.

---

## Step 4: Install Node.js (via NVM)

```bash
# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js 20
nvm install 20
nvm use 20

# Verify
node -v
npm -v
```
You should see something like `v20.x.x` for Node.

---

## Step 5: Install PM2 (Process Manager)

```bash
npm install -g pm2
```
PM2 keeps your app running after you disconnect and after reboot.

---

## Step 6: Clone Your Project

```bash
cd /var
mkdir -p www
cd www
git clone https://github.com/YOUR_USERNAME/Gold-&-Silver-Rates-Website.git
cd "Gold-&-Silver-Rates-Website"
```
- Replace with your actual GitHub repo URL.
- If the repo is private, you’ll need to set up SSH keys or a token on the server.

---

## Step 7: Install Dependencies and Build

```bash
npm install
npm run build
```
Wait for the build to finish.

---

## Step 8: Add Environment Variables

```bash
nano .env.local
```

Paste your env vars (use your real keys):

```
GOLD_API_COM_KEY=your_gold_api_key_here
GOLDAPI_KEY=your_goldapi_key_here
```

Then save: `Ctrl+O`, Enter, then `Ctrl+X`.

---

## Step 9: Start the App with PM2

```bash
pm2 start npm --name "gold-silver" -- start
pm2 save
pm2 startup
```

Run the command that `pm2 startup` outputs (something like `sudo env PATH=...`). This makes the app start automatically on reboot.

Check that it’s running:

```bash
pm2 status
```

---

## Step 10: Install Nginx (Reverse Proxy)

```bash
apt install nginx -y
```

---

## Step 11: Configure Nginx

```bash
nano /etc/nginx/sites-available/default
```

Delete everything and replace with:

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

Replace `yourdomain.com` with your real domain. Save and exit.

Test and restart Nginx:

```bash
nginx -t
systemctl restart nginx
```

---

## Step 12: Add SSL (HTTPS)

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Use your real domain again. Follow the prompts (email, agree to terms). Certbot will get a free SSL cert and adjust Nginx.

---

## Step 13: Point Your Domain to Contabo

In your domain registrar (e.g. Hostinger Domains, GoDaddy, Namecheap):

1. Open **DNS** or **Nameservers**.
2. Add an **A record**:
   - Name: `@` (or blank)
   - Value: **Your Contabo VPS IP**
   - TTL: 3600 (or default)
3. Add another **A record**:
   - Name: `www`
   - Value: **Your Contabo VPS IP**
   - TTL: 3600

DNS can take 5 minutes to 48 hours to update.

---

## Step 14: Test Your Site

1. Open a browser.
2. Go to `https://yourdomain.com`
3. You should see:
   - Home page with live gold/silver prices
   - Country pages (India, Pakistan, etc.)
   - API working at `https://yourdomain.com/api/rates/home`

---

## Useful Commands

| Command | Purpose |
|---------|---------|
| `pm2 status` | Check if app is running |
| `pm2 logs gold-silver` | View app logs |
| `pm2 restart gold-silver` | Restart app after code changes |
| `pm2 stop gold-silver` | Stop the app |
| `pm2 start gold-silver` | Start the app again |

---

## Updating Your Site

```bash
cd /var/www/Gold-&-Silver-Rates-Website
git pull
npm install
npm run build
pm2 restart gold-silver
```

---

## Troubleshooting

| Issue | What to try |
|-------|-------------|
| Site not loading | Check `pm2 status` and `pm2 logs gold-silver` |
| 502 Bad Gateway | App not running. `pm2 restart gold-silver` |
| No HTTPS | Make sure Certbot finished. `certbot certificates` |
| Wrong prices / API error | Check `.env.local` and restart: `pm2 restart gold-silver` |
| Can’t connect via SSH | Verify IP and firewall in Contabo panel |

---

## Firewall (Optional but Recommended)

```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```
