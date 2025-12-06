# LoopersIT Backend Setup Guide

This guide will help you set up the Next.js backend and admin panel for your LoopersIT website.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database installed and running
- Git (optional)

## Step 1: Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
cd /home/sojib/loopersit_nextjs/loopersit_frontend
npm install
```

## Step 2: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/loopersit_db?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials
ADMIN_EMAIL="admin@loopersit.com"
ADMIN_PASSWORD="admin123"

# Uploads
NEXT_PUBLIC_UPLOAD_DIR="/uploads"
```

**Important:** Replace the following:
- `username`, `password`, and `loopersit_db` with your PostgreSQL credentials
- Generate a secure `NEXTAUTH_SECRET` using: `openssl rand -base64 32`
- Change the admin credentials for production use

## Step 3: Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE loopersit_db;

# Exit
\q
```

## Step 4: Run Database Migrations

Generate Prisma client and create database tables:

```bash
# Generate Prisma Client
npx prisma generate

# Run database migration
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

## Step 5: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Step 6: Access Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Login with credentials:
   - Email: `admin@loopersit.com`
   - Password: `admin123`
3. Start managing your content!

## Admin Panel Features

### Services Management
- Create, edit, and delete services
- Upload service images and icons
- Add service offers
- Create subservices
- Reorder services

### Reviews Management
- Add customer testimonials
- Edit and delete reviews
- Upload reviewer photos
- Reorder reviews

### Pages Management  
- Create content pages with rich text editor
- Toggle footer links
- Full WYSIWYG editing
- Image and link support

### Pricing Management
- Create pricing plans
- Add features to each plan
- Set price ranges
- Reorder plans

## API Endpoints

All API endpoints are available at `/api/*`:

- **Services**: `/api/services`, `/api/services/[id]`
- **Service Offers**: `/api/services/[id]/offers`
- **SubServices**: `/api/services/[id]/subservices`
- **Reviews**: `/api/reviews`, `/api/reviews/[id]`
- **Pages**: `/api/pages`, `/api/pages/[id]`
- **Pricing**: `/api/pricing`, `/api/pricing/[id]`
- **Price Features**: `/api/pricing/[id]/features`
- **Upload**: `/api/upload`
- **Auth**: `/api/auth/[...nextauth]`

## Troubleshooting

### Database Connection Issues

If you get database connection errors:

1. Check PostgreSQL is running: `sudo systemctl status postgresql`
2. Verify DATABASE_URL in `.env.local`
3. Ensure database exists: `psql -U postgres -l`

### Prisma Issues

If Prisma commands fail:

```bash
# Clear Prisma cache
rm -rf node_modules/.prisma
npx prisma generate
```

### Image Upload Issues

Ensure the uploads directory exists:

```bash
mkdir -p public/uploads
chmod 755 public/uploads
```

## Production Deployment

For production deployment:

1. Change admin credentials in environment variables
2. Use a strong NEXTAUTH_SECRET
3. Configure proper PostgreSQL database
4. Set up cloud storage for images (optional)
5. Enable HTTPS
6. Set `NEXTAUTH_URL` to your production domain

## Next Steps

Once the backend is set up:

1. Add content through the admin panel
2. Build your frontend pages to consume the API
3. Customize the design as needed
4. Deploy to production

## Support

For issues or questions, please refer to:
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- NextAuth Documentation: https://next-auth.js.org
