# Nostalgia Dept 🎉

A totally rad 90s-themed ecommerce storefront built with pure HTML, CSS, and vanilla JavaScript! Step into the time machine and shop for your favorite retro gear, regional snacks, and all the awesome stuff from the 90s.

## ✨ Features

- 🎨 **90s Nickelodeon/MTV Theme** - Neon colors, gradients, Memphis patterns, and retro vibes
- 🛍️ **Full Storefront Functionality** - Browse products, add to cart, and checkout
- 📱 **Fully Responsive** - Works great on all devices with mobile hamburger menu
- 🏪 **Product Categories**:
  - 90s Collection
  - Regional Snacks (Arizona, Louisiana, Tokyo, etc.)
  - Snacks
  - Women's Apparel
  - Men's Apparel
  - Shoes
  - Toys & Collectibles
- 🛒 **Client-Side Shopping Cart** - Persistent cart using localStorage
- 💳 **Stripe Payment Links** - Checkout via external payment URLs (no secret keys exposed)
- ⚙️ **Admin Dashboard** - Password-protected admin portal for product management
- 📦 **Static Site** - Pure HTML/CSS/JS, no backend required, perfect for GitHub Pages
- 🎁 **Subscription Boxes** - Monthly 90s Mystery Box & World Tour Regional Box

## 🚀 Getting Started

### Option 1: Local Development

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Option 2: Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select the branch (usually `main`) and root folder
4. Your site will be live at `https://yourusername.github.io/nostalgiadept/`

### Option 3: Deploy to Any Static Host

Upload the files to any static hosting service:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3
- Any web hosting with static file support

## 🎯 Project Structure

```
├── index.html           # Main storefront page
├── admin.html          # Admin dashboard
├── styles.css          # 90s-themed styling
├── app.js              # Storefront logic (cart, filters, rendering)
├── admin.js            # Admin dashboard logic (CRUD, JSON export)
├── products.json       # Product data (the single source of truth)
└── images/
    └── products/       # Product images go here
```

## 🎨 Tech Stack

- **Pure HTML5** - Semantic markup
- **Pure CSS3** - Custom 90s theme with gradients, animations
- **Vanilla JavaScript** - No frameworks or dependencies
- **localStorage** - Cart persistence and admin drafts
- **Google Fonts** - Bangers (display) & Inter (body)

## 🔧 Admin Dashboard

### Accessing the Admin

1. Navigate to `/admin.html`
2. Enter the admin password (default: `changeme123`)
3. **IMPORTANT**: Change the password in `admin.js` before deploying!

### Managing Products

The admin dashboard allows you to:
- ✅ **View all products** in a table
- ➕ **Add new products** with full details
- ✏️ **Edit existing products** (name, price, description, variants, etc.)
- 🗑️ **Delete products** with confirmation
- 💾 **Save drafts** to browser localStorage
- ⬇️ **Download updated JSON** to commit changes
- 🔄 **Reset to server version** to discard local changes

### Updating Products in Production

Since this is a static site, follow these steps to update products:

1. Go to `admin.html` and make your changes
2. Click **"Download Updated JSON"**
3. Replace `products.json` in your repository with the downloaded file
4. Commit and push the changes to your repository
5. GitHub Pages (or your host) will automatically rebuild
6. Your storefront now shows the updated products!

### Password Security

⚠️ **IMPORTANT**: The admin password is stored in `admin.js` as a simple check. This is NOT secure for production! 

To change it:
1. Open `admin.js`
2. Find the line: `const ADMIN_PASSWORD = 'changeme123';`
3. Change to a strong password
4. Commit the change

For better security, consider:
- Using a more complex authentication system
- Hosting the admin on a separate, password-protected URL
- Using environment variables or a backend service

## 📦 Product Data Structure

Products are stored in `products.json`. Each product has:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "slug": "product-name",
  "category": "90s|regional|snacks|womens-apparel|mens-apparel|shoes|toys",
  "collections": ["Collection 1", "Collection 2"],
  "price": 29.99,
  "originalPrice": 39.99,
  "currency": "USD",
  "shortDescription": "Brief description",
  "description": "Full description",
  "images": ["images/products/image.jpg"],
  "isFeatured": true,
  "isNew": false,
  "inStock": true,
  "tags": ["tag1", "tag2"],
  "paymentLink": "https://buy.stripe.com/...",
  "subscription": false,
  "variants": [
    { "label": "M", "sku": "SKU-M", "inStock": true }
  ]
}
```

For subscription products, add:
- `"subscription": true`
- `"billingInterval": "monthly"`
- `"includes": "What's included"` (for Regional Box)
- `"surpriseFactor": "Description"` (for Mystery Box)

## 🎁 Subscription Boxes

The site includes two subscription boxes:

1. **World Tour Regional Box** - Monthly snacks from different regions
2. **90s Mystery Box** - Random 90s-themed items

These are flagged with `"subscription": true` in `products.json` and displayed in a dedicated section.

## 🛒 Cart & Checkout

- Cart is stored in browser localStorage
- Cart persists across page refreshes
- Checkout shows:
  - Order summary
  - Links to Stripe Payment Links (if configured)
  - Alternative payment methods (CashApp, PayPal, Venmo)

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --neon-pink: #FF006E;
    --neon-purple: #8338EC;
    --neon-teal: #06FFF0;
    --neon-yellow: #FFBE0B;
    /* etc. */
}
```

### Fonts

Change fonts in the `<head>` of `index.html` and `admin.html`, then update:

```css
:root {
    --font-display: 'Your Display Font', cursive;
    --font-body: 'Your Body Font', sans-serif;
}
```

### Content

- **Hero text**: Edit in `index.html` (search for "hero-title")
- **Collections**: Edit in the "Featured Collections" section
- **About/FAQ**: Edit in the "about-section"
- **Contact**: Edit email and details in the "contact-section"

## 📸 Adding Product Images

1. Add images to `images/products/` directory
2. Use descriptive filenames (e.g., `bulls-jacket-1.jpg`)
3. Update the product's `images` array in `products.json`:
   ```json
   "images": ["images/products/bulls-jacket-1.jpg"]
   ```
4. Recommended: 800x800px, under 500KB

## 🐛 Troubleshooting

**Products not loading?**
- Check that `products.json` is valid JSON (use a JSON validator)
- Check browser console for errors
- Ensure you're running from a server, not opening files directly (due to CORS)

**Admin won't login?**
- Check that password matches in `admin.js`
- Clear browser localStorage: `localStorage.clear()`

**Cart not persisting?**
- Ensure cookies/localStorage are enabled in browser
- Check that you're on the same domain/URL

## 📝 License

This project is open source and available for use.

---

Built with 💜 and 90s nostalgia!
