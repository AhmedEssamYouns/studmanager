# StudManager - Quick Reference Card

## Page Routes

```
/ar/dashboard       Dashboard (Arabic)
/en/dashboard       Dashboard (English)
/ar/invoices        Invoices
/en/invoices        Invoices
/ar/horses          Horse Management (الخيول)
/en/horses          Horse Management
/ar/groups          Group Management (المجموعات)
/en/groups          Group Management
/ar/facilities      Facility Management (المرافق)
/en/facilities      Facility Management
```

## Translation Keys Quick Look

### Common Keys
```
common.save         "Save" / "حفظ"
common.cancel       "Cancel" / "إلغاء"
common.delete       "Delete" / "حذف"
common.edit         "Edit" / "تعديل"
common.add          "Add" / "إضافة"
common.back         "Back" / "رجوع"
common.search       "Search" / "بحث"
common.language     "Language" / "اللغة"
```

### Horses Keys
```
horses.title              "Horses" / "الخيول"
horses.addNew             "Add New Horse" / "إضافة خيل جديد"
horses.horseName          "Horse Name" / "اسم الخيل"
horses.horseNameAr        "Horse Name (Arabic)" / "اسم الخيل (عربي)"
horses.horseNameEn        "Horse Name (English)" / "اسم الخيل (إنجليزي)"
horses.type               "Type" / "النوع"
horses.gender             "Gender" / "الجنس"
horses.birthDate          "Birth Date" / "تاريخ الميلاد"
horses.features           "Features" / "المميزات"
horses.image              "Image" / "الصورة"
horses.dragDropImage      "Drag image or click to upload" / "اسحب الصورة أو انقر للتحميل"
horses.viewDetails        "View Details" / "عرض التفاصيل"
horses.male               "Male" / "ذكر"
horses.female             "Female" / "أنثى"
horses.editHorse          "Edit Horse" / "تعديل خيل"
```

### Groups Keys
```
groups.title              "Groups" / "المجموعات"
groups.addNew             "Add New Group" / "إضافة مجموعة جديدة"
groups.groupName          "Group Name" / "اسم المجموعة"
groups.groupNameAr        "Group Name (Arabic)" / "اسم المجموعة (عربي)"
groups.groupNameEn        "Group Name (English)" / "اسم المجموعة (إنجليزي)"
groups.description        "Description" / "الوصف"
groups.members            "Members" / "الأعضاء"
groups.addGroup           "Add New Group" / "إضافة مجموعة جديدة"
groups.editGroup          "Edit Group" / "تعديل مجموعة"
```

### Facilities Keys
```
facilities.title              "Facilities" / "المرافق"
facilities.addNew             "Add New Facility" / "إضافة مرفق جديد"
facilities.facilityName       "Facility Name" / "اسم المرفق"
facilities.facilityNameAr     "Facility Name (Arabic)" / "اسم المرفق (عربي)"
facilities.facilityNameEn     "Facility Name (English)" / "اسم المرفق (إنجليزي)"
facilities.description        "Description" / "الوصف"
facilities.addFacility        "Add New Facility" / "إضافة مرفق جديد"
facilities.editFacility       "Edit Facility" / "تعديل مرفق"
```

## Component Usage Examples

### ImageUpload Component
```tsx
import { ImageUpload } from '@/components/common/ImageUpload';

<ImageUpload
  onImageSelected={(file, preview) => {
    setImageFile(file);
    setImagePreview(preview);
  }}
  previewImage={existingImage}
  label={t('horses.image')}
/>
```

### FormModal Component
```tsx
import { FormModal } from '@/components/common/FormModal';

<FormModal
  isOpen={isOpen}
  title={t('groups.addGroup')}
  onClose={handleClose}
  onSubmit={handleSubmit}
  submitText={t('common.save')}
  cancelText={t('common.cancel')}
>
  {/* Form inputs */}
</FormModal>
```

### Using Locale Context
```tsx
import { useLocale, useTranslation } from '@/lib/locale-context';

const { t } = useTranslation();
const { direction, locale } = useLocale();

// In JSX:
<div className={direction === 'rtl' ? 'flex-row-reverse' : ''}>
  {locale === 'ar' ? 'نص عربي' : 'English text'}
</div>
```

## CSS Color Classes

```css
bg-primary-dark         #2D1810 (dark brown)
bg-primary-light        #F5F1ED (cream)
bg-secondary-gray       #E8E4E0
text-text-dark          #3D3D3D
text-text-gray          #999999
border-border-gray      #D4CFCA
```

