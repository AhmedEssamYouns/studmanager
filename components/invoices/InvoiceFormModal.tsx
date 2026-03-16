'use client';

import { useState } from 'react';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { FC } from 'react';

interface InvoiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: InvoiceFormData) => void;
}

export interface InvoiceFormData {
  invoiceNumber: string;
  productName: string;
  clientName: string;
  workName: string;
  invoiceDate: string;
  status: string;
  category: string;
  cost: string;
}

export const InvoiceFormModal: FC<InvoiceFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { direction } = useLocale();
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNumber: '',
    productName: '',
    clientName: '',
    workName: '',
    invoiceDate: '',
    status: 'pending',
    category: 'feed',
    cost: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      invoiceNumber: '',
      productName: '',
      clientName: '',
      workName: '',
      invoiceDate: '',
      status: 'pending',
      category: 'feed',
      cost: '',
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-light rounded-2xl shadow-2xl z-50 w-96 max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          direction === 'rtl' ? 'text-right' : 'text-left'
        }`}
        style={{
          animation: 'slideIn 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div className={`sticky top-0 bg-primary-light border-b border-border-gray p-6 flex items-center justify-between gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-xl font-semibold text-text-dark">
            {t('invoices.addNew')}
          </h2>
          <button
            onClick={onClose}
            className="text-text-gray hover:text-text-dark transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Row 1: Invoice Number & Product Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-gray mb-2">
                {t('invoices.invoiceNumber')}
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                placeholder={t('invoices.invoiceNumber')}
                className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-accent-brown outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-gray mb-2">
                {t('invoices.productName')}
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder={t('invoices.productName')}
                className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-accent-brown outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* Row 2: Invoice Date & Work Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-gray mb-2">
                {t('invoices.invoiceDate')}
              </label>
              <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-accent-brown outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-gray mb-2">
                {t('invoices.workName')}
              </label>
              <input
                type="text"
                name="workName"
                value={formData.workName}
                onChange={handleChange}
                placeholder={t('invoices.workName')}
                className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-accent-brown outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* Row 3: Client Name & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-gray mb-2">
                {t('invoices.clientName')}
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder={t('invoices.clientName')}
                className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-accent-brown outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-gray mb-2">
                {t('invoices.status')}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-accent-brown outline-none transition-colors text-sm bg-primary-light"
              >
                <option value="pending">{t('invoices.pending')}</option>
                <option value="paid">{t('invoices.paid')}</option>
                <option value="unpaid">{t('invoices.unpaid')}</option>
                <option value="approved">{t('invoices.approved')}</option>
              </select>
            </div>
          </div>

          {/* Row 4: Category & Cost */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-gray mb-2">
                {t('invoices.category')}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-accent-brown outline-none transition-colors text-sm bg-primary-light"
              >
                <option value="feed">{t('invoices.category_feed')}</option>
                <option value="vet">{t('invoices.category_vet')}</option>
                <option value="grooming">{t('invoices.category_grooming')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-gray mb-2">
                {t('invoices.cost')}
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-accent-brown outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className={`flex gap-3 pt-6 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <button
              type="submit"
              className="flex-1 bg-primary-dark text-primary-light py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
            >
              {t('common.save')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-secondary-gray text-text-dark py-3 rounded-lg font-semibold hover:bg-border-gray transition-all duration-300"
            >
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
};
