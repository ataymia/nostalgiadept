# Nostalgia Dept 🎉

A totally rad 90s-themed ecommerce storefront built with Next.js! Step into the time machine and shop for your favorite retro gear, regional snacks, and all the awesome stuff from the 90s.

## ✨ Features

- 🎨 **90s Nickelodeon/MTV Theme** - Neon colors, gradients, Memphis patterns, and retro vibes
- 🛍️ **Full Storefront Functionality** - Browse products, add to cart, and checkout
- 📱 **Fully Responsive** - Works great on all devices
- 🏪 **Product Categories**:
  - Pocket Tech & Virtual Pets
  - Grow Kits & Room Décor
  - Toys, Games & Fidgets
  - Stickers, Stationery & School
  - VHS & Analog Corner
  - Candy, Snacks & Drinks
  - Mystery & Subscription Boxes
  - Retro Apparel & Accessories
  - The Vault (Discontinued & Rare)
- 🛒 **Client-Side Shopping Cart** - Persistent cart using Zustand
- 💳 **Stripe Integration** - Secure checkout
- ⚙️ **Admin Dashboard** - Product management interface
- 📦 **Static Export** - Deployable to any static hosting
- 🎁 **Subscription Boxes** - Monthly 90s Mystery Box & Time Capsule

## 🚀 Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then visit `http://localhost:3000` in your browser.

### Production Build

```bash
# Build for production (outputs to 'out' directory)
npm run build

# Preview production build
npm run start
```

### Deploy to Static Hosting

The site builds to the `out/` directory as static HTML. Deploy to:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3
- Any static file host

## 🎯 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with header/footer
│   ├── admin/             # Admin dashboard pages
│   ├── cart/              # Shopping cart page
│   ├── category/          # Category pages
│   ├── checkout/          # Checkout page
│   ├── product/           # Product detail pages
│   └── sale/              # Sale page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── ProductCard.tsx    # Product display card
│   └── admin/             # Admin components
├── lib/                   # Utilities and data
│   ├── products.ts        # Product data
│   ├── types.ts           # TypeScript types
│   └── store.ts           # Zustand cart store
├── public/                # Static assets
│   └── images/products/   # Product images
├── next.config.ts         # Next.js configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management for cart
- **Stripe** - Payment processing
- **Lucide React** - Icons

## 🔧 Admin Dashboard

Navigate to `/admin` to access the admin dashboard for:
- ✅ **View all products**
- ➕ **Add new products**
- ✏️ **Edit existing products**
- 🗑️ **Delete products**
- 📊 **View reports and analytics**
- 🏷️ **Manage discounts**
- 📦 **Manage subscription boxes**

## 📦 Product Data

Products are defined in `lib/products.ts`. Each product has:
- `id` - Unique identifier
- `name` - Product name
- `slug` - URL-friendly name
- `category` - Product category
- `subcategory` - Product subcategory
- `price` - Current price
- `featured` - Featured on home page
- `descriptionShort` - Brief description
- `descriptionLong` - Full description
- `images` - Array of image paths

## 🛒 Cart & Checkout

- Cart state managed with Zustand
- Persists across page refreshes
- Checkout via Stripe

## 📸 Adding Product Images

1. Add images to `public/images/products/` directory
2. Use descriptive filenames (e.g., `retro-pixel-pet-classic.jpg`)
3. Update the product's `images` array in `lib/products.ts`:
   ```typescript
   images: ['/images/products/retro-pixel-pet-classic.jpg']
   ```
4. Recommended: 800x800px, under 500KB

## 🐛 Troubleshooting

**Build errors?**
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors with `npm run lint`

**Images not showing?**
- Ensure images are in `public/images/products/`
- Check image paths start with `/images/products/`

**Cart not persisting?**
- Ensure localStorage is enabled in browser
- Check for errors in browser console

## 📝 License

This project is open source and available for use.

---

Built with 💜 and 90s nostalgia!
