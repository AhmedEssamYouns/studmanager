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
      <div className="space-y-7">

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[2.5rem] font-bold text-[#22203b]">{t('invoices.title')}</h1>

            <div className="flex items-center gap-4">
              <div className="relative w-[25.5rem] max-w-full">
                <SearchIcon
                  className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a473d] ${
                    direction === 'rtl' ? 'right-4' : 'left-4'
                  }`}
                />
                <input
                  type="search"
                  placeholder={t('common.search')}
                  className={`h-11 w-full rounded-2xl border border-[#ece2da] bg-white text-sm text-[#2c2330] outline-none transition placeholder:text-[#d9cfc5] focus:border-[#5a3b25] focus:ring-2 focus:ring-[#5a3b25]/10 ${
                    direction === 'rtl' ? 'pr-12 text-right' : 'pl-12 text-left'
                  }`}
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 rounded-[18px] bg-[#4b2f1a] px-6 py-3 text-[1.05rem] font-bold text-white"
              >
                <PlusCircleIcon className="h-5 w-5" />
                <span>{t('invoices.addNew')}</span>
              </button>

              <button
                onClick={() => router.push(`/${locale}/dashboard`)}
                className="rounded-full text-[#4b2f1a] transition hover:text-[#2d1a12]"
                aria-label="Back"
              >
                <ArrowLeftCircleIcon className="h-11 w-11" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5">
            {mockInvoices.concat(mockInvoices).map((invoice, index) => (
              <article
                key={`${invoice.id}-${index}`}
                className="relative rounded-[30px] bg-white px-6 pb-8 pt-7"
              >
                <span className="absolute -top-4 left-1/2 h-8 w-12 -translate-x-1/2 rounded-b-full bg-secondary-gray" />
                <span className="absolute -bottom-4 left-1/2 h-8 w-12 -translate-x-1/2 rounded-t-full bg-secondary-gray" />

                <div className="mb-5 flex items-center justify-end gap-3">
                  <button className="text-[#4b2f1a] transition hover:text-[#24120b]" aria-label="Edit">
                    <EditIcon className="h-[18px] w-[18px]" />
                  </button>
                  <span className="h-4 w-px bg-[#493630]" />
                  <button className="text-[#db2f28] transition hover:text-[#b31e18]" aria-label="Delete">
                    <TrashIcon className="h-[18px] w-[18px]" />
                  </button>
                </div>

                <h2 className="mb-5 text-center text-[2rem] font-bold text-[#4a2f1e]">{invoice.productName}</h2>

                <div className="space-y-4 text-[1.05rem] text-[#3b2a24]">
                  {[
                    ['اسم العميل', invoice.clientName],
                    ['رقم الفاتورة', invoice.invoiceNumber],
                    ['التاريخ', invoice.date],
                    ['الحالة', invoice.status === 'paid' ? 'مدفوع' : 'قيد التنفيذ'],
                    ['الفئة', invoice.category === 'feed' ? 'طعام' : 'خدمات'],
                    ['التكلفة', `${invoice.cost}$`],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <span className="font-semibold text-[#3b2a24]">{label}</span>
                      <span className="text-[#8a786f]">|</span>
                      <span className="text-right text-[#4b392d]">{value}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <InvoiceFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddInvoice}
      />
    </MainLayout>
  );
}
