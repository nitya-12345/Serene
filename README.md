# LunaPatch - Premium Aromatherapy Ecommerce Website

A production-ready, premium multi-page ecommerce website for LunaPatch, featuring 3D product visualization, smooth animations, and a complete shopping experience.

![LunaPatch Hero](https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg)

## Features

### Core Functionality
- **Multi-page Navigation**: Home, Products, Product Detail, Cart, Checkout, About, Blog, and more
- **3D Product Visualization**: Interactive 3D models using Three.js and React Three Fiber
- **Shopping Cart**: Persistent cart with Zustand state management
- **Checkout Flow**: Complete checkout process with order confirmation
- **Product Filtering**: Filter by series, sort by price/rating
- **Responsive Design**: Mobile-first, fully responsive across all devices

### Design & UX
- **Premium Aesthetic**: Soothing color palette inspired by wellness
- **Smooth Animations**: Framer Motion for micro-interactions and page transitions
- **3D Hero Scene**: Interactive floating elements with parallax effects
- **Product Cards**: Hover effects with quick-add functionality
- **Accessibility**: WCAG compliant with keyboard navigation and reduced motion support

### Technical Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom design tokens
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **State Management**: Zustand with localStorage persistence
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lunapatch-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory (already provided):
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Project Structure

```
lunapatch-site/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── 3d/         # 3D scene components
│   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   └── ui/         # UI components (Button, ProductCard)
│   ├── data/           # Product data (JSON)
│   ├── pages/          # Route pages
│   ├── store/          # Zustand stores
│   ├── styles/         # Global styles and design tokens
│   ├── App.tsx         # Main app component with routing
│   └── main.tsx        # Application entry point
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # TailwindCSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Design System

### Color Palette

```javascript
Primary Colors:
- Lavender: #BDAAFF (Sleep series, primary buttons)
- Pale Gold: #F8E7C6 (Accents, gradients)
- Cream: #FFF9F2 (Background)
- Soft Gray: #F5F5F7 (Cards, surfaces)
- Deep Charcoal: #111217 (Text)
- Citrus: #FFCE6B (Focus series, highlights)
```

### Typography

- **Headlines**: Poppins (ExtraBold, 800)
- **Body**: Inter (Regular, 400)
- **Scale**: Fluid typography with responsive sizing

### Spacing

Based on an 8px grid system: 4, 8, 16, 24, 32, 48, 64px

### Animation

- **Easing**: `cubic-bezier(0.22, 0.9, 0.2, 1)`
- **Durations**:
  - Fast: 180ms (micro-interactions)
  - Normal: 300ms (standard transitions)
  - Slow: 600-900ms (page reveals)

## Product Data

Products are defined in `src/data/products.json`. Each product includes:

```json
{
  "id": "unique-id",
  "title": "Product Name",
  "slug": "product-slug",
  "series": "Sleep|Focus|Mood|Collection",
  "scent_composition": ["Essential Oil 1", "Essential Oil 2"],
  "description": "Short description",
  "full_description": "Detailed description",
  "variants": [
    {
      "id": "variant-id",
      "name": "Variant Name",
      "price": 80,
      "sku": "SKU-CODE",
      "inventory": 500
    }
  ],
  "images": ["image-url-1", "image-url-2"],
  "glb_model": "model-file.glb",
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "safety_notes": "Safety information",
  "rating": 4.8,
  "reviews_count": 123,
  "featured": true
}
```

### Adding a New Product

1. Open `src/data/products.json`
2. Add a new product object following the schema above
3. Ensure unique `id` and `slug`
4. Add product images (use Pexels URLs or your own)
5. Save the file - changes will reflect immediately

## 3D Models

The site uses Three.js for 3D visualization. Current implementation includes:

### Hero Scene (`Hero3DScene.tsx`)
- Floating product patch with rotation
- Particle system for aroma visualization
- Background sphere with distortion effect
- Auto-rotate with pointer interaction

### Product Viewer (`Product3DViewer.tsx`)
- Interactive 3D product model
- Orbit controls (drag to rotate, scroll to zoom)
- Auto-rotate toggle
- Series-specific colors

### Adding 3D Models

To replace placeholder 3D models with actual GLB files:

1. Place GLB files in `public/models/`
2. Update product data with model path:
   ```json
   "glb_model": "/models/your-model.glb"
   ```
3. Use `useGLTF` from `@react-three/drei` to load models

Example:
```typescript
import { useGLTF } from '@react-three/drei';

function ProductModel() {
  const { scene } = useGLTF('/models/product.glb');
  return <primitive object={scene} />;
}
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Netlify

1. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables

Required environment variables for deployment:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key (for future integration)
- `VITE_GA_TRACKING_ID`: Google Analytics tracking ID (optional)

## Stripe Integration

The checkout flow is currently a demo. To integrate real payments:

1. Install Stripe:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

2. Create a Stripe account and get your keys

3. Update `.env`:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

4. Implement server-side endpoint for creating checkout sessions

5. Update `Checkout.tsx` to use Stripe Elements:
```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
```

## SEO & Meta Tags

Each page should include the `SEOHead` component:

```typescript
import { SEOHead } from '../components/SEOHead';

function ProductDetail() {
  return (
    <>
      <SEOHead
        title="Deep Sleep Patch | LunaPatch"
        description="Drift into peaceful slumber with calming lavender..."
        image="https://..."
        url="https://lunapatch.com/product/deep-sleep"
        type="product"
      />
      {/* Page content */}
    </>
  );
}
```

### Structured Data

For product pages, add JSON-LD structured data:

```typescript
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Deep Sleep Patch",
  "image": ["image-url"],
  "description": "Product description",
  "sku": "LP-DS-1",
  "brand": {
    "@type": "Brand",
    "name": "LunaPatch"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://lunapatch.com/product/deep-sleep",
    "priceCurrency": "INR",
    "price": "80",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "347"
  }
}
</script>
```

## Accessibility

### Features Implemented
- Semantic HTML elements
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- ARIA labels for interactive elements
- Focus indicators
- Color contrast ratios ≥ 4.5:1
- Reduced motion support (`prefers-reduced-motion`)

### Testing Accessibility

Use tools like:
- **Lighthouse**: Run in Chrome DevTools
- **axe DevTools**: Browser extension
- **WAVE**: Web accessibility evaluation tool

```bash
npm install -D @axe-core/react
```

## Performance Optimization

### Current Optimizations
- Code splitting by route
- Lazy loading of 3D components
- Image optimization with responsive sizes
- CSS purging in production (TailwindCSS)
- Tree shaking
- Minification

### Recommendations
- Use WebP/AVIF image formats
- Implement lazy loading for images
- Add service worker for offline support
- Use CDN for static assets
- Enable Brotli compression
- Implement edge caching

## Analytics

To add Google Analytics:

1. Get your GA4 tracking ID

2. Update `.env`:
```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

3. Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Testing

### Unit Tests

Install testing dependencies:
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

Example test for `ProductCard.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

test('renders product card with title', () => {
  const product = {
    id: 'test',
    title: 'Deep Sleep',
    // ... other required fields
  };

  render(<ProductCard product={product} />);
  expect(screen.getByText('Deep Sleep')).toBeInTheDocument();
});
```

Run tests:
```bash
npm run test
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## License

Copyright © 2024 LunaPatch. All rights reserved.

## Support

For questions or support:
- Email: support@lunapatch.com
- Website: https://lunapatch.com/contact

## Credits

- **Design & Development**: Built with React, TypeScript, and Three.js
- **Images**: Stock photos from Pexels
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Poppins, Inter)

---

Built with care in Indore for MU20 and beyond. Made in India.
