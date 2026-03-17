'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { HorsePedigreeTree } from '@/components/horses/HorsePedigreeTree';
import { ChevronDown } from 'lucide-react';

export default function DatabasePage() {
  const { direction } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === 'rtl';
  const [activeTab, setActiveTab] = useState<'pedigree' | 'mating'>('pedigree');

  // Mock horse data for the tree
  const mockHorse = {
    name: "Mohamed Saleh",
    id: "1"
  };

  return (
    <MainLayout>
      <div className={`space-y-6 ${isRTL ? 'font-cairo' : ''}`} dir={direction}>
        {/* Header Tabs */}
        <div className="flex justify-end pt-4" dir={isRTL ? 'ltr' : 'rtl'}>
          <div className="inline-flex rounded-2xl bg-white p-1.5 shadow-sm border border-gray-50">
            <button
              onClick={() => setActiveTab('pedigree')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'pedigree'
                  ? 'bg-[#3b2b20] text-white shadow-lg'
                  : 'text-[#5a473d] hover:bg-gray-50'
              }`}
            >
              <img 
                src={activeTab === 'pedigree' ? "/svgs/pedigree-white.svg" : "/svgs/pedigree-brown.svg"} 
                alt="" 
                className="w-5 h-5" 
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span>{t('database.pedigreeTab')}</span>
            </button>
            <button
              onClick={() => setActiveTab('mating')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'mating'
                  ? 'bg-[#3b2b20] text-white shadow-lg'
                  : 'text-[#5a473d] hover:bg-gray-50'
              }`}
            >
              <img 
                src={activeTab === 'mating' ? "/svgs/mating-white.svg" : "/svgs/mating-brown.svg"} 
                alt="" 
                className="w-5 h-5"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span>{t('database.matingTab')}</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_12px_26px_rgba(91,53,24,0.06)] border border-gray-50">
          {/* Notes */}
          <div className={`mb-8 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {activeTab === 'pedigree' ? (
              <p className="text-[#8d7769] text-sm md:text-base font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8d7769]" />
                {t('database.pedigreeNote')}
              </p>
            ) : (
              <>
                <p className="text-[#8d7769] text-sm md:text-base font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8d7769]" />
                  {t('database.matingNoteHeader')}
                </p>
                <p className="text-[#8d7769] text-sm md:text-base font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8d7769]" />
                  {t('database.matingNoteSub')}
                </p>
              </>
            )}
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {activeTab === 'pedigree' ? (
              <div className="relative md:col-span-2">
                <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${isRTL ? 'left-4' : 'right-4'}`}>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
                <select className={`w-full bg-[#fdfbf9] border border-gray-200 rounded-[20px] px-6 py-4 text-[#20203c] font-bold outline-none focus:border-[#3b2b20] transition-colors appearance-none ${isRTL ? 'text-right' : 'text-left'}`}>
                  <option selected disabled>{t('database.selectHorse')}</option>
                  <option>Horse 1</option>
                  <option>Horse 2</option>
                </select>
              </div>
            ) : (
              <>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t('database.fatherName')}
                    className={`w-full bg-[#fdfbf9] border border-gray-200 rounded-[20px] px-6 py-4 text-[#20203c] font-bold outline-none focus:border-[#3b2b20] transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t('database.motherName')}
                    className={`w-full bg-[#fdfbf9] border border-gray-200 rounded-[20px] px-6 py-4 text-[#20203c] font-bold outline-none focus:border-[#3b2b20] transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                </div>
              </>
            )}
          </div>

          {/* Pedigree Tree Component */}
          <header className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
             <h2 className="text-[1.7rem] font-bold text-[#20203c]">
               {activeTab === 'pedigree' ? t('database.pedigreeTab') : t('database.matingResult')}
             </h2>
          </header>

          <HorsePedigreeTree horse={mockHorse} showTitle={false} />
        </div>
      </div>
    </MainLayout>
  );
}
