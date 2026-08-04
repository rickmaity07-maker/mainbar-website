import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';

export const metadata: Metadata = {
  title: 'MainBar | drinks & food',
  description: 'Willkommen in der Mainbar - Bei uns ist Qualität das Produkt der Liebe zum Detail.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <LanguageProvider>
          <LanguageToggle />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}