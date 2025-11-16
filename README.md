# Nostalgia Dept 🎉

A totally rad 90s-themed ecommerce site built with Next.js! Step into the time machine and shop for your favorite retro gear, regional snacks, and all the awesome stuff from the 90s.

## ✨ Features

- 🎨 **90s Graffiti/Hip-Hop Theme** - Bright neon colors, brick-wall backgrounds, and retro vibes
- 🛍️ **Full Ecommerce Functionality** - Browse products, add to cart, and checkout
- 📱 **Fully Responsive** - Works great on all devices
- 🏪 **Product Categories**:
  - 90s Collections
  - Regional Snacks
  - Snacks
  - Women's Apparel
  - Men's Apparel
  - Shoes
  - Toys
  - Accessories
  - Sale Items
- 🛒 **Shopping Cart** - Persistent cart with Zustand
- 💳 **Stripe Integration** - Ready for payment processing
- ⚙️ **Admin Portal** - Add, edit, delete products with inventory management
- 📦 **Static Site** - Fully exportable as static HTML

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site in action!

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory that can be deployed anywhere.

## 🎯 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── admin/           # Admin portal for product management
│   ├── cart/            # Shopping cart page
│   ├── category/[slug]/ # Dynamic category pages
│   ├── product/[id]/    # Product detail pages
│   └── sale/            # Sale items page
├── components/          # Reusable React components
│   ├── Header.tsx       # Main navigation header
│   └── ProductCard.tsx  # Product display card
├── lib/                 # Utilities and data
│   ├── products.ts      # Product data and utilities
│   ├── store.ts         # Zustand cart store
│   └── types.ts         # TypeScript type definitions
└── public/             # Static assets

```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom 90s theme
- **State Management**: Zustand
- **Icons**: Lucide React
- **Payments**: Stripe (ready for integration)

## 🔧 Admin Features

Access the admin portal at `/admin` to:
- ✅ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📊 Manage inventory levels
- 💰 Set prices and sale prices
- 🏷️ Mark products as featured, on sale, or regional
- 📂 Organize products by category

## 📝 License

This project is open source and available for use.
