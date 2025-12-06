# LoopersIT Backend & Admin Panel

A complete Next.js backend with API routes and admin panel for managing your service-oriented business website.

## 🚀 Quick Start

```bash
# 1. Set up environment variables
cp env.config.md .env.local
# Edit .env.local with your database credentials

# 2. Generate Prisma client
npx prisma generate

# 3. Run database migrations
npx prisma migrate dev --name init

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000/admin/login` to access the admin panel.

**Default Credentials:**
- Email: `admin@loopersit.com`
- Password: `admin123`

> ⚠️ **Important:** Change these credentials in `.env.local` before deploying to production!

## 📚 Features

### Backend API
- **RESTful API** with full CRUD operations
- **PostgreSQL database** with Prisma ORM
- **Image upload** functionality
- **Authentication** with NextAuth.js
- **Type-safe** with TypeScript

### Admin Panel
- 🎨 **Modern UI** with gradient designs
- 📦 **Services Management** - Create and manage services with images
- ⭐ **Reviews Management** - Add customer testimonials
- 📄 **Pages Management** - Rich text editor for content pages
- 💰 **Pricing Management** - Configure pricing plans and features
- 🔐 **Secure Authentication** - Protected admin routes
- 📱 **Responsive Design** - Works on all devices

## 📖 Documentation

- [Setup Guide](./SETUP.md) - Detailed installation instructions
- [Environment Config](./env.config.md) - Environment variable setup

## 🛠 Tech Stack

- **Framework:** Next.js 16
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v5
- **Rich Text Editor:** Tiptap
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication
│   │   ├── services/     # Services CRUD
│   │   ├── reviews/      # Reviews CRUD
│   │   ├── pages/        # Pages CRUD
│   │   ├── pricing/      # Pricing CRUD
│   │   └── upload/       # File upload
│   ├── admin/            # Admin panel pages
│   └── layout.tsx        # Root layout
├── components/
│   └── admin/            # Admin UI components
├── lib/
│   ├── db.ts            # Prisma client
│   ├── auth.ts          # Auth configuration
│   └── session.ts       # Session helpers
├── prisma/
│   └── schema.prisma    # Database schema
└── public/
    └── uploads/         # Uploaded images
```

## 🔌 API Endpoints

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create service
- `GET /api/services/[id]` - Get service details
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service
- `GET /api/services/[id]/offers` - Get service offers
- `POST /api/services/[id]/offers` - Add service offer
- `GET /api/services/[id]/subservices` - Get subservices
- `POST /api/services/[id]/subservices` - Add subservice

### Reviews
- `GET /api/reviews` - List all reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/[id]` - Get review
- `PUT /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review

### Pages
- `GET /api/pages` - List all pages
- `POST /api/pages` - Create page
- `GET /api/pages/[id]` - Get page
- `PUT /api/pages/[id]` - Update page
- `DELETE /api/pages/[id]` - Delete page

### Pricing
- `GET /api/pricing` - List pricing plans
- `POST /api/pricing` - Create pricing plan
- `GET /api/pricing/[id]` - Get pricing plan
- `PUT /api/pricing/[id]` - Update pricing plan
- `DELETE /api/pricing/[id]` - Delete pricing plan
- `GET /api/pricing/[id]/features` - Get features
- `POST /api/pricing/[id]/features` - Add feature

### Upload
- `POST /api/upload` - Upload image

## 🔒 Authentication

All `POST`, `PUT`, and `DELETE` API endpoints require authentication. Include the session cookie from NextAuth.js in your requests.

## 🌐 Database Models

- **Service** - Main service offerings
- **ServiceOffer** - Features/offers for each service
- **SubService** - Sub-categories of services
- **Review** - Customer testimonials
- **Page** - Content pages (Privacy Policy, About, etc.)
- **Pricing** - Pricing plans
- **PriceFeature** - Features for each pricing plan

## 📝 License

MIT

## 👤 Author

Created for LoopersIT
