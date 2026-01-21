# Care.xyz - Healthcare Booking Platform

Care.xyz is a modern, full-stack healthcare service booking application built with **Next.js 14**, **MongoDB**, and **Tailwind CSS**. It provides a seamless experience for users to browse care services, book appointments, and receive automated confirmations.

## 🚀 Key Features

### 🔐 Secure Authentication
-   Powered by **NextAuth.js v5**.
-   Supports **Google OAuth** and **Credentials** login.
-   Protected routes ensuring only authenticated users can book services.

### 📅 Dynamic Booking System
-   **Real-time Cost Calculation**: Checks service duration and calculates total price instantly.
-   **Smart Location Logic**: Dynamic dropdowns for Divisions and Districts (Bangladesh context).
-   **Data Validation**: Ensures all booking details are accurate before submission.

### 📧 Automated Email Invoices
-   **Instant Confirmation**: Sends a professional HTML invoice immediately after booking.
-   **Tech**: Built with **Nodemailer** using secure Gmail SMTP (App Password).
-   **Reliability**: Works for any recipient email address.

### 🎨 Premium UI/UX
-   **Glassmorphism Design**: Modern, clean aesthetic with mesh gradients and blur effects.
-   **Responsive Layout**: Fully optimized for mobile, tablet, and desktop.
-   **Dynamic Content**: Homepage features (Hero, About, Testimonials) and Service grids are data-driven.

### 👤 User Dashboard
-   **My Bookings**: Users can view their full booking history.
-   **Status Tracking**: Real-time status updates (Pending, Confirmed).
-   **Management**: Option to cancel pending bookings.

---

## 🛠️ Tech Stack

-   **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Lucide Icons.
-   **Backend**: Next.js API Routes.
-   **Database**: MongoDB (via Mongoose).
-   **Auth**: NextAuth.js.
-   **Email**: Nodemailer.

---

## ⚙️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/care-xyz.git
cd care-xyz
npm install
```

### 2. Environment Setup
Create a `.env` file in the root:
```env
MONGODB_URI=your_mongodb_uri
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Run Locally
```bash
npm run dev
```
Visit `http://localhost:3000` to see the app in action.

---

## 📦 Deployment

Ready to deploy on **Vercel**:
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Add all Environment Variables in Vercel settings.
4.  Update Google Cloud Console "Authorized Redirect URIs" with the Vercel domain.

