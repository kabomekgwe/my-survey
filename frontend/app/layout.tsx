import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { theme } from '@/lib/theme';
import { Providers } from '@/components/providers';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/nprogress/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'My Survey - Comprehensive Survey Management Platform',
    template: '%s | My Survey',
  },
  description: 'Create, distribute, and analyze surveys with our comprehensive survey management platform. Combining the best features from leading survey tools.',
  keywords: [
    'survey',
    'questionnaire',
    'forms',
    'analytics',
    'data collection',
    'feedback',
    'research',
    'polls',
  ],
  authors: [{ name: 'kabo mekgwe', url: 'https://github.com/kabomekgwe' }],
  creator: 'kabo mekgwe',
  publisher: 'My Survey',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'My Survey',
    title: 'My Survey - Comprehensive Survey Management Platform',
    description: 'Create, distribute, and analyze surveys with our comprehensive survey management platform.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Survey Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@mysurvey',
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@mysurvey',
    title: 'My Survey - Comprehensive Survey Management Platform',
    description: 'Create, distribute, and analyze surveys with our comprehensive survey management platform.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications position="top-right" />
            <Providers>
              {children}
            </Providers>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
