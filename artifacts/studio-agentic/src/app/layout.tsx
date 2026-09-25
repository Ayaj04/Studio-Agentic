import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import '../index.css';

const title = 'Studio Agentic — Make your business more investable';
const description =
  'Studio Agentic helps ambitious founders turn messy operations into durable, investable systems.';

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
