'use client';

import { useMemo, useState } from 'react';
import { PlusCircleIcon, SearchIcon } from '@/components/layout/AppIcons';
import { useLocale } from '@/lib/locale-context';
import { TeamMemberModal } from './TeamMemberModal';
import { TeamMembersTable } from './TeamMembersTable';
import { emptyMemberForm, initialMembers, type Member, type MemberFormState } from './types';
import { ListCheck } from 'lucide-react';

export function TeamPageContent() {
  const { direction } = useLocale();
  const [members, setMembers] = useState(initialMembers);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'add' | 'edit' | null>(null);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [form, setForm] = useState<MemberFormState>(emptyMemberForm);

  const filteredMembers = useMemo(() => {
    if (!query.trim()) return members;
    return members.filter((member) =>
      [member.name, member.role, member.username].some((value) =>
        value.toLowerCase().includes(query.trim().toLowerCase())
      )
    );
  }, [members, query]);

  const openAddModal = () => {
    setForm(emptyMemberForm);
    setEditingMemberId(null);
    setMode('add');
  };

  const openEditModal = (member: Member) => {
    setForm({
      name: member.name,
      role: member.role,
      username: member.username,
      password: member.password,
    });
    setEditingMemberId(member.id);
    setMode('edit');
  };

  const closeModal = () => {
    setMode(null);
    setEditingMemberId(null);
  };

  const saveMember = () => {
    if (!form.name || !form.username || !form.password) return;

    if (mode === 'edit' && editingMemberId) {
      setMembers((current) =>
        current.map((member) => (member.id === editingMemberId ? { ...member, ...form } : member))
      );
      closeModal();
      return;
    }

    setMembers((current) => [{ id: Date.now().toString(), ...form }, ...current]);
    closeModal();
  };

  return (
    <div className="space-y-7">
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[2.1rem] font-bold text-[#27304a]">إدارة الأعضاء</h1>

          <div className="flex items-center gap-5">
            <div className="relative w-[24rem] max-w-full">
              <SearchIcon
                className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a473d] ${direction === 'rtl' ? 'right-4' : 'left-4'
                  }`}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="البحث"
                className={`h-11 w-full rounded-2xl border border-[#ece2da] bg-white text-sm text-[#2c2330] outline-none transition placeholder:text-[#d9cfc5] focus:border-[#5a3b25] focus:ring-2 focus:ring-[#5a3b25]/10 ${direction === 'rtl' ? 'pr-12 text-right' : 'pl-12 text-left'
                  }`}
              />
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-[18px] bg-[#4b2f1a] px-6 py-3 text-[1.05rem] font-bold text-white"
            >
              <PlusCircleIcon className="h-5 w-5" />
              <span>إضافة مستخدم</span>
            </button>

            <button className="flex items-center gap-2 rounded-[18px] bg-[#4b2f1a] px-6 py-3 text-[1.05rem] font-bold text-white">
              <ListCheck className="h-5 w-5" />
              <span>المهام</span>
            </button>
          </div>
        </div>

        <TeamMembersTable
          members={filteredMembers}
          onEdit={openEditModal}
          onDelete={(id) => setMembers((current) => current.filter((member) => member.id !== id))}
        />
      </section>

      {mode && (
        <TeamMemberModal
          title={mode === 'add' ? 'إضافة عضو جديد' : 'تعديل عضو'}
          submitLabel="حفظ"
          iconSrc={mode === 'add' ? '/svgs/manage-members-foucs.svg' : '/svgs/manage-members.svg'}
          form={form}
          onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          onClose={closeModal}
          onSubmit={saveMember}
        />
      )}
    </div>
  );
}
