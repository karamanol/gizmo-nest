# GizmoNest Gadget Shop

## Description

GizmoNest is an e-commerce website that sells gadgets like smartphones, laptops, headphones, etc. It's built with Next.js, TypeScript, Tailwind CSS, TanStack Query, Stripe and MongoDB. For managing products, orders and categories check gizmo-nest-admin project.

## Features

- Product listing
- Categories
- Shopping cart
- Adding user reviews to products
- Adding products to favourites
- Payment integration
- Searching for products by name
- Responsive design

## Installation

1. Clone the repository

2. Install the dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev

   ```

## .env.local file must be created and contain following variables for running:

- MONGODB_URI
- STRIPE_SECRET_TEST_KEY
- STRIPE_WEBHOOK_SECRET_TEST_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- NEXT_PUBLIC_URL
