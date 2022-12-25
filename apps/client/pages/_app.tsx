import { Author, SettingsFragmentFragment } from 'letterpad-sdk';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import 'lazysizes';

import 'ui/tailwind/base.css';
import 'ui/tailwind/editor.css';
import '@fontsource/inter/variable-full.css';

import { ClientReload } from '@/components/ClientReload';
import LayoutWrapper from '@/components/LayoutWrapper';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

interface PageProps {
  settings: SettingsFragmentFragment;
  me: Author;
}
export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      {pageProps.settings ? (
        <LayoutWrapper props={pageProps}>
          <Component {...pageProps} />
        </LayoutWrapper>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}
