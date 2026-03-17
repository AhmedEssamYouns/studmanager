'use client';

import { useLocale, useTranslation } from '@/lib/locale-context';

export type SettingCategory = 'housing' | 'bloodTest' | 'wormDose' | 'hoofLegCare' | 'injuries' | 'medicalCare';

interface SettingsTabsProps {
  activeTab: SettingCategory;
  onTabChange: (tab: SettingCategory) => void;
}

const categories: { id: SettingCategory; labelKey: string; icon: string }[] = [
  { id: 'housing', labelKey: 'housing', icon: '/settings/الإيواء.svg' },
  { id: 'bloodTest', labelKey: 'bloodTest', icon: '/settings/تحليل الدم.svg' },
  { id: 'wormDose', labelKey: 'wormDose', icon: '/settings/جرعة الديدان.svg' },
  { id: 'hoofLegCare', labelKey: 'hoofLegCare', icon: '/settings/العناية بالحافر  و الساق.svg' },
  { id: 'injuries', labelKey: 'injuries', icon: '/settings/الإصابات.svg' },
  { id: 'medicalCare', labelKey: 'medicalCare', icon: '/settings/الرعاية الطبية.svg' },
];

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const { direction } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === 'rtl';

  return (
    <div className={`flex flex-col gap-1 w-full sm:w-64 bg-white transition-all duration-300 ${isRTL ? 'border-l border-gray-100' : 'border-r border-gray-100'
      }`}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onTabChange(cat.id)}
          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${activeTab === cat.id
            ? `bg-[#F2EADA] text-[#4B2F1A] ${isRTL ? 'border-l-4' : 'border-r-4'} border-[#4B2F1A]`
            : 'text-gray-600 hover:bg-gray-50'
            } ${isRTL ? '' : 'flex-row justify-start'}`}
        >

          <>
            <img src={cat.icon} alt="" className="w-6 h-6 object-contain" />
            <span>{t(`settings.${cat.labelKey}`)}</span>
          </>
        </button>
      ))}
    </div>
  );
}
