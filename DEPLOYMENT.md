# LunaPatch Deployment Guide

Complete guide for deploying the LunaPatch ecommerce website to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Product data finalized in `src/data/products.json`
- [ ] Images optimized and hosted
- [ ] 3D models prepared (optional)
- [ ] SEO meta tags configured for all pages
- [ ] Analytics tracking ID added
- [ ] Test checkout flow
- [ ] Run production build locally: `npm run build`
- [ ] Test production build: `npm run preview`

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the best experience for React/Vite applications with zero configuration.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

From your project directory:

```bash
vercel
```

Follow the prompts:
- Set up and deploy: Yes
- Which scope: Select your account
- Link to existing project: No
- Project name: lunapatch (or your preferred name)
- Directory: `./` (current directory)
- Override settings: No

#### Step 4: Set Environment Variables

Via CLI:
```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production
vercel env add VITE_GA_TRACKING_ID production
```

Or via Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable for Production, Preview, and Development

#### Step 5: Deploy to Production

```bash
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

#### Custom Domain

1. Go to your project in Vercel Dashboard
2. Click "Domains"
3. Add your custom domain (e.g., `lunapatch.com`)
4. Update DNS records as instructed
5. Vercel will automatically provision SSL certificate

---

### Option 2: Netlify

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify

```bash
netlify login
```

#### Step 3: Initialize Site

```bash
netlify init
```

#### Step 4: Configure Build Settings

Create `netlify.toml` in your project root (already included):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Step 5: Set Environment Variables

Via CLI:
```bash
netlify env:set VITE_SUPABASE_URL "your_value"
netlify env:set VITE_SUPABASE_ANON_KEY "your_value"
netlify env:set VITE_STRIPE_PUBLISHABLE_KEY "your_value"
netlify env:set VITE_GA_TRACKING_ID "your_value"
```

Or via Netlify Dashboard:
1. Go to Site Settings > Environment Variables
2. Add each variable

#### Step 6: Deploy

```bash
netlify deploy --prod
```

Your site will be live at: `https://your-site.netlify.app`

---

### Option 3: Manual Deployment (VPS/Cloud)

For deployment on your own server:

#### Step 1: Build the Project

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

#### Step 2: Upload to Server

Upload the `dist/` folder contents to your web server directory:

```bash
scp -r dist/* user@your-server:/var/www/lunapatch/
```

#### Step 3: Configure Web Server

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name lunapatch.com www.lunapatch.com;

    root /var/www/lunapatch;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache Configuration (.htaccess):**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

#### Step 4: SSL Certificate

Install Let's Encrypt SSL:

```bash
sudo certbot --nginx -d lunapatch.com -d www.lunapatch.com
```

---

## Post-Deployment

### 1. Verify Deployment

Check the following:
- [ ] All pages load correctly
- [ ] Navigation works (no 404s on refresh)
- [ ] 3D elements render properly
- [ ] Cart persists across page reloads
- [ ] Checkout flow completes
- [ ] Mobile responsiveness
- [ ] Images load correctly
- [ ] SSL certificate is active (HTTPS)

### 2. Test Performance

Use Google PageSpeed Insights:
```
https://pagespeed.web.dev/
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### 3. Set Up Monitoring

#### Google Analytics

Add your GA4 tracking code to `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Vercel Analytics

If using Vercel, enable Analytics in project settings.

#### Error Tracking

Consider adding Sentry for error tracking:

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

### 4. Configure CDN

For better global performance:

**Cloudflare:**
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable Auto Minify (JS, CSS, HTML)
4. Enable Brotli compression
5. Set caching rules

### 5. Set Up Backups

- Database: Regular Supabase backups (automatic)
- Code: GitHub repository
- Environment variables: Secure storage

---

## Continuous Deployment

### GitHub Actions (Vercel)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Troubleshooting

### Issue: 404 on Page Refresh

**Solution:** Ensure your hosting platform is configured for SPA routing:
- Vercel: Uses `vercel.json` (already configured)
- Netlify: Uses `netlify.toml` redirects
- Manual: Configure web server rewrites

### Issue: Environment Variables Not Working

**Solution:**
- Ensure variables are prefixed with `VITE_`
- Rebuild after adding variables
- Check they're set in hosting platform

### Issue: Large Bundle Size

**Solution:**
- Implement code splitting
- Lazy load components
- Optimize images
- Review dependencies

### Issue: 3D Models Not Loading

**Solution:**
- Check CORS headers
- Ensure GLB files are in `public/` folder
- Verify file paths
- Check browser console for errors

---

## Performance Optimization

### Image Optimization

Convert images to WebP:
```bash
npm install -g sharp-cli
sharp -i input.jpg -o output.webp -f webp -q 85
```

### Code Splitting

Lazy load heavy components:
```typescript
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
```

### Bundle Analysis

Analyze bundle size:
```bash
npm install -D rollup-plugin-visualizer
```

Add to `vite.config.ts`:
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

---

## Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured
- [ ] API keys not exposed in client code
- [ ] Content Security Policy headers
- [ ] XSS protection headers
- [ ] CORS configured correctly
- [ ] Regular dependency updates

---

## Support & Maintenance

### Regular Updates

- Update dependencies monthly: `npm update`
- Review security vulnerabilities: `npm audit`
- Monitor performance metrics
- Backup data regularly

### Scaling

As traffic grows:
- Enable CDN for static assets
- Implement Redis caching
- Database read replicas
- Load balancing

---

## Contact

For deployment support:
- Email: support@lunapatch.com
- Documentation: See README.md

---

**Last Updated:** 2024
**Version:** 1.0.0
