# Quick Start Guide

Get your luxury jewelry e-commerce platform running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click on your project (or create a new one)
3. Navigate to **Settings** → **Database**
4. Scroll down to **Connection Info** section
5. Copy your database password (or reset it if needed)

### 3. Configure Environment Variables

Open the `.env` file and update these lines with your Supabase password:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD_HERE@db.fbswwxrmnrhzbxmqqbmv.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD_HERE@db.fbswwxrmnrhzbxmqqbmv.supabase.co:5432/postgres"
```

Replace `YOUR_PASSWORD_HERE` with your actual Supabase database password.

### 4. Create Database Tables

```bash
npx prisma db push
```

This will create all the necessary tables in your Supabase database.

### 5. Seed Sample Data

```bash
npm run seed
```

This will populate your database with:
- 1 admin user (email: `admin@example.com`, password: `Admin@123`)
- 6 jewelry categories (Rings, Earrings, Necklaces, Bangles, Bracelets, Pendants)
- 18+ sample jewelry products with realistic pricing
- 3 promotional banners

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What You'll See

### Home Page (/)
- Beautiful hero banner with call-to-action
- Shop by category section
- Featured products grid
- Newsletter subscription

### Try It Out
1. Browse products on the home page
2. Sign up for a new customer account
3. Login with the admin account to test admin access

## Admin Credentials

- **Email**: `admin@example.com`
- **Password**: `Admin@123`

## Common Issues

### Issue: "Authentication failed against database server"

**Solution**: Make sure you've updated the DATABASE_URL in `.env` with your correct Supabase password.

### Issue: "Cannot find module '@prisma/client'"

**Solution**: Run `npx prisma generate` to generate the Prisma client.

### Issue: "No products showing on home page"

**Solution**: Make sure you've run `npm run seed` to populate the database with sample data.

## Next Steps

### Optional Configuration

#### UploadThing (Image Uploads)
1. Go to [uploadthing.com](https://uploadthing.com)
2. Create account and app
3. Add keys to `.env`:
   ```env
   UPLOADTHING_SECRET="your_secret"
   UPLOADTHING_APP_ID="your_app_id"
   ```

#### Stripe (Payments)
1. Go to [stripe.com/dashboard](https://stripe.com/dashboard)
2. Get test API keys
3. Add to `.env`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   ```

## Database Management

### View Your Database
```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555 where you can view and edit your database.

### Reset Database
```bash
npx prisma db push --force-reset
npm run seed
```

### Create More Sample Data

Edit `prisma/seed.ts` and add more products, categories, or users, then run:
```bash
npm run seed
```

## Development Workflow

1. Make code changes
2. The app auto-reloads at http://localhost:3000
3. Check console for any errors
4. Test your changes

## Testing the Build

```bash
npm run build
npm start
```

The production build runs at http://localhost:3000

## Project Structure

```
├── app/              # Next.js app directory
│   ├── api/         # API routes (auth, etc.)
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/       # React components
├── lib/             # Utilities, types, contexts
├── prisma/          # Database schema & seed
└── .env             # Environment variables
```

## Support

- **Database Issues**: See `README_DATABASE_SETUP.md`
- **Full Documentation**: See `README.md`
- **Project Overview**: See `PROJECT_SUMMARY.md`

## Sample Products Included

After seeding, you'll have products like:
- Eternal Love Diamond Ring (₹45,000)
- Royal Solitaire Ring (₹95,000)
- Floral Diamond Studs (₹38,000)
- Royal Heritage Necklace (₹125,000)
- Tennis Diamond Bracelet (₹145,000)
- And many more!

## What's Working

✅ Authentication (signup, login, logout)
✅ Home page with featured products
✅ Category browsing
✅ Responsive design
✅ Luxury gold theme
✅ Product cards with pricing
✅ Navigation header
✅ Footer with links

## What to Build Next

The foundation is complete! Now implement:
- Products listing page with filters
- Product detail page
- Shopping cart
- Checkout flow
- Admin dashboard
- Order management

See `README.md` for detailed implementation guidance.

---

**Ready to build something amazing!** 🚀

If you run into any issues, check the error messages carefully - they usually point to the solution (like missing database credentials or needing to run `prisma generate`).
