# Environment Setup Instructions

**IMPORTANT:** Before running the application, you must create a `.env.local` file with the following configuration:

## Step 1: Create `.env.local` file

Create a file named `.env.local` in the project root with this content:

```env
# Database Configuration (Update with your PostgreSQL credentials)
DATABASE_URL="postgresql://username:password@localhost:5432/loopersit_db?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials
ADMIN_EMAIL="admin@loopersit.com"
ADMIN_PASSWORD="admin123"

# Uploads
NEXT_PUBLIC_UPLOAD_DIR="/uploads"

# UploadThing Configuration (for Cloudflare deployment)
UPLOADTHING_TOKEN="your-uploadthing-token-from-dashboard"
```

## Step 2: Generate Secure Secret

Generate a secure NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

Copy the output and replace `your-secret-key-change-in-production` in your `.env.local` file.

## Step 3: Configure Database

Update the `DATABASE_URL` with your actual PostgreSQL credentials:
- Replace `username` with your PostgreSQL username
- Replace `password` with your PostgreSQL password
- Replace `loopersit_db` with your database name (or create it first)

## Step 4: Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Run database migration
npx prisma migrate dev --name init
```

## Step 5: Start Development Server

```bash
npm run dev
```

## Default Login Credentials

- **Email:** admin@loopersit.com
- **Password:** admin123

⚠️ **Change these credentials in production!**
