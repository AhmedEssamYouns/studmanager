'use client';

import type { Member } from './types';
import { useLocale, useTranslation } from '@/lib/locale-context';
import { TeamPagination } from './TeamPagination';

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
      <div className="space-y-4 md:hidden">
        {members.map((member) => (
          <article key={member.id} className="rounded-[24px] border border-[#eaded4] bg-white p-4 shadow-[0_12px_30px_rgba(91,53,24,0.06)]">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-[#2d283e]">{member.name}</h2>
              <p className="text-sm font-semibold text-[#8b755f]">{member.role}</p>
              <p className="text-sm text-[#6c625a]">{member.username}</p>
              <p className="text-sm text-[#6c625a]">{member.password}</p>
            </div>

            <div className={`mt-4 flex items-center gap-4 text-[#4b2f1a] ${direction === 'rtl' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
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
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[24px] bg-white shadow-[0_12px_26px_rgba(91,53,24,0.08)] md:block">
        <div className="overflow-x-auto">
          <table className={`min-w-[760px] w-full ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
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
      </div>

      <TeamPagination />
    </>
  );
}
