'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useLocale, useTranslation } from '@/lib/locale-context';

interface Horse {
  id: string;
  nameAr: string;
  nameEn: string;
  type: string;
  birthDate: string;
  features: number;
  image: string;
  gender: string;
}

interface HorseCardProps {
  horse: Horse;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const HorseCard: FC<HorseCardProps> = ({
  horse,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const { direction, locale } = useLocale();
  const horseName = locale === 'ar' ? horse.nameAr : horse.nameEn;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="relative w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden">
          <Image
            src={horse.image}
            alt={horseName}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 space-y-3 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <h3 className="text-center font-semibold text-text-dark text-lg truncate">
          {horseName}
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-text-gray">{t('horses.type')}</span>
            <span className="font-medium text-text-dark">{horse.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-gray">{t('horses.birthDate')}</span>
            <span className="font-medium text-text-dark">{horse.birthDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-gray">{t('horses.features')}</span>
            <span className="font-medium text-text-dark">{horse.features}</span>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails?.(horse.id)}
          className="w-full mt-4 border-2 border-text-dark text-text-dark py-2 rounded-full text-sm font-medium hover:bg-text-dark hover:text-white transition-colors duration-300"
        >
          {t('horses.viewDetails')}
        </button>

        {/* Actions */}
        {(onEdit || onDelete) && (
          <div className={`flex gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {onEdit && (
              <button
                onClick={() => onEdit(horse.id)}
                className="flex-1 text-text-gray hover:text-primary-dark transition-colors p-2"
                title="Edit"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(horse.id)}
                className="flex-1 text-red-500 hover:text-red-700 transition-colors p-2"
                title="Delete"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