## Button Styles

### Primary Button
```tsx
<button className="bg-primary-dark text-primary-light px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300">
  Save
</button>
```

### Secondary Button
```tsx
<button className="border border-border-gray text-text-dark px-4 py-2 rounded-lg font-medium hover:bg-secondary-gray transition-all duration-300">
  Cancel
</button>
```

### Icon Button
```tsx
<button className="text-text-gray hover:text-text-dark transition-colors">
  <svg className="w-5 h-5">...</svg>
</button>
```

## Form Input Pattern

```tsx
<input
  type="text"
  name="fieldName"
  value={formData.fieldName}
  onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
  placeholder={t('key.for.placeholder')}
  className={`w-full border border-border-gray rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
  required
/>
```

## Modal Overlay Pattern

```tsx
{isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      {/* Modal content */}
    </div>
  </div>
)}
```

## Responsive Grid Pattern

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

## Table Pattern

```tsx
<table className="w-full">
  <thead>
    <tr className="border-b border-border-gray bg-secondary-gray">
      <th className={`px-6 py-3 text-sm font-semibold ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        Header
      </th>
    </tr>
  </thead>
  <tbody>
    {items.map(item => (
      <tr key={item.id} className="border-b border-border-gray hover:bg-secondary-gray">
        <td className={`px-6 py-4 text-sm ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          {item.name}
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

## Flex Direction with RTL

```tsx
// Instead of flex-row for English and flex-row-reverse for Arabic:
<div className={`flex ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
  Content
</div>

// Or with gap-x (works with RTL automatically):
<div className="flex gap-4">
  Content
</div>
```

## State Initialization Pattern

```tsx
// Modal state
const [isOpen, setIsOpen] = useState(false);

// Form data
const [formData, setFormData] = useState({
  nameAr: '',
  nameEn: '',
  description: ''
});

// List state
const [items, setItems] = useState(mockData);
```

## Handle Submit Pattern

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validation
  if (!formData.name) {
    alert(t('validation.required'));
    return;
  }

  // Create/Update item
  const newItem = {
    id: Date.now().toString(),
    ...formData
  };

  // Update state
  setItems([...items, newItem]);
  
  // Reset form
  setFormData({ nameAr: '', nameEn: '' });
  
  // Close modal
  setIsOpen(false);
};
```

## Delete Handler Pattern

```tsx
const handleDelete = (id: string) => {
  // Show confirmation
  setSelectedId(id);
  setShowDeleteConfirm(true);
};

const confirmDelete = () => {
  // Filter out deleted item
  setItems(items.filter(item => item.id !== selectedId));
  
  // Close confirmation
  setShowDeleteConfirm(false);
};
```

## File Structure Reference

```
/studmanager/
├── app/
│   ├── layout.tsx                 (Root layout)
│   ├── page.tsx                   (Redirect to /ar/dashboard)
│   ├── globals.css                (Global styles)
│   └── [locale]/
│       ├── layout.tsx             (Locale layout)
│       ├── dashboard/page.tsx
│       ├── invoices/page.tsx
│       ├── horses/page.tsx        ← NEW
│       ├── groups/page.tsx        ← NEW
│       └── facilities/page.tsx    ← NEW
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── MainLayout.tsx
│   │   └── AIButton.tsx
│   ├── common/
│   │   ├── ImageUpload.tsx        ← NEW
│   │   ├── FormModal.tsx          ← NEW
│   │   ├── BackButton.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── InvoiceCard.tsx
│   │   └── RecentInvoices.tsx
│   ├── horses/                    ← NEW
│   │   ├── HorseCard.tsx
│   │   └── HorseFormModal.tsx
│   └── invoices/
│       ├── InvoiceFormModal.tsx
│       └── InvoicesTable.tsx
├── lib/
│   ├── i18n.ts
│   └── locale-context.tsx
├── public/
│   ├── locales/
│   │   ├── ar.json               (Updated)
│   │   └── en.json               (Updated)
│   ├── icons/
│   │   └── *.svg
│   └── fonts/
│       └── alfont_com_SFProAR_semibold.ttf
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.js
    ├── postcss.config.js
    └── proxy.ts
```

## Key File Sizes (Approximate)

- HorseFormModal.tsx: 191 lines
- HorseCard.tsx: 109 lines
- ImageUpload.tsx: 125 lines
- Groups page: 209 lines
- Facilities page: 199 lines
- Horses page: 158 lines

All components optimized for readability and maintainability!
