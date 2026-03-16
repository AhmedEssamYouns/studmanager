'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { HorseCard } from '@/components/horses/HorseCard';
import { HorseFormModal } from '@/components/horses/HorseFormModal';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { useState } from 'react';

// Mock data
const mockHorses = [
  {
    id: '1',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
  {
    id: '2',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
  {
    id: '3',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
  {
    id: '4',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
  {
    id: '5',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
  {
    id: '6',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
  {
    id: '7',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
  {
    id: '8',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
  {
    id: '9',
    nameAr: 'اسم الخيل',
    nameEn: 'Horse Name',
    type: 'ذكر',
    birthDate: '20/10/2007',
    features: 500,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop',
    gender: 'male',
  },
];

export default function HorsesPage() {
  const { t } = useTranslation();
  const { direction } = useLocale();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<'manual' | 'studbook'>('manual');

  const handleAddHorse = (data: any) => {
    console.log('New horse:', data);
    setIsAddModalOpen(false);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className={`bg-primary-light border-b border-border-gray p-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center justify-between gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <h1 className="text-2xl font-semibold text-text-dark">{t('horses.title')}</h1>
          <button
            onClick={() => {
              setAddMode('manual');
              setIsAddModalOpen(true);
            }}
            className="bg-primary-dark text-primary-light px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2"
          >
            <span>+</span>
            <span>{t('horses.addNew')}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHorses.map((horse) => (
            <HorseCard
              key={horse.id}
              horse={horse}
              onViewDetails={(id) => console.log('View details:', id)}
              onEdit={(id) => console.log('Edit:', id)}
              onDelete={(id) => console.log('Delete:', id)}
            />
          ))}
        </div>
      </div>

      {/* Add Horse Modal */}
      <HorseFormModal
        isOpen={isAddModalOpen}
        isManual={addMode === 'manual'}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddHorse}
      />
    </MainLayout>
  );
}
