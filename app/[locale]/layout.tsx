
import { ReactNode } from 'react';
import { Locale, locales, isValidLocale, getDirection } from '@/lib/i18n';
import { LocaleProvider } from '@/lib/locale-context';
import { DocumentLocale } from '@/components/common/DocumentLocale';


const loadMessages = async (locale: Locale) => {
  const messages = await import(`@/public/locales/${locale}.json`);
  return messages.default;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: LocaleLayoutProps) {
  const params = await props.params;
  const locale = isValidLocale(params.locale) ? params.locale : 'ar';
  const messages = await loadMessages(locale);

  return {
    title: 'StudManager - ' + messages.dashboard.title,
  };
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const params = await props.params;
  const locale = isValidLocale(params.locale) ? params.locale : 'ar';
  const messages = await loadMessages(locale);
  const direction = getDirection(locale);

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <DocumentLocale locale={locale} direction={direction} />
      <div lang={locale} dir={direction} className="min-h-screen bg-secondary-gray">
        {props.children}
      </div>
    </LocaleProvider>
  );
}
