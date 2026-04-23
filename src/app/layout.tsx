import type { Metadata } from 'next';
import { Inter, Inconsolata } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
});

const inconsolata = Inconsolata({
  variable: '--font-inconsolata',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
});

// Since Basier might not be available via next/font/google, we use Inter as fallback
const basierFallback = Inter({
  variable: '--font-basier',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GenWin | High-Performance Info Integrity Engine',
  description: 'Evaluate the credibility of information, claims, and data at extreme speed. GenWin uses AI-driven signals to provide structural clarity and trust scores for professionals.',
  keywords: ['trust engine', 'fact checking', 'information integrity', 'AI analysis', 'data credibility'],
  authors: [{ name: 'GenWin Network' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'GenWin | A New Standard for Trust',
    description: 'Autonomous evaluation of information, products, and claims.',
    url: 'https://genwin.ai',
    siteName: 'GenWin',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${inconsolata.variable} ${basierFallback.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
