# LunaPatch - Quick Start Guide

Get your LunaPatch ecommerce site running in 5 minutes!

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your site.

## Key Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run typecheck  # Check TypeScript types
npm run lint       # Lint code
```

## Quick Tour

### 1. Home Page
- Visit `/` to see the hero with 3D scene
- Scroll to see product series cards
- View featured products section

### 2. Browse Products
- Visit `/products` to see all products
- Filter by series (Sleep, Focus, Mood)
- Sort by price or rating

### 3. Product Details
- Click any product card
- View interactive 3D model
- Select variants and add to cart

### 4. Shopping Cart
- Cart icon shows item count
- Visit `/cart` to manage items
- Update quantities or remove items

### 5. Checkout
- Click "Proceed to Checkout"
- Fill shipping information
- Complete demo payment

## Customization

### Change Products
Edit `src/data/products.json`:
```json
{
  "id": "your-product",
  "title": "Your Product Name",
  "price": 99,
  ...
}
```

### Change Colors
Edit `src/index.css` CSS variables:
```css
:root {
  --color-lavender: #BDAAFF;
  --color-pale-gold: #F8E7C6;
  ...
}
```

### Add Pages
1. Create component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`:
```typescript
<Route path="/your-page" element={<YourPage />} />
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

That's it! Follow prompts and your site will be live.

## Need Help?

- Full docs: See `README.md`
- Deployment: See `DEPLOYMENT.md`
- Project overview: See `PROJECT_SUMMARY.md`

## What's Included

✅ 11 pages fully functional
✅ 10 demo products with images
✅ Shopping cart with persistence
✅ Interactive 3D graphics
✅ Smooth animations throughout
✅ Mobile responsive
✅ SEO optimized
✅ Accessible (WCAG 2.1)

**Ready to launch!**
