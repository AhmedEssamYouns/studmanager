# StudManager Developer Guide

Quick reference for developers working with StudManager.

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Visit [http://localhost:3000](http://localhost:3000) - automatically redirects to `/ar/dashboard`

---

## 📍 Key Hooks & Utilities

### Using Locale and Translations

```tsx
'use client';

import { useLocale, useTranslation } from '@/lib/locale-context';

export function MyComponent() {
  const { locale, direction } = useLocale();
  const { t } = useTranslation();

  return (
    <div dir={direction}>
      <h1>{t('common.save')}</h1>
      {locale === 'ar' ? 'أهلا' : 'Hello'}
    </div>
  );
}
```

### Locale-Aware Links

```tsx
import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';

export function MyLink() {
  const { locale } = useLocale();
  
  return <Link href={`/${locale}/invoices`}>Go to Invoices</Link>;
}
```

### RTL Flexbox Pattern

```tsx
// Always use flex with direction handling
const { direction } = useLocale();

return (
  <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
    {/* Your content */}
  </div>
);
```

---

## 📝 Adding Translations

### Step 1: Add to both JSON files

**public/locales/ar.json:**
```json
{
  "myFeature": {
    "title": "عنوان الميزة",
    "description": "وصف الميزة"
  }
}
```

**public/locales/en.json:**
```json
{
  "myFeature": {
    "title": "Feature Title",
    "description": "Feature Description"
  }
}
```

### Step 2: Use in components

```tsx
const { t } = useTranslation();

<h1>{t('myFeature.title')}</h1>
<p>{t('myFeature.description')}</p>
```

---

## 🎨 Using Color System

### Available Colors

```tsx
// Primary
<div className="bg-primary-dark text-primary-light">Dark</div>
<div className="bg-primary-light text-primary-dark">Light</div>

// Secondary & Borders
<div className="bg-secondary-gray border border-border-gray">Card</div>

// Text
<div className="text-text-dark">Dark text</div>
<div className="text-text-gray">Gray text</div>

// Accent
<div className="text-accent-brown">Brown accent</div>

// Status
<div className="bg-pale-green text-success-green">Success</div>
<div className="bg-pale-yellow text-warning-orange">Warning</div>
<div className="bg-pale-red text-danger-red">Danger</div>
```

### Adding New Colors

1. Add to `:root` in `app/globals.css`
2. Add to `tailwind.config.ts` colors extend
3. Use with Tailwind classes

---

## 🧩 Creating New Components

### Template: Small, Focused Component

```tsx
'use client';

import { useLocale, useTranslation } from '@/lib/locale-context';
import { FC } from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: FC<MyComponentProps> = ({ title, onAction }) => {
  const { direction } = useLocale();
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
      <h2 className="text-lg font-semibold text-text-dark">{title}</h2>
      {onAction && (
        <button
          onClick={onAction}
          className="bg-primary-dark text-primary-light px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300"
        >
          {t('common.save')}
        </button>
      )}
    </div>
  );
};
```

### Best Practices

- Keep components under 150 lines
- Use `FC<Props>` type for clear prop typing
- Always add `'use client'` for interactive components
- Use hooks at the top of component
- Extract complex JSX into sub-components
- Use semantic HTML elements

---

## 📱 Navigation & Routing

### Sidebar Navigation Structure

```tsx
const sidebarItems = [
  { key: 'dashboard', icon: 'dashboard', icon_focused: 'dashboard-focused' },
  { key: 'invoices', icon: 'dashboard', icon_focused: 'dashboard-focused' },
  // ...
];
```

To add new menu item:
1. Add to `sidebarItems` array in `components/layout/Sidebar.tsx`
2. Add translation to both `ar.json` and `en.json` under `sidebar.yourKey`
3. Add icons to `public/icons/` (normal and focused versions)
4. Create page file at `app/[locale]/yourPage/page.tsx`

---

## 🔄 Locale Proxy

The proxy automatically handles routing:

```
/dashboard          → /ar/dashboard (default locale)
/en/dashboard       → /en/dashboard
/ar/invoices        → /ar/invoices
```

All paths are automatically prefixed with locale if not present.

---

## 🎭 Form Handling

### InvoiceFormModal Pattern

```tsx
const [isOpen, setIsOpen] = useState(false);

const handleSubmit = (data: InvoiceFormData) => {
  console.log('Form data:', data);
  // Call API or update state
  setIsOpen(false);
};

return (
  <>
    <InvoiceFormModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
    />
  </>
);
```

---

## 🎨 Animation Patterns

### Smooth Transitions

```tsx
// For interactive elements
className="transition-all duration-300"

// For hover states
className="hover:bg-secondary-gray transition-colors"

// For opacity
className="transition-opacity duration-300"
```

### Predefined Keyframes

Available in `globals.css`:
- `slideIn` - Fade + slide up
- `fadeIn` - Opacity only
- `tabSlide` - Slide with RTL support

---

## 🧪 Debugging Tips

### Check Current Locale

```tsx
const { locale, direction } = useLocale();
console.log('Current locale:', locale);
console.log('Direction:', direction);
```

### Test Translations

```tsx
const { t } = useTranslation();
console.log(t('sidebar.dashboard')); // Should output translation
```

### Verify Router

```tsx
const { locale } = useLocale();
const pathname = usePathname();
console.log('Current path:', pathname);
console.log('Locale:', locale);
```

---

## 📦 File Organization Rules

```
components/
├── layout/         # Page layout (Sidebar, MainLayout, etc.)
├── dashboard/      # Dashboard-specific components
├── invoices/       # Invoice-specific components
└── common/         # Reusable across all pages

app/[locale]/
├── dashboard/      # /ar/dashboard, /en/dashboard
├── invoices/       # /ar/invoices, /en/invoices
└── [other-pages]/  # Additional pages

lib/
├── i18n.ts         # Locale utilities
└── locale-context.tsx  # Context provider
```

---

## 🔗 Common Imports

```tsx
// Hooks
import { useLocale, useTranslation } from '@/lib/locale-context';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

// Utilities
import { getDirection } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { MainLayout } from '@/components/layout/MainLayout';
import { BackButton } from '@/components/common/BackButton';
```

---

## ✅ Pre-launch Checklist

Before deploying:
- [ ] All translations added to both `ar.json` and `en.json`
- [ ] All new icons added to `public/icons/`
- [ ] All components have proper TypeScript types
- [ ] RTL handled on all new pages (flex-row-reverse pattern)
- [ ] Colors use CSS variables, not hardcoded
- [ ] No `console.log` statements in production code
- [ ] All links use locale from `useLocale()` hook
- [ ] Forms have proper error handling
- [ ] Images have alt text
- [ ] Mobile responsive tested
- [ ] Both languages tested thoroughly

---

## 🆘 Common Issues

### Translation not showing?
- Check key path: `namespace.key` matches JSON structure
- Verify spelling matches exactly
- Ensure key exists in BOTH `ar.json` and `en.json`

### RTL not working?
- Add `flex-row-reverse` to flex containers
- Check `direction` from `useLocale()`
- Verify HTML has correct `dir` attribute

### Route not found?
- Check `proxy.ts` is properly configured
- Verify `[locale]` folder exists
- Make sure locale prefix is in URL

### Styles not applying?
- Check Tailwind class syntax
- Verify color variable exists in globals.css
- Clear `.next` folder and rebuild

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎯 Quick Commands

```bash
# Format code
pnpm lint

# Build and test
pnpm build

# Type check
pnpm type-check

# Clean build
rm -rf .next && pnpm build

# Update translations only
# Edit public/locales/ar.json and en.json, then restart dev server
```

---

**Happy coding! 🚀**
