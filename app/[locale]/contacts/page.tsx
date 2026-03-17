"use client";

import { useState, useMemo } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { useLocale, useTranslation } from "@/lib/locale-context";
import { Search, ChevronLeft, ChevronRight, Download, Trash2, Edit, PlusCircle } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  group: string;
  phone: string;
  email: string;
}

const initialContacts: Contact[] = [
  { id: '1', name: 'محمد صيرفي', group: 'vets', phone: '0123456789', email: 'test@test.com' },
  { id: '2', name: 'أحمد علي', group: 'suppliers', phone: '0123456789', email: 'test@test.com' },
];

export default function ContactsPage() {
  const { direction } = useLocale();
  const { t } = useTranslation();
  const isRTL = direction === "rtl";
  const [contacts] = useState<Contact[]>(initialContacts);
  const [activeGroup, setActiveGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const groups = [
    { id: 'all', name: t('contacts.all') || 'الكل' },
    { id: 'vets', name: t('contacts.vets') || 'أطباء' },
    { id: 'suppliers', name: t('contacts.suppliers') || 'موردين' },
    { id: 'clients', name: t('contacts.clients') || 'عملاء' },
    { id: 'others', name: t('contacts.others') || 'آخرون' },
  ];

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesGroup = activeGroup === 'all' || contact.group === activeGroup;
      const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery);
      return matchesGroup && matchesSearch;
    });
  }, [contacts, activeGroup, searchQuery]);

  return (
    <MainLayout>
      <div className={`p-3 sm:p-6 max-w-[1400px] mx-auto ${isRTL ? "text-right font-cairo" : "text-left"}`} dir={direction}>
        <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between mb-8">
          <h1 className="text-[2.1rem] font-bold text-[#27304a]">{t('contacts.title')}</h1>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="relative w-full sm:w-[24rem]">
              <Search
                className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a473d] ${isRTL ? 'right-4' : 'left-4'}`}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('common.search')}
                className={`h-11 w-full rounded-2xl border border-[#ece2da] bg-white text-sm text-[#2c2330] outline-none transition placeholder:text-[#d9cfc5] focus:border-[#5a3b25] focus:ring-2 focus:ring-[#5a3b25]/10 ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
              />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-[18px] bg-[#4b2f1a] px-6 py-3 text-[1.05rem] font-bold text-white transition hover:bg-[#3f2616]">
              <PlusCircle className="h-5 w-5" />
              <span>{t('contacts.addNew')}</span>
            </button>
            
            <button className="p-2 sm:p-2.5 bg-white border border-[#ece2da] rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-[#5a473d]" />
            </button>
          </div>
        </header>

        <section className="space-y-6">
          <div className={`flex flex-wrap items-center gap-3 ${isRTL ? 'flex-row' : 'flex-row'}`}>
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                className={`rounded-xl px-6 py-2 text-sm font-bold transition sm:text-base ${activeGroup === group.id
                  ? 'bg-[#4b2f1a] text-white shadow-lg'
                  : 'bg-white text-[#5a473d] hover:bg-[#f3ece7]'
                  }`}
              >
                {group.name}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_26px_rgba(91,53,24,0.08)]">
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${isRTL ? 'text-right' : 'text-left'}`}>
                <thead className="bg-[#4b2f1a] text-white">
                  <tr className="text-lg font-semibold">
                    <th className="px-6 py-5 whitespace-nowrap">{t('contacts.name')}</th>
                    <th className="px-6 py-5 whitespace-nowrap">{t('contacts.group')}</th>
                    <th className="px-6 py-5 whitespace-nowrap">{t('contacts.phone')}</th>
                    <th className="px-6 py-5 whitespace-nowrap">{t('contacts.account')}</th>
                    <th className="px-6 py-5 whitespace-nowrap text-center">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody className="text-[1.05rem] text-[#2f3346]">
                  {filteredContacts.map((contact, idx) => (
                    <tr key={contact.id} className={`border-b border-[#e9edf5] last:border-b-0 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-[#fdfbf7]"}`}>
                      <td className="px-6 py-5 whitespace-nowrap font-medium text-[#3b2b20]">{contact.name}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="rounded-lg bg-[#f3ece7] px-3 py-1 text-sm font-bold text-[#4b2f1a]">
                          {groups.find(g => g.id === contact.group)?.name || contact.group}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-gray-600">{contact.phone}</td>
                      <td className="px-6 py-5 whitespace-nowrap text-gray-600">{contact.email}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-4 text-[#4b2f1a]">
                           <button className="transition hover:opacity-80 p-1.5" aria-label="WhatsApp">
                            <img src="/svgs/whatsapp.svg" alt="" className="h-5 w-5" />
                          </button>
                          <span className="h-6 w-px bg-[#ece2da]" />
                          <button className="transition hover:opacity-80 p-1.5" aria-label="Edit">
                            <Edit className="h-5 w-5" />
                          </button>
                          <span className="h-6 w-px bg-[#ece2da]" />
                          <button className="transition hover:opacity-80 p-1.5 text-[#e53e3e]" aria-label="Delete">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredContacts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500 font-medium">
                        {t('common.noResults') || 'لا توجد نتائج'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center py-4 gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#ece2da] text-[#5a473d] hover:bg-white transition-all">
              {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            {[1, 2, 3].map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === p ? "bg-[#4b2f1a] text-white shadow-lg" : "text-[#5a473d] hover:bg-white border border-[#ece2da]"}`}>{p}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(3, p + 1))} className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#ece2da] text-[#5a473d] hover:bg-white transition-all">
              {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
