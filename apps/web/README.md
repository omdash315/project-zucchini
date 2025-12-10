# NITRUTSAV 2026 - Web Application

The official website for NITRUTSAV 2026

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
├── page.tsx            # Landing page
├── globals.css         # Global styles with Tailwind
└── (dev)/
    └── playground/     # Development playground
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 9.0.0

### Installation

From the workspace root:

```bash
# Install all dependencies
pnpm install

# Run web app only
pnpm --filter web dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
pnpm dev              # Start development server

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

## 📦 Shared Packages

This app uses the following workspace packages:

- `@repo/ui` - Shared UI components (Typography, etc.)
- `@repo/shared-types` - TypeScript types and Zod schemas
- `@repo/firebase-config` - Firebase configuration and services
- `@repo/eslint-config` - ESLint configuration
- `@repo/typescript-config` - TypeScript configuration

## 🎨 Styling

This project uses Tailwind CSS 4. Global styles are imported in `app/globals.css`:

```css
@import "tailwindcss";
```

Configuration can be modified in `postcss.config.mjs`.

## 🤝 Contributing

Please read the [Contributing Guidelines](../../CONTRIBUTING.md) before making any changes.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

Built with ❤️ by DSC NIT Rourkela
