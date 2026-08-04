import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
// 1. Import the new switch component
import TemplateSwitcher from "./components/TemplateSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MainBar Schweinfurt",
  description: "Cafe • Bar • Lebensart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          {/* 2. Add the switch so it renders globally */}
          <TemplateSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}