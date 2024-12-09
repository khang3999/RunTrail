import '@/styles/globals.css';
import Layout from "@/components/Layout";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
    locale={router.locale}
    timeZone="Europe/Vienna"
    messages={pageProps.messages}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
  );
}
