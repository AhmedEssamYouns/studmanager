'use client';

import type { Member } from './types';
import { ChevronIcon } from '@/components/layout/AppIcons';
import { useLocale, useTranslation } from '@/lib/locale-context';

interface TeamMembersTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

export function TeamMembersTable({ members, onEdit, onDelete }: TeamMembersTableProps) {
  const { t } = useTranslation();
  const { direction } = useLocale();

  return (
    <>
      <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_26px_rgba(91,53,24,0.08)]">
        <table className={`w-full ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <thead className="bg-[#4b2f1a] text-white">
            <tr className="text-lg font-semibold">
              <th className="px-6 py-5">{t('team.user')}</th>
              <th className="px-6 py-5">{t('team.role')}</th>
              <th className="px-6 py-5">{t('team.username')}</th>
              <th className="px-6 py-5">{t('team.password')}</th>
              <th className={`px-6 py-5 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('team.actions')}</th>
            </tr>
          </thead>
          <tbody className="text-[1.05rem] text-[#2f3346]">
            {members.map((member) => (
              <tr key={member.id} className="border-b border-[#e9edf5] last:border-b-0">
                <td className="px-6 py-5">{member.name}</td>
                <td className="px-6 py-5">{member.role}</td>
                <td className="px-6 py-5">{member.username}</td>
                <td className="px-6 py-5">{member.password}</td>
                <td className="px-6 py-5">
                  <div className={`flex items-center gap-4 text-[#4b2f1a] ${direction === 'rtl' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                    <button className="transition hover:opacity-80" aria-label="Copy">
                      <img src="/svgs/copy.svg" alt="" className="h-5 w-5" />
                    </button>
                    <span className="h-6 w-px bg-[#8d7769]" />
                    <button onClick={() => onEdit(member)} className="transition hover:opacity-80" aria-label="Edit">
                      <img src="/svgs/edit.svg" alt="" className="h-5 w-5" />
                    </button>
                    <span className="h-6 w-px bg-[#8d7769]" />
                    <button onClick={() => onDelete(member.id)} className="transition hover:opacity-80" aria-label="Delete">
                      <img src="/svgs/delete.svg" alt="" className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-3 pt-3 text-[#4b2f1a]">
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b6aa9f]">
          <ChevronIcon className="h-5 w-5" />
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
              page === 1 ? 'border-[#4b2f1a] bg-[#4b2f1a] text-white' : 'border-[#4b2f1a] text-[#4b2f1a]'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4b2f1a] text-sm font-semibold">...</button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4b2f1a] text-sm font-semibold">32</button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b6aa9f]">
          <ChevronIcon className="h-5 w-5 rotate-180" />
        </button>
      </div>
    </>
  );
}
