'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { SettingsTabs, SettingCategory } from '@/components/settings/SettingsTabs';
import { SettingsForm } from '@/components/settings/SettingsForm';
import { SettingsTable } from '@/components/settings/SettingsTable';
import { Search } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingCategory>('housing');
  const { direction } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === 'rtl';

  return (
    <MainLayout>
      <div className={`flex flex-col gap-6 p-4 sm:p-6 lg:p-8 ${isRTL ? 'font-cairo' : ''}`} dir={direction}>
        <div className={`flex flex-col gap-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-2xl font-bold text-[#20203C]">{t('settings.title')}</h1>
        </div>

        <div className={`flex flex-col lg:flex-row gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Main Controls Area */}
          <div className="flex-1 flex flex-col gap-6">
        <div className={`flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden border border-gray-100 shadow-sm`}>
          {/* Main Area: Form and Tabs */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-[400px]">
            {isRTL ? (
              <>
                <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <SettingsForm activeTab={activeTab} />
              </>
            ) : (
              <>
                <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <SettingsForm activeTab={activeTab} />
              </>
            )}
          </div>
        </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder={t('common.search')}
                className={`w-full px-10 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2F1A] shadow-sm ${
                  isRTL ? 'text-right pr-12 pl-4' : 'text-left pl-12 pr-4'
                }`}
              />
              <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 ${isRTL ? 'right-4' : 'left-4'}`} />
            </div>

            {/* Results Table */}
            <SettingsTable activeTab={activeTab} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
