'use client';

import { useState, useRef, FC } from 'react';
import Image from 'next/image';
import { useLocale, useTranslation } from '@/lib/locale-context';

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string) => void;
  previewImage?: string;
  label?: string;
}

export const ImageUpload: FC<ImageUploadProps> = ({
  onImageSelected,
  previewImage,
  label,
}) => {
  const { t } = useTranslation();
  const { direction } = useLocale();
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(previewImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelected(file, result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className={`block text-sm font-medium text-text-dark ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          {label}
        </label>
      )}
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-primary-dark bg-blue-50' 
            : 'border-border-gray bg-primary-light hover:border-primary-dark'
          }
        `}
      >
        {preview ? (
          <div className="relative w-full h-40 flex items-center justify-center">
            <Image
              src={preview}
              alt="Preview"
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <svg className="w-12 h-12 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <div className={`text-center ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <p className="text-sm font-medium text-text-dark">
                {t('horses.dragDropImage')}
              </p>
              <p className="text-xs text-text-gray mt-1">PNG, JPG, GIF (Max. 5MB)</p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          aria-label="Upload image"
        />
      </div>
    </div>
  );
};
