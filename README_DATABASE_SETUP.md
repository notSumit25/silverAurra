# Database Setup Instructions

## Supabase Setup Required

The database schema has been designed but needs to be applied to your Supabase instance.

### Steps:

1. **Get Your Supabase Database Password:**
   - Go to your Supabase project dashboard: https://supabase.com/dashboard/project/fbswwxrmnrhzbxmqqbmv
   - Navigate to Settings > Database
   - Copy your database password

2. **Update .env file:**
   Replace `[YOUR-PASSWORD]` in the `.env` file with your actual Supabase database password:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD_HERE@db.fbswwxrmnrhzbxmqqbmv.supabase.co:5432/postgres"
   DIRECT_URL="postgresql://postgres:YOUR_PASSWORD_HERE@db.fbswwxrmnrhzbxmqqbmv.supabase.co:5432/postgres"
   ```

3. **Run the migration:**
   ```bash
   npx prisma db push
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Seed the database:**
   ```bash
   npm run seed
   ```

## Schema Overview

The database includes:
- **users**: Customer and admin user management
- **categories**: Product categories (Rings, Earrings, Necklaces, etc.)
- **products**: Jewelry products with pricing, stock, images
- **addresses**: Customer shipping addresses
- **orders** & **order_items**: Order management
- **banners**: Homepage promotional banners
- **wishlists**: Customer wishlist functionality
- **carts** & **cart_items**: Shopping cart management

## Additional Services Setup

### UploadThing (Image Uploads)
1. Go to https://uploadthing.com
2. Create an account and new app
3. Copy your API keys to `.env`:
   ```
   UPLOADTHING_SECRET="your_secret_here"
   UPLOADTHING_APP_ID="your_app_id_here"
   ```

### Stripe (Payments)
1. Go to https://stripe.com/dashboard
2. Get your API keys from Developers > API keys
3. Add to `.env`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   ```
4. Set up webhook endpoint for `/api/webhooks/stripe`
5. Add webhook secret to `.env`:
   ```
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```
