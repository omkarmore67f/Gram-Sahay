# ગ્રામ સહાય - પંચાયત હેલ્પડેસ્ક

A Gujarati-language village helpdesk platform inspired by Meri Panchayat. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Login Page** - Mobile + OTP authentication with role selection (User/Admin)
- **100% Gujarati UI** - All text and interface in Gujarati language
- **Responsive Design** - Mobile-first approach with beautiful animations
- **Mock Data** - Frontend-only implementation with localStorage session simulation

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
  ├── pages/
  │   └── LoginPage.tsx    # Login page component
  ├── App.tsx               # Main app component
  ├── main.tsx              # Entry point
  └── index.css             # Tailwind CSS imports
```

## Demo Login

- **Phone Number**: Any 10-digit number starting with 6-9
- **OTP**: `123456` (mock OTP for demo)

## Notes

- This is a frontend-only implementation
- Session is stored in localStorage
- All validations are client-side
- Backend integration will be added later


