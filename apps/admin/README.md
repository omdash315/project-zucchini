# NITRUTSAV 2026 - Admin Dashboard

Admin panel for managing NITRUTSAV 2026 registrations, user verification, and event administration.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Backend:** Firebase
- **Validation:** Zod
- **UI Components:** @repo/ui (shared component library)

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Admin dashboard home
└── globals.css         # Global styles with Tailwind
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 9.0.0
- Admin access (email must be in Firebase `admins` collection)

### Installation

From the workspace root:

```bash
# Install all dependencies
pnpm install

# Run admin app only
pnpm --filter admin dev
```

The app will be available at [http://localhost:3002](http://localhost:3002)

### Available Scripts

```bash
# Development
pnpm dev              # Start development server (port 3002)

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root by copying `.env.sample`:

```bash
cp .env.sample .env.local
```

Then configure the required environment variables in `.env.local` for your Firebase project and local development setup.

## 🤝 Contributing

Please read the [Contributing Guidelines](../../CONTRIBUTING.md) before making any changes.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

Built with ❤️ by DSC NIT Rourkela

Runs on `http://localhost:3002`

## Build

```bash
pnpm build
```
