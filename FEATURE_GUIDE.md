# StudManager - Complete Feature Guide

## Project Overview

StudManager is a professional horse breeding and facility management system with complete Arabic/English support. The application includes comprehensive invoice, horse, group, and facility management capabilities.

---

## Core Pages & Features

### 1. Dashboard (`/[locale]/dashboard`)
**Purpose**: Quick overview and statistics
- Statistics cards showing:
  - Total horses count
  - Budget information
  - Expenses summary
  - Sales data
- Recent invoices preview
- Quick add invoice button
- User profile section with avatar

### 2. Invoices (`/[locale]/invoices`)
**Purpose**: Manage financial transactions
- Table view with columns:
  - Product name
  - Client name
  - Invoice number
  - Date
  - Status (color-coded: green/orange/red)
  - Category
  - Cost
- Edit and delete buttons per row
- Add new invoice modal
- Sorting and filtering ready

**Form Fields**:
- Invoice number
- Product name
- Client name
- Work name
- Invoice date
- Status dropdown (Pending, Paid, Unpaid, etc.)
- Category dropdown (Feed, Veterinary, Grooming)
- Cost field

### 3. Horses (`/[locale]/horses`)
**Purpose**: Manage horse inventory
- Grid layout (3 columns) of horse cards
- Each card displays:
  - Circular horse image
  - Horse name
  - Type/Breed
  - Birth date
  - Features count
  - View details button
  - Edit and delete icons
- Add new horse button

**Add Horse Modal Features**:
- Image upload with drag-and-drop
  - Drag image directly onto form
  - Click to open file browser
  - Real-time preview
  - Validates image format (PNG, JPG, GIF, WebP)
- Arabic name field
- English name field
- Gender selector (Male/Female)
- Horse type dropdown (Arabian, Thoroughbred, Quarter Horse)
- Birth date picker
- Form validation

**Image Upload Mechanics**:
```
User Action → Image File Selected
      ↓
File Validation (Image Type Check)
      ↓
FileReader API → Base64 Conversion
      ↓
Preview Display + File Object Return
      ↓
Form Submission with File Data
```

### 4. Groups (`/[locale]/groups`)
**Purpose**: Organize horses into management groups
- Table view with columns:
  - Group name (bilingual)
  - Description
  - Member count
  - Action buttons
- Add new group button

**Add/Edit Group Modal**:
- Arabic group name
- English group name
- Description text area
- Submit button

**Delete Confirmation**:
- Modal overlay
- Trash icon
- Confirmation message in user's language
- Delete/Cancel buttons

### 5. Facilities (`/[locale]/facilities`)
**Purpose**: Manage barn and facility information
- Table view with columns:
  - Facility name (bilingual)
  - Description
  - Action buttons
- Add new facility button
- Same modal and delete pattern as groups

---

## Component Library

### Layout Components

#### MainLayout
Wrapper for all pages combining:
- Sidebar navigation
- Floating AI button
- Main content area
- Proper spacing for RTL/LTR

#### Sidebar
- Fixed left sidebar (RTL: right)
- 12 navigation items
- Active state highlighting
- Icon switching based on state
- Smooth transitions

#### AIButton
- Floating button (bottom-left, RTL: bottom-right)
- Expandable assistant interface
- Overlay background
- Chat-like interaction

### Common Components

#### ImageUpload
```tsx
<ImageUpload
  onImageSelected={(file, preview) => {
    // Handle selected file
  }}
  previewImage={existingImage}
  label="Horse Photo"
/>
```
Features:
- Drag-and-drop zone
- File browser fallback
- Image preview
- Size validation
- Format validation

#### FormModal
Reusable modal for forms:
```tsx
<FormModal
  isOpen={isOpen}
  title="Add New Group"
  onClose={() => setOpen(false)}
  onSubmit={handleSubmit}
  submitText="Save"
  cancelText="Cancel"
>
  {/* Form content */}
</FormModal>
```

#### BackButton
Navigation back with RTL support
- Previous page navigation
- Icon adjustment for RTL
- Smooth transition

#### LanguageSwitcher
- Language toggle (AR/EN)
- Flag icons
- Locale context update
- Page reloads with new language

### Dashboard Components

