import { redirect } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';

interface LocaleIndexPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleIndexPage(props: LocaleIndexPageProps) {
  const params = await props.params;
  const locale = isValidLocale(params.locale) ? params.locale : 'ar';

  redirect(`/${locale}/dashboard`);
}
