export interface Member {
  id: string;
  name: string;
  role: string;
  username: string;
  password: string;
}

export const roleOptions = ['مدير المزرعة', 'مساعد مدير المزرعة', 'طبيب بيطري', 'مدرب', 'عامل'];

export const emptyMemberForm = {
  name: '',
  role: roleOptions[0],
  username: '',
  password: '',
};

export type MemberFormState = typeof emptyMemberForm;

export const initialMembers: Member[] = [
  { id: '1', name: 'محمد', role: 'مدير المزرعة', username: 'mohammed 123', password: '123456' },
  { id: '2', name: 'محمد', role: 'مساعد مدير المزرعة', username: 'mohammed 123', password: '123456' },
  { id: '3', name: 'محمد', role: 'طبيب بيطري', username: 'mohammed 123', password: '123456' },
  { id: '4', name: 'محمد', role: 'مدرب', username: 'mohammed 123', password: '123456' },
  { id: '5', name: 'محمد', role: 'عامل', username: 'mohammed 123', password: '123456' },
  { id: '6', name: 'محمد', role: 'عامل', username: 'mohammed 123', password: '123456' },
  { id: '7', name: 'محمد', role: 'عامل', username: 'mohammed 123', password: '123456' },
  { id: '8', name: 'محمد', role: 'عامل', username: 'mohammed 123', password: '123456' },
  { id: '9', name: 'محمد', role: 'عامل', username: 'mohammed 123', password: '123456' },
  { id: '10', name: 'محمد', role: 'عامل', username: 'mohammed 123', password: '123456' },
];
