"use client";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import MainBarLogo from '../components/MainBarLogo';

export default function Contact() {
  const { lang } = useLanguage();

  const t = {
    back: lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home',
    title: lang === 'de' ? 'Besuchen Sie Uns' : 'Visit Us',
    addressTitle: lang === 'de' ? 'Adresse' : 'Address',
    addressLine1: 'MainBar',
    addressLine2: 'Am Unteren Marienbach 1',
    addressLine3: '97421 Schweinfurt',
    hoursTitle: lang === 'de' ? 'Öffnungszeiten' : 'Opening Hours',
    hours: [
      { day: lang === 'de' ? 'Montag - Donnerstag' : 'Monday - Thursday', time: '09:00 - 18:00' },
      { day: lang === 'de' ? 'Freitag - Samstag' : 'Friday - Saturday', time: '09:00 - 22:00' },
      { day: lang === 'de' ? 'Sonntag' : 'Sunday', time: lang === 'de' ? 'Geschlossen' : 'Closed' }
    ],
    contactTitle: lang === 'de' ? 'Kontakt' : 'Contact',
    phone: '+49 170 2278096'
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#F9FAFB] font-sans text-[#4B5563]">
      
      {/* Left Side - Dark Slate with Logo */}
      <div className="w-full md:w-5/12 bg-[#374151] text-[#F9FAFB] flex flex-col items-center justify-center p-12 text-center relative min-h-[40svh] md:min-h-screen">
        <MainBarLogo textColor="text-[#C89FA3]" ringColor="border-[#C89FA3]" />
        <h1 className="text-3xl md:text-4xl font-serif mt-12 mb-6 text-[#F9FAFB]">{t.title}</h1>
        <Link href="/" className="text-[#C89FA3] hover:text-white transition-colors uppercase tracking-widest text-xs flex items-center gap-2">
          <span>&larr;</span> {t.back}
        </Link>
      </div>

      {/* Right Side - Information Details */}
      <div className="w-full md:w-7/12 flex flex-col justify-center p-8 md:p-24 bg-[#F9FAFB]">
        <div className="max-w-md w-full mx-auto md:mx-0 space-y-16">
          
          {/* Address */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-[#9CA3AF] mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C89FA3]"></span>
              {t.addressTitle}
            </h2>
            <p className="text-xl font-serif text-[#374151] leading-relaxed">
              {t.addressLine1}<br />
              {t.addressLine2}<br />
              {t.addressLine3}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-[#9CA3AF] mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C89FA3]"></span>
              {t.hoursTitle}
            </h2>
            <ul className="space-y-4">
              {t.hours.map((h, i) => (
                <li key={i} className="flex justify-between items-center border-b border-[#E5E7EB] pb-2">
                  <span className="font-serif text-[#374151]">{h.day}</span>
                  <span className="text-[#9CA3AF] text-sm tracking-wider">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-[#9CA3AF] mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C89FA3]"></span>
              {t.contactTitle}
            </h2>
            <a href={`tel:${t.phone.replace(/\s+/g, '')}`} className="text-2xl font-serif text-[#C89FA3] hover:text-[#374151] transition-colors block">
              {t.phone}
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}