#### DashboardStats
- 4 statistics cards
- Icon display
- Number formatting
- Responsive grid

#### InvoiceCard
- Product information
- Client details
- Status badges
- Cost display
- Edit/Delete icons

#### RecentInvoices
- Summary table
- Most recent items
- Status indicators
- Quick action buttons

#### DashboardHeader
- User profile section
- Search functionality
- Language switcher
- Logo display

### Horse Components

#### HorseCard
- Circular image container
- Bilingual name support
- Details grid
- Action buttons
- Hover effects

#### HorseFormModal
- Multi-step form (manual entry)
- Image upload section
- Bilingual fields
- Dropdowns
- Date picker
- Form validation

### Invoice Components

#### InvoiceFormModal
- Invoice-specific fields
- Status/Category dropdowns
- Date picker
- Cost calculation ready
- Form validation

#### InvoicesTable
- Sortable columns
- Status color coding
- Edit/Delete buttons
- Pagination ready
- Responsive overflow

---

## Internationalization (i18n)

### Language Files
- `public/locales/ar.json` - Arabic translations
- `public/locales/en.json` - English translations

### Key Structure
```json
{
  "sidebar": { "dashboard": "...", "horses": "..." },
  "dashboard": { "title": "...", "stats": "..." },
  "horses": { "title": "...", "addNew": "..." },
  "groups": { "title": "...", "addNew": "..." },
  "facilities": { "title": "...", "addNew": "..." }
}
```

### Usage
```tsx
import { useTranslation } from '@/lib/locale-context';

const { t } = useTranslation();
// t('sidebar.dashboard') → Returns translated text
// t('horses.title') → Returns "الخيول" or "Horses"
```

