'use client';

import { FC, useEffect, useState } from 'react';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { ImageUpload } from '@/components/common/ImageUpload';

interface HorseFormModalProps {
  isOpen: boolean;
  isManual?: boolean;
  initialData?: HorseFormData | null;
  onClose: () => void;
  onSubmit: (data: HorseFormData) => void;
}

export interface HorseFormData {
  nameAr: string;
  nameEn: string;
  type: string;
  gender: string;
  birthDate: string;
  features?: number;
  description?: string;
  image?: File | string;
  imagePreview?: string;
}

export const HorseFormModal: FC<HorseFormModalProps> = ({
  isOpen,
  isManual = true,
  initialData = null,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { direction } = useLocale();

  const isRTL = direction === 'rtl';

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<HorseFormData>({
    nameAr: '',
    nameEn: '',
    type: '',
    gender: '',
    birthDate: '',
    features: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const steps = [
    { id: 1, label: t('horses.step1') || 'اسم الخيل' },
    { id: 2, label: t('horses.step2') || 'بيانات الخيل' },
    { id: 3, label: t('horses.step3') || 'بيانات التعريف' },
    { id: 4, label: t('horses.step4') || 'تحميل الصور والفيديو' },
  ];

  useEffect(() => {
    if (!isOpen) return;

    setCurrentStep(1);

    if (initialData) {
      setFormData({
        nameAr: initialData.nameAr ?? '',
        nameEn: initialData.nameEn ?? '',
        type: initialData.type ?? '',
        gender: initialData.gender ?? '',
        birthDate: initialData.birthDate ?? '',
        features: initialData.features ?? 0,
        description: initialData.description ?? '',
      });

      if (typeof initialData.image === 'string') {
        setImagePreview(initialData.image);
      }
    } else {
      setFormData({
        nameAr: '',
        nameEn: '',
        type: '',
        gender: '',
        birthDate: '',
        features: 0,
        description: '',
      });

      setImagePreview('');
    }

    setImageFile(null);
  }, [isOpen, initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelected = (file: File, preview: string) => {
    setImageFile(file);
    setImagePreview(preview);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

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
      features: 0,
      description: '',
    });

    setImageFile(null);
    setImagePreview('');

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
      <div
        dir={direction}
        className="w-full max-w-6xl bg-[#faf5f2] rounded-[28px] shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#eadfd9]">

          {/* Right Title */}
          <div className="flex items-center gap-3">

            <h2 className="text-xl font-semibold text-[#2e2e2e]">
              {isManual ? 'إضافة يدوياً' : 'إضافة من Studbook'}
            </h2>
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center px-10">
            <div className="w-full max-w-xl relative">
              <input
                placeholder="بحث"
                className="w-full bg-white border border-[#eadfd9] rounded-full py-3 px-6 text-sm focus:outline-none"
              />

              <svg
                className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${
                  isRTL ? 'left-4' : 'right-4'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.3-4.3m0 0A7.5 7.5 0 105 5a7.5 7.5 0 0011.7 11.7z" />
              </svg>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black transition"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-10 py-8">

          {/* Steps */}
          {isManual && (
            <div className="flex items-center gap-6 mb-8 overflow-x-auto">

              {steps.map((step) => {
                const active = step.id === currentStep;
                const completed = step.id < currentStep;

                return (
                  <div key={step.id} className="flex items-center gap-3 whitespace-nowrap">

                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border transition
                      ${
                        active
                          ? 'bg-[#4a2b1a] text-white border-[#4a2b1a]'
                          : completed
                          ? 'bg-[#f3e5de] text-[#4a2b1a] border-[#4a2b1a]'
                          : 'bg-white text-gray-600 border-[#eadfd9]'
                      }`}
                    >
                      {step.id}
                    </button>

                    <span
                      className={`text-sm ${
                        active ? 'text-black font-semibold' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>

                  </div>
                );
              })}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-6">

                <input
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleInputChange}
                  placeholder="اسم الخيل بالعربية"
                  className="border border-[#eadfd9] rounded-xl px-4 py-3 bg-white focus:outline-none"
                  required
                />

                <input
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  placeholder="Horse Name"
                  className="border border-[#eadfd9] rounded-xl px-4 py-3 bg-white focus:outline-none"
                  required
                />

              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-3 gap-6">

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border border-[#eadfd9] rounded-xl px-4 py-3 bg-white"
                  required
                >
                  <option value="">النوع</option>
                  <option value="Arabian">Arabian</option>
                  <option value="Thoroughbred">Thoroughbred</option>
                </select>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="border border-[#eadfd9] rounded-xl px-4 py-3 bg-white"
                  required
                >
                  <option value="">النوع</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>

                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="border border-[#eadfd9] rounded-xl px-4 py-3 bg-white"
                  required
                />

              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 gap-6">

                <input
                  type="number"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="المميزات"
                  className="border border-[#eadfd9] rounded-xl px-4 py-3 bg-white"
                />

                <textarea
                  name="description"
                  value={(formData as any).description ?? ''}
                  onChange={handleInputChange}
                  placeholder="الوصف"
                  rows={4}
                  className="border border-[#eadfd9] rounded-xl px-4 py-3 bg-white"
                />

              </div>
            )}

            {currentStep === 4 && (
              <ImageUpload
                onImageSelected={handleImageSelected}
                previewImage={imagePreview}
                label="الصورة"
              />
            )}

            {/* Footer */}
            <div className="flex justify-end gap-4 pt-6">

              <button
                type="button"
                onClick={handleClose}
                className="px-8 py-3 rounded-xl border border-[#eadfd9] bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentStep === steps.length) {
                    handleSubmit();
                    return;
                  }

                  setCurrentStep((p) => p + 1);
                }}
                className="px-8 py-3 rounded-xl bg-[#4a2b1a] text-white hover:opacity-90 transition"
              >
                {currentStep === steps.length ? 'إضافة' : 'التالي'}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};