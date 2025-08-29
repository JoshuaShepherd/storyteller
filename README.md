# Storyteller PWA

A Progressive Web App for storyteller management and operations.

## Prerequisites

- Node.js 18+ or LTS version
- npm package manager

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Environment Setup:**
Copy the environment template and fill in your values:
```bash
cp .env.example .env
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

3. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Build for Production

```bash
npm run build
npm start
```

## Progressive Web App

This application includes PWA functionality:
- Offline capability
- App-like experience
- Push notifications support
- Installable on mobile and desktop

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide Icons
- PWA enabled with next-pwa

## License

MIT License
