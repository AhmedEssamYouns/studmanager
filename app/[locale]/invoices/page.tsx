'use client';

import { InvoiceFormModal } from '@/components/invoices/InvoiceFormModal';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftCircleIcon,
  EditIcon,
  PlusCircleIcon,
  SearchIcon,
  TrashIcon,
} from '@/components/layout/AppIcons';
import { MainLayout } from '@/components/layout/MainLayout';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { useState } from 'react';

const mockInvoices = [
  {
    id: '1',
    productName: 'اسم المنتج',
    clientName: 'محمد صلاح',
    invoiceNumber: '123456',
    date: '20/3/2025',
    status: 'paid',
    category: 'feed',
    cost: '200',
  },
  {
    id: '2',
    productName: 'اسم المنتج',
    clientName: 'محمد صلاح',
    invoiceNumber: '123456',
    date: '20/3/2025',
    status: 'paid',
    category: 'feed',
    cost: '200',
  },
  {
    id: '3',
    productName: 'اسم المنتج',
    clientName: 'محمد صلاح',
    invoiceNumber: '123456',
    date: '20/3/2025',
    status: 'pending',
    category: 'feed',
    cost: '200',
  },
  {
    id: '4',
    productName: 'اسم المنتج',
    clientName: 'محمد صلاح',
    invoiceNumber: '123456',
    date: '20/3/2025',
    status: 'paid',
    category: 'feed',
    cost: '200',
  },
];

export default function InvoicesPage() {
  const { t } = useTranslation();
  const { direction, locale } = useLocale();
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddInvoice = (data: unknown) => {
    console.log('New invoice:', data);
    setIsAddModalOpen(false);
  };

  return (
    <MainLayout>
      {/* ✅ FIX SCROLL HERE */}
      <div className="min-h-screen overflow-y-auto px-3 sm:px-4 lg:px-6 pb-10">
        <div className="space-y-7">

          <section className="space-y-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-3xl font-bold text-[#22203b] sm:text-[2.5rem]">
                {t('invoices.title')}
              </h1>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-[25.5rem]">
                  <SearchIcon
                    className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a473d] ${direction === 'rtl' ? 'right-4' : 'left-4'
                      }`}
                  />
                  <input
                    type="search"
                    placeholder={t('common.search')}
                    className={`h-11 w-full rounded-2xl border border-[#ece2da] bg-white text-sm text-[#2c2330] outline-none transition placeholder:text-[#d9cfc5] focus:border-[#5a3b25] focus:ring-2 focus:ring-[#5a3b25]/10 ${direction === 'rtl' ? 'pr-12 text-right' : 'pl-12 text-left'
                      }`}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-[18px] bg-[#4b2f1a] px-5 py-3 text-sm font-bold text-white sm:text-[1.05rem] sm:px-6"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    <span>{t('invoices.addNew')}</span>
                  </button>

                  <button
                    onClick={() => router.push(`/${locale}/dashboard`)}
                    className="rounded-full text-[#4b2f1a] transition hover:text-[#2d1a12]"
                    aria-label="Back"
                  >
                    <ArrowLeftCircleIcon className="h-10 w-10 sm:h-11 sm:w-11" />
                  </button>
                </div>
              </div>
            </div>

            {/* ✅ GRID FIX */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockInvoices.concat(mockInvoices).map((invoice, index) => (
                <article
                  key={`${invoice.id}-${index}`}
                  className="relative rounded-[30px] bg-white px-6 pb-8 pt-7 shadow-sm"
                >
                  <span className="absolute -top-4 left-1/2 h-8 w-12 -translate-x-1/2 rounded-b-full bg-secondary-gray" />
                  <span className="absolute -bottom-4 left-1/2 h-8 w-12 -translate-x-1/2 rounded-t-full bg-secondary-gray" />

                  <div className="mb-5 flex items-center justify-end gap-3">
                    <button className="text-[#4b2f1a] transition hover:text-[#24120b]">
                      <EditIcon className="h-[18px] w-[18px]" />
                    </button>
                    <span className="h-4 w-px bg-[#493630]" />
                    <button className="text-[#db2f28] transition hover:text-[#b31e18]">
                      <TrashIcon className="h-[18px] w-[18px]" />
                    </button>
                  </div>

                  <h2 className="mb-5 text-center text-2xl font-bold text-[#4a2f1e] sm:text-[2rem]">
                    {invoice.productName === 'اسم المنتج' ? t('invoices.productName') : invoice.productName}
                  </h2>

                  <div className="space-y-4 text-[1.05rem] text-[#3b2a24]">
                    {[
                      [t('invoices.clientName'), invoice.clientName],
                      [t('invoices.invoiceNumber'), invoice.invoiceNumber],
                      [t('invoices.invoiceDate'), invoice.date],
                      [t('invoices.status'), invoice.status === 'paid' ? t('invoices.paid') : t('invoices.pending')],
                      [t('invoices.category'), invoice.category === 'feed' ? t('invoices.category_feed') : t('invoices.category_vet')],
                      [t('invoices.cost'), `${invoice.cost}$`],
                    ].map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <span className="font-semibold">{label}</span>
                        <span className="text-[#8a786f]">|</span>
                        <span className={`text-right ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <InvoiceFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddInvoice}
      />
    </MainLayout>
  );
}