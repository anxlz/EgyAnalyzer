import type { Metadata } from 'next';
import { Cinzel, Plus_Jakarta_Sans, Cairo } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://egyptian-id-analyzer.vercel.app'),
  title: {
    default: 'Egyptian National ID Analyzer | محلل الرقم القومي المصري',
    template: '%s | Egyptian ID Analyzer',
  },
  description:
    'Instantly decode publicly derivable information from an Egyptian National ID number. All processing happens locally in your browser — no data stored.',
  keywords: [
    'Egyptian National ID',
    'ID Analyzer',
    'Raqam Qawmi',
    'الرقم القومي المصري',
    'محلل الرقم القومي',
    'Egypt',
    'National ID decode',
  ],
  authors: [{ name: 'Egyptian ID Analyzer' }],
  creator: 'Egyptian ID Analyzer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_EG'],
    title: 'Egyptian National ID Analyzer',
    description:
      'Decode your 14-digit Egyptian National ID — birth date, gender, age, and governorate. 100% private, no data stored.',
    siteName: 'Egyptian ID Analyzer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Egyptian National ID Analyzer',
    description: 'Decode your Egyptian National ID privately in your browser.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${jakarta.variable} ${cairo.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
