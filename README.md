# 🏛️ Egyptian National ID Analyzer | محلل الرقم القومي المصري

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A production-quality bilingual (Arabic/English) web application that instantly decodes publicly derivable information from Egyptian National ID numbers — all processed locally in the browser with zero data transmission.

---

## ✨ Features

- 🔐 **100% Client-Side** — No ID data is ever sent to a server
- 🌍 **Bilingual** — Full Arabic (RTL) & English (LTR) support
- 🌙 **Dark/Light Mode** — System detection + manual toggle with persistence
- ⚡ **Instant Analysis** — Real-time validation and parsing
- 📱 **Mobile-First** — Responsive across all screen sizes
- ♿ **Accessible** — ARIA labels, keyboard navigation, screen reader support
- 🎨 **Pharaonic Aesthetic** — Egyptian-inspired design with gold accents
- 🚀 **Vercel Ready** — Optimized for edge deployment

## 📦 What's Decoded

| Field | Description |
|-------|-------------|
| ✅ Validity | Whether the 14-digit ID is structurally valid |
| 👤 Gender | Male / Female (ذكر / أنثى) |
| 📅 Birth Date | Full date of birth |
| 🎂 Age | Current age in years |
| 📍 Governorate | Province of registration |
| 📆 Century | 1900s or 2000s |
| 🔞 Adult Status | Whether the person is 18+ |

> ⚠️ **Disclaimer**: This tool only extracts information structurally encoded in the ID number itself. It does NOT access any government database or citizen records.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Components | shadcn/ui |
| Animations | Framer Motion |
| Icons | Lucide React |
| i18n | next-intl |
| Theme | next-themes |
| ID Parsing | egyptian-nationalid |
| Toasts | Sonner |
| Deployment | Vercel |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.18.0 or later
- npm 9+ (or pnpm/yarn)

### 1. Clone and Install

```bash
git clone https://github.com/your-username/egyptian-id-analyzer.git
cd egyptian-id-analyzer
npm install
```

### 2. Install shadcn/ui components

```bash
# Initialize shadcn (if not already done)
npx shadcn@latest init

# Add required components
npx shadcn@latest add button card input badge separator alert skeleton tooltip
```

### 3. Install additional Tailwind plugin

```bash
npm install -D tailwindcss-animate
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` automatically.

---

## 📁 Project Structure

```
egyptian-id-analyzer/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale-specific layout (RTL/LTR, i18n)
│   │   └── page.tsx            # Main page
│   ├── globals.css             # Global styles + CSS variables
│   ├── layout.tsx              # Root layout (fonts, ThemeProvider)
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # robots.txt
│
├── components/
│   ├── ui/                     # shadcn/ui primitive components
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   └── tooltip.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── IdAnalyzer.tsx          # Main analyzer orchestrator
│   ├── IdInput.tsx             # ID input with real-time validation
│   ├── Navbar.tsx              # Navigation + language + theme toggle
│   ├── PrivacyNotice.tsx       # Privacy badge
│   ├── PyramidBackground.tsx   # Decorative background
│   └── ResultCards.tsx         # Animated result display
│
├── i18n/
│   ├── navigation.ts           # next-intl navigation helpers
│   ├── request.ts              # Server-side i18n config
│   └── routing.ts              # Locale routing config
│
├── lib/
│   ├── id-parser.ts            # Egyptian ID parsing wrapper
│   └── utils.ts                # Utility functions (cn, isRTL)
│
├── locales/
│   ├── en.json                 # English translations
│   └── ar.json                 # Arabic translations
│
├── types/
│   └── index.ts                # TypeScript type definitions
│
├── middleware.ts               # next-intl locale routing
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind + custom tokens
├── vercel.json                 # Vercel deployment config
└── .env.example                # Environment template
```

---

## 🌐 Internationalization

The app supports:
- **English** (`/en`) — LTR, Plus Jakarta Sans / Cinzel fonts
- **Arabic** (`/ar`) — RTL, Cairo font

Language switching preserves the current route. The `html` element automatically gets `dir="rtl"` or `dir="ltr"` based on the active locale.

### Adding a new language

1. Add locale to `i18n/routing.ts`:
```ts
locales: ['en', 'ar', 'fr'],
```

2. Create `locales/fr.json` with all translation keys

3. Add static param in `app/[locale]/layout.tsx`

---

## 🎨 Design System

### Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--gold` | `#D4A853` | `#D4A853` | Primary accent |
| `--nile` | `#1e6ba8` | `#60a5fa` | Secondary accent |
| `--background` | `hsl(40 30% 97%)` | `hsl(240 20% 5%)` | Page background |

### Typography

| Font | Usage | Weight |
|------|-------|--------|
| Cinzel | English headings | 400–700 |
| Plus Jakarta Sans | English body | 300–700 |
| Cairo | All Arabic text | 300–900 |

---

## 🔌 ID Parser API

```typescript
import { parseNationalId, validateIdFormat } from '@/lib/id-parser';

// Parse a full ID
const result = parseNationalId('29505050217415', 'english');

if (result.valid) {
  console.log(result.gender);       // 'male' | 'female'
  console.log(result.genderLabel);  // 'Male' | 'Female' | 'ذكر' | 'أنثى'
  console.log(result.birthDate);    // Date object
  console.log(result.birthDateText); // '1995-05-05'
  console.log(result.age);          // 31
  console.log(result.governorate);  // 'Alexandria'
  console.log(result.century);      // '1900s'
  console.log(result.isAdult);      // true
  console.log(result.formattedId);  // '2-950505-02-1741-5'
}

// Validate format only
const validation = validateIdFormat('29505050217415');
// { valid: true } or { valid: false, errorKey: 'tooShort' | 'invalid' | ... }
```

---

## 🚢 Vercel Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/egyptian-id-analyzer)

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

No environment variables are required — this is a fully client-side application.

For the `NEXT_PUBLIC_APP_URL`, set it in Vercel Project Settings:

```
NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
```

---

## 🧪 Testing the Application

### Valid Example IDs (for testing)

| ID | Expected Output |
|----|----------------|
| `29505050217415` | Male, 1995-05-05, Alexandria, 31 years |
| `30001011234567` | Male, 2000-01-01, Cairo |

> These are structurally valid IDs for testing purposes only.

---

## 🔒 Privacy & Security

- **Zero data transmission** — The ID never leaves your device
- **No analytics tracking** — No third-party scripts tracking users
- **Content Security Policy** — Headers configured in `vercel.json`
- **No cookies** — Theme preference stored in `localStorage` only
- **Open source** — Fully auditable code

---

## 📋 Scripts

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

<div align="center">

Built with ❤️ using Next.js, React 19, and the `egyptian-nationalid` package.

[Live Demo](https://egyptian-id-analyzer.vercel.app) · [Report Bug](https://github.com/your-username/egyptian-id-analyzer/issues) · [Request Feature](https://github.com/your-username/egyptian-id-analyzer/issues)

</div>
