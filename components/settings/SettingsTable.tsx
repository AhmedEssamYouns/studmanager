'use client';

import { useLocale, useTranslation } from '@/lib/locale-context';
import { SettingCategory } from './SettingsTabs';
import { Edit2, Trash2 } from 'lucide-react';

interface SettingsTableProps {
  activeTab: SettingCategory;
}

export function SettingsTable({ activeTab }: SettingsTableProps) {
  const { direction } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === 'rtl';

  const columns: Record<SettingCategory, { key: string; label: string }[]> = {
    housing: [
      { key: 'numPlaces', label: t('settings.numPlaces') },
      { key: 'numHorses', label: t('settings.numHorses') },
    ],
    bloodTest: [
      { key: 'labName', label: t('settings.labName') },
      { key: 'sampleReason', label: t('settings.sampleReason') },
      { key: 'followUpNumber', label: t('settings.followUpNumber') },
    ],
    wormDose: [
      { key: 'doseType', label: t('settings.doseType') },
      { key: 'doseResponsible', label: t('settings.doseResponsible') },
    ],
    hoofLegCare: [
      { key: 'farrierName', label: t('settings.farrierName') },
      { key: 'shoeingType', label: t('settings.shoeingType') },
    ],
    injuries: [
      { key: 'injuryName', label: t('settings.injuryName') },
      { key: 'conditionName', label: t('settings.conditionName') },
    ],
    medicalCare: [
      { key: 'careType', label: t('settings.careType') },
      { key: 'followUpNumber', label: t('settings.followUpNumber') },
    ],
  };

  const activeCols = columns[activeTab] || [];

  // Mock data
  const data = [
    { id: 1, val1: t('settings.labName'), val2: t('settings.sampleReason'), val3: '01010101010' },
    { id: 2, val1: t('settings.labName'), val2: t('settings.sampleReason'), val3: '01010101010' },
    { id: 3, val1: t('settings.labName'), val2: t('settings.sampleReason'), val3: '01010101010' },
    { id: 4, val1: t('settings.labName'), val2: t('settings.sampleReason'), val3: '01010101010' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#311C11] text-white">
              {activeCols.map((col) => (
                <th
                  key={col.key}
                  className={`py-4 px-6 text-sm font-bold ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {col.label}
                </th>
              ))}
              <th className={`py-4 px-6 text-sm font-bold text-center`}>
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {activeCols.map((_, colIdx) => (
                  <td key={colIdx} className={`py-4 px-6 text-sm text-[#20203C] font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                    {colIdx === 0 ? row.val1 : colIdx === 1 ? row.val2 : row.val3}
                  </td>
                ))}
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <span className="w-px h-6 bg-gray-200" />
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
