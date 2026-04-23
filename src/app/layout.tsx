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
  title: 'GenWin - Information Trust Evaluation',
  description: 'AI-powered platform that evaluates the trustworthiness of information.',
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
