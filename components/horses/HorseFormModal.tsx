'use client';

import { FC, useState } from 'react';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { ImageUpload } from '@/components/common/ImageUpload';

interface HorseFormModalProps {
  isOpen: boolean;
  isManual?: boolean;
  onClose: () => void;
  onSubmit: (data: HorseFormData) => void;
}

export interface HorseFormData {
  nameAr: string;
  nameEn: string;
  type: string;
  gender: string;
  birthDate: string;
  image?: File | string;
  imagePreview?: string;
}

export const HorseFormModal: FC<HorseFormModalProps> = ({
  isOpen,
  isManual = true,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { direction } = useLocale();
  const [formData, setFormData] = useState<HorseFormData>({
    nameAr: '',
    nameEn: '',
    type: '',
    gender: '',
    birthDate: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelected = (file: File, preview: string) => {
    setImageFile(file);
    setImagePreview(preview);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image: imageFile || formData.image,
      imagePreview,
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nameAr: '',
      nameEn: '',
      type: '',
      gender: '',
      birthDate: '',
    });
    setImageFile(null);
    setImagePreview('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b border-border-gray ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-xl font-semibold text-text-dark flex items-center gap-2">
            {isManual ? t('horses.addNew') : t('horses.addFromStudbook')}
          </h2>
          <button
            onClick={handleClose}
            className="text-text-gray hover:text-text-dark transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className={`p-6 space-y-6 ${direction === 'rtl' ? 'text-right' : ''}`}>
          
          {isManual && (
            <>
              {/* Image Upload */}
              <ImageUpload
                onImageSelected={handleImageSelected}
                previewImage={imagePreview}
                label={t('horses.image')}
              />

              {/* Name Fields */}
              <div className={`grid grid-cols-2 gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <input
                  type="text"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleInputChange}
                  placeholder={t('horses.horseNameAr')}
                  className={`border border-border-gray rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  required
                />
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  placeholder={t('horses.horseNameEn')}
                  className={`border border-border-gray rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  required
                />
              </div>

              {/* Type and Gender */}
              <div className={`grid grid-cols-2 gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`border border-border-gray rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  required
                >
                  <option value="">{t('horses.type')}</option>
                  <option value="Arabian">Arabian</option>
                  <option value="Thoroughbred">Thoroughbred</option>
                  <option value="Quarter Horse">Quarter Horse</option>
                </select>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`border border-border-gray rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  required
                >
                  <option value="">{t('horses.gender')}</option>
                  <option value="male">{t('horses.male')}</option>
                  <option value="female">{t('horses.female')}</option>
                </select>
              </div>

              {/* Birth Date */}
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className={`w-full border border-border-gray rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                required
              />
            </>
          )}

          {/* Action Buttons */}
          <div className={`flex gap-3 pt-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <button
              type="submit"
              className="flex-1 bg-primary-dark text-primary-light py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              {t('common.save')}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-border-gray text-text-dark py-2 rounded-lg text-sm font-medium hover:bg-secondary-gray transition-all duration-300"
            >
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
