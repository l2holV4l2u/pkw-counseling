## Tech Stack

### Frontend

- **Framework & Libraries**:
  - `react`
  - `react-dom`
  - `@remix-run/react`
  - `remix-flat-routes`
- **State Management**:
  - `jotai`
- **Styling**:
  - `tailwindcss`
  - `tailwindcss-animate`
  - `tw-animate-css`
  - `shadcn-ui`
  - `autoprefixer`
  - `postcss`
  - `tailwind-merge`
  - `clsx`
  - `class-variance-authority`
- **Drag & Drop**:
  - `@dnd-kit/core`
  - `@dnd-kit/sortable`
  - `@dnd-kit/modifiers`

### **Backend**

- **Framework & Server**:
  - `@remix-run/node`
  - `@remix-run/serve`
  - `remix`
  - `vite`
- **Database & ORM**:
  - `prisma`
  - `@prisma/client`
- **Authentication & Security**:
  - `bcryptjs`
  - `js-sha256`
  - `uuid`
- **Cloud & Storage**:
  - `@aws-sdk/client-s3`
  - `@aws-sdk/s3-request-presigner`
- **Validation**:
  - `zod`
  - `zod-prisma-types`
- **Bot Detection**:
  - `isbot`
- **Email Sending:**
  - `Amazon SES`

### **Payments**

- `@stripe/react-stripe-js`
- `@stripe/stripe-js`
- `stripe`

### **Stripe Webhook Testing**

- `stripe listen --forward-to localhost:5173/api/stripe/webhook`
- `stripe trigger payment_intent.succeeded --override payment_intent:"metadata[responseId]"=a177e247-d5c4-42a5-b8c7-3832bb4bf8e7=6ff....`
