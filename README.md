# StudManager - Professional Invoice Management System

A modern, responsive invoice management system built with Next.js, React, and Tailwind CSS with full Arabic and English language support.

## Features

- **Bilingual Support**: Full RTL/LTR support with Arabic (default) and English
- **Dashboard**: Overview with statistics and recent invoices
- **Invoice Management**: Create, edit, and manage invoices with detailed information
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional interface with smooth animations
- **AI Assistant**: Floating AI button for quick assistance
- **Locale Routing**: Automatic locale-based URL routing (`/ar/`, `/en/`)

## Project Structure

```
studmanager/
├── app/
│   ├── [locale]/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── invoices/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── MainLayout.tsx
│   │   └── AIButton.tsx
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── InvoiceCard.tsx
│   │   └── RecentInvoices.tsx
│   ├── invoices/
│   │   ├── InvoicesTable.tsx
│   │   └── InvoiceFormModal.tsx
│   └── common/
│       ├── BackButton.tsx
│       └── LanguageSwitcher.tsx
├── lib/
│   ├── i18n.ts
│   └── locale-context.tsx
├── public/
│   ├── locales/
│   │   ├── ar.json
│   │   └── en.json
│   ├── icons/
│   ├── fonts/
│   │   └── alfont_com_SFProAR_semibold.ttf
├── proxy.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm, npm, or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd studmanager
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically redirect to the Arabic dashboard (`/ar/dashboard`).

## Usage

### Switching Languages

Click the language switcher button in the top right corner to switch between Arabic and English. The app automatically handles RTL/LTR layout based on the language.

### Adding Invoices

1. Click the "+ إضافة فاتورة جديدة" (Add New Invoice) button
2. Fill in the invoice details:
   - Invoice Number
   - Product Name
   - Client Name
   - Work Name
   - Invoice Date
   - Status (Pending, Paid, Unpaid, Approved)
   - Category (Feed, Veterinary, Grooming)
   - Cost
3. Click "حفظ" (Save) to create the invoice

### Navigation

- **Dashboard**: Overview of statistics and recent invoices
- **Invoices (الفواتير)**: Full list of all invoices with filtering and actions
- **Other Sections**: Horses, Nutrition, Health Care, Team Management, etc.

## Internationalization (i18n)

The app uses a simple but effective i18n system:

- **Locale Files**: `/public/locales/ar.json` and `/public/locales/en.json`
- **Locale Context**: `lib/locale-context.tsx` provides `useLocale()` and `useTranslation()` hooks
- **Locale Routing**: Middleware automatically handles `/ar/` and `/en/` prefixes
- **Default Language**: Arabic (`ar`)

To add new translation strings:

1. Add the key-value pair to both `ar.json` and `en.json`
2. Use the translation in components:
   ```tsx
   const { t } = useTranslation();
   <h1>{t('namespace.key')}</h1>
   ```

## Styling

- **Color System**: Custom CSS variables in `globals.css` with semantic naming
- **Font**: SF Pro AR (Arabic optimized) with fallbacks
- **Tailwind CSS**: Utility-first CSS framework with custom color configuration
- **Animations**: Smooth transitions and animations for better UX
- **RTL Support**: Automatic RTL/LTR handling based on locale

## Components

### Layout Components
- **Sidebar**: Navigation sidebar with active state indicators
- **MainLayout**: Main layout wrapper with sidebar and AI button
- **AIButton**: Floating AI assistant button (left side for RTL)

### Dashboard Components
- **DashboardHeader**: Header with user info and add button
- **DashboardStats**: Statistics cards showing key metrics
- **InvoiceCard**: Card component for displaying invoice information
- **RecentInvoices**: Grid of recent invoices

### Invoice Components
- **InvoicesTable**: Detailed table view of invoices
- **InvoiceFormModal**: Modal form for creating/editing invoices

### Common Components
- **BackButton**: Navigation back button with RTL support
- **LanguageSwitcher**: Language selection button

## Technology Stack

- **Framework**: Next.js 16
- **React**: 19
- **Styling**: Tailwind CSS 3.4
- **Typography**: Custom fonts (SF Pro AR)
- **Type Safety**: TypeScript
- **Localization**: Custom i18n implementation

## Building for Production

```bash
pnpm build
pnpm start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Database integration for persistent storage
- User authentication
- Advanced filtering and search
- Invoice PDF generation
- Payment tracking
- Analytics dashboard
- Email notifications

## License

Private - All rights reserved

## Support

For issues and feature requests, please contact the development team.
