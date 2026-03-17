'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
}) => {
  const { t } = useTranslation();
  const { direction, locale } = useLocale();

  const horseName = locale === 'ar' ? horse.nameAr : horse.nameEn;

  return (
    <div className="relative pt-20">
      {/* Image */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-36 h-36 rounded-full ring-[16px] ring-[#faf5f2] overflow-hidden bg-gray-200 z-10">
        <Image
          src={horse.image}
          alt={horseName}
          fill
          className="object-cover"
        />
      </div>

      {/* Card */}
      <div
        className={`bg-white rounded-[30px] shadow-sm hover:shadow-md transition-shadow duration-300 px-6 pb-6 pt-24 ${
          direction === 'rtl' ? 'text-right' : 'text-left'
        }`}
      >
        {/* Horse name */}
        <h3 className="text-center text-xl font-bold text-[#3b2314] mb-6 truncate">
          {horseName}
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-[#3b2314] text-lg font-semibold">
              {horse.features}
            </span>
            <span className="text-gray-500 text-sm">
              {t('horses.features')}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#3b2314] text-lg font-semibold">
              {horse.birthDate}
            </span>
            <span className="text-gray-500 text-sm">
              {t('horses.birthDate')}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#3b2314] text-lg font-semibold">
              {horse.type}
            </span>
            <span className="text-gray-500 text-sm">
              {t('horses.type')}
            </span>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/${locale}/horses/${horse.id}`}
          className="block w-full border-2 border-[#3b2314] text-[#3b2314] py-3 rounded-full font-semibold hover:bg-[#3b2314] hover:text-white transition-all duration-300 text-center"
        >
          {t('horses.viewDetails')}
        </Link>
      </div>
    </div>
  );
};