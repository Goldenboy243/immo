# IMMO - Real Estate Management Platform

A modern real estate platform for managing property listings, sales, and client interactions in Lubumbashi.

## Features

- Browse and search property listings
- Property details with comprehensive information
- Client contact forms and inquiries
- Responsive design for all devices
- Modern UI built with Tailwind CSS and Shadcn/ui

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Shadcn/ui
- **Backend:** Express.js, Node.js
- **Database:** Drizzle ORM with PostgreSQL
- **Authentication:** Passport.js
- **Package Manager:** npm

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Production Build

Build for production:

```bash
npm run build
npm run start
```

## Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom React hooks
│   └── index.html
├── server/                # Express.js backend
├── shared/               # Shared types and schemas
├── package.json
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## License

MIT