### RTL/LTR Handling
```tsx
import { useLocale } from '@/lib/locale-context';

const { direction, locale } = useLocale();
// direction: 'rtl' | 'ltr'
// locale: 'ar' | 'en'

// Usage in className:
className={`${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
```

---

## Styling System

### Color Palette
- **Primary Dark**: `#2D1810` (brown)
- **Primary Light**: `#F5F1ED` (cream)
- **Secondary Gray**: `#E8E4E0`
- **Border Gray**: `#D4CFCA`
- **Text Dark**: `#3D3D3D`
- **Text Gray**: `#999999`

### Tailwind Configuration
All colors defined in `tailwind.config.ts`:
```ts
colors: {
  primary: { dark: '#2D1810', light: '#F5F1ED' },
  secondary: { gray: '#E8E4E0' },
  border: { gray: '#D4CFCA' },
  text: { dark: '#3D3D3D', gray: '#999999' }
}
```

### Typography
- **Font**: SF Pro AR (Arabic-optimized)
- **Line Height**: 1.4-1.6 for body text
- **Sizing**: Standard Tailwind scale
- **Weight**: Regular, Medium, Semibold

### Animations
- **Standard Duration**: 300ms
- **Easing**: ease-in-out
- **Applied to**:
  - Hover states
  - Tab switches
  - Modal transitions
  - Button clicks
  - Sidebar active state

---

## State Management

### React Hooks Pattern
```tsx
const [isModalOpen, setIsModalOpen] = useState(false);
const [items, setItems] = useState(mockData);
const [formData, setFormData] = useState({});

// Update handler
const handleAdd = (e: FormEvent) => {
  e.preventDefault();
  setItems([...items, newItem]);
  setFormData({}); // Reset
  setIsModalOpen(false);
};
```

### Context API
- LocaleContext provides:
  - `locale` - Current language ('ar'/'en')
  - `direction` - Text direction ('rtl'/'ltr')
  - `useTranslation()` - Translation function
  - `useLocale()` - Locale utilities

---

## Data Flow Examples

### Adding a New Horse
```
User clicks "Add Horse"
    ↓
Modal opens
    ↓
User fills form + selects image
    ↓
Image drag-drop handler processes file
    ↓
Preview updates in real-time
    ↓
User clicks "Save"
    ↓
Form validation runs
    ↓
handleAddHorse() receives complete data:
  {
    nameAr: string,
    nameEn: string,
    type: string,
    gender: string,
    birthDate: string,
    image: File,
    imagePreview: string (base64)
  }
    ↓
Ready to send to backend API
```

### Deleting an Item
```
User clicks delete icon
    ↓
Confirmation modal appears
    ↓
Shows localized message
    ↓
User confirms
    ↓
Item removed from array
    ↓
UI updates automatically
    ↓
Modal closes
```

---

## Image Handling

### Upload Process
1. **Drag & Drop Zone**
   - Listens for dragover/drop events
   - Visual feedback during drag

2. **File Selection**
   - Click opens system dialog
   - Returns selected file

3. **Validation**
   - Checks MIME type (image/*)
   - Validates file extension
   - Could add size limit check

4. **Processing**
   - FileReader API converts to base64
   - Preview generates from base64
   - Original File object preserved

5. **Return Data**
   - `onImageSelected(file, preview)`
   - `file`: Raw File object (for upload)
   - `preview`: Base64 string (for display)

### Storage Integration Ready
```tsx
// For Vercel Blob
const blob = await put(imageName, imageFile, {
  access: 'private'
});

// For AWS S3
await s3.upload({
  Bucket: bucketName,
  Key: imageName,
  Body: imageFile
});
```

---

## API Integration Checklist

### Backend Endpoints Needed
```
POST   /api/invoices           - Create invoice
GET    /api/invoices           - List invoices
PUT    /api/invoices/:id       - Update invoice
DELETE /api/invoices/:id       - Delete invoice

POST   /api/horses             - Create horse
GET    /api/horses             - List horses
PUT    /api/horses/:id         - Update horse
DELETE /api/horses/:id         - Delete horse

POST   /api/groups             - Create group
GET    /api/groups             - List groups
PUT    /api/groups/:id         - Update group
DELETE /api/groups/:id         - Delete group

POST   /api/facilities         - Create facility
GET    /api/facilities         - List facilities
PUT    /api/facilities/:id     - Update facility
DELETE /api/facilities/:id     - Delete facility

POST   /api/upload/image       - Upload image
```

### Form Validation Endpoints
- Email validation
- Unique name checking
- File size verification

---

## Browser Support & Features

### Required Features
- Drag and Drop API
- FileReader API
- Fetch API
- LocalStorage (optional)

### Recommended Versions
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

---

## Accessibility Features

- Semantic HTML elements
- ARIA labels on inputs
- Keyboard navigation support
- Color contrast compliance
- Alt text on images
- Form labels linked to inputs
- Error messaging for accessibility

---

## Performance Optimizations

- Next.js Image optimization
- Code splitting by route
- Lazy loading of modals
- CSS class consolidation
- Smooth transitions (GPU accelerated)
- No inline styles
- Icon SVGs (lightweight)

---

## Security Considerations

- Input sanitization ready
- File type validation
- CORS headers configured
- Protected routes via auth (future)
- XSS prevention via React
- CSRF token ready for forms

---

## Future Enhancement Ideas

1. **Search & Filtering**
   - Search within tables
   - Filter by status/type
   - Sort by columns

2. **Advanced Image Features**
   - Image crop/rotate
   - Multiple images per item
   - Image gallery

3. **Notifications**
   - Toast notifications
   - Email alerts
   - SMS updates

4. **Analytics**
   - Dashboard charts
   - Report generation
   - Data export (PDF/Excel)

5. **Advanced Permissions**
   - Role-based access
   - Team collaboration
   - Audit logs

---

## Troubleshooting

### Image Upload Not Working
- Check browser console for errors
- Verify FileReader API support
- Check file size limits
- Ensure image format is supported

### RTL Layout Issues
- Check locale context value
- Verify direction CSS classes applied
- Test language switcher

### Translation Not Showing
- Verify key exists in JSON files
- Check locale context initialization
- Look for console errors

### Modal Not Closing
- Check onClose callback
- Verify isOpen state properly toggled
- Check z-index conflicts

---

## Code Organization

All code follows these principles:
- **Single Responsibility**: Each component does one thing
- **DRY**: Reusable components for common patterns
- **Type Safety**: Full TypeScript coverage
- **Clean Code**: Functions under 200 lines
- **Comments**: Inline comments for complex logic
- **Naming**: Descriptive variable/function names

