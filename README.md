# LUXE Jewellery - E-Commerce Platform

A luxury jewelry e-commerce website inspired by Tanishq, built with Next.js 14, TypeScript, Prisma, and Supabase.

## Features

### Customer Features
- **Home Page**: Hero banner, featured collections, trending products
- **Product Catalog**: Browse products with category filters and sorting
- **Product Details**: Multiple images, descriptions, pricing, and add to cart
- **Shopping Cart**: Review items, update quantities, proceed to checkout
- **User Authentication**: Sign up, login, logout with secure password hashing
- **Wishlist**: Save favorite products
- **Order Management**: View order history and track orders
- **Responsive Design**: Mobile-friendly with elegant animations

### Admin Features (CMS)
- **Dashboard**: View metrics (revenue, orders, products)
- **Product Management**: Create, read, update, delete products with images
- **Category Management**: Manage product categories
- **Banner Management**: Control homepage promotional banners
- **Order Management**: View and update order status

### Design & UX
- **Luxury Theme**: Gold, white, and black color scheme
- **Premium Feel**: Smooth animations, hover effects, elegant typography
- **Modern UI**: Built with Shadcn UI components
- **Loading States**: Shimmer effects and skeletons for better UX

## Tech Stack

- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: Custom auth with bcryptjs
- **Image Uploads**: UploadThing (to be configured)
- **Payments**: Stripe (to be configured)
- **Icons**: Lucide React
- **Fonts**: Inter & Playfair Display

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- UploadThing account (for image uploads)
- Stripe account (for payments)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Supabase Database:**

   - Go to your Supabase project dashboard
   - Navigate to Settings > Database
   - Copy your database password
   - Update the `.env` file:
     ```env
     DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.fbswwxrmnrhzbxmqqbmv.supabase.co:5432/postgres"
     DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.fbswwxrmnrhzbxmqqbmv.supabase.co:5432/postgres"
     ```

3. **Push the database schema:**
   ```bash
   npx prisma db push
   ```

4. **Seed the database with sample data:**
   ```bash
   npm run seed
   ```

   This creates:
   - 1 admin user (email: `admin@example.com`, password: `Admin@123`)
   - 6 jewelry categories
   - 18+ sample products
   - 3 promotional banners

5. **Configure UploadThing (Optional but recommended):**

   - Go to [uploadthing.com](https://uploadthing.com)
   - Create an account and new app
   - Copy your API keys
   - Add to `.env`:
     ```env
     UPLOADTHING_SECRET="your_secret_here"
     UPLOADTHING_APP_ID="your_app_id_here"
     ```

6. **Configure Stripe (Optional):**

   - Go to [stripe.com/dashboard](https://stripe.com/dashboard)
   - Get your API keys from Developers > API keys
   - Add to `.env`:
     ```env
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
     STRIPE_SECRET_KEY="sk_test_..."
     ```

7. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/
│   │   └── auth/          # Authentication API routes
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with luxury theme
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── Header.tsx         # Main navigation header
│   ├── Footer.tsx         # Footer with links
│   └── ProductCard.tsx    # Product display card
├── lib/
│   ├── contexts/
│   │   └── AuthContext.tsx # Authentication context
│   ├── auth.ts            # Auth utilities
│   ├── prisma.ts          # Prisma client singleton
│   ├── supabase.ts        # Supabase client
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Seed data script
│   └── migration.sql      # Database migration
└── .env                   # Environment variables
```

## Database Schema

### Core Models:
- **User**: Authentication and role management
- **Category**: Product categories (Rings, Earrings, etc.)
- **Product**: Jewelry products with images, pricing, stock
- **Address**: Customer shipping addresses
- **Order** & **OrderItem**: Order management
- **Cart** & **CartItem**: Shopping cart
- **Wishlist**: Saved products
- **Banner**: Homepage promotional banners

## Admin Access

After seeding the database, you can access the admin panel:

- **Email**: `admin@example.com`
- **Password**: `Admin@123`
- **Admin Dashboard**: Navigate to `/admin` (to be implemented)

## Development Workflow

1. **Generate Prisma Client** (after schema changes):
   ```bash
   npx prisma generate
   ```

2. **Push schema changes to database**:
   ```bash
   npx prisma db push
   ```

3. **View database in Prisma Studio**:
   ```bash
   npx prisma studio
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Run production build**:
   ```bash
   npm start
   ```

## Key Features Implemented

✅ Database schema with Prisma + Supabase
✅ Comprehensive seed data with jewelry products
✅ Authentication system (signup, login, logout)
✅ Home page with hero section and featured products
✅ Category browsing
✅ Product card component with wishlist button
✅ Luxury gold-white-black design theme
✅ Responsive header with navigation
✅ Footer with links and social media
✅ API routes for authentication
✅ TypeScript for type safety
✅ Production-ready build

## To Be Implemented

The foundation is complete. To finish the full e-commerce platform, implement:

- Product listing page with filters and sorting
- Product detail page with image gallery
- Shopping cart functionality
- Checkout flow with address management
- Stripe payment integration
- Order management for customers
- Admin dashboard with CRUD operations
- UploadThing image upload integration
- Wishlist page
- User account page
- Search functionality

## Environment Variables

All required environment variables are documented in `.env`. Make sure to:

1. Add your Supabase database password
2. (Optional) Add UploadThing credentials for image uploads
3. (Optional) Add Stripe credentials for payments
4. (Optional) Update `NEXT_PUBLIC_APP_URL` for production

## Deployment

This app is ready to deploy to:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Any platform supporting Node.js

Make sure to:
1. Set all environment variables
2. Run database migrations
3. Seed the database if needed

## License

MIT

## Support

For issues or questions:
- Check the database setup in `README_DATABASE_SETUP.md`
- Review Prisma schema in `prisma/schema.prisma`
- Check API routes in `app/api/`

---

**Built with love for luxury jewelry e-commerce**
