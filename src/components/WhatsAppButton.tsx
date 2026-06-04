'use client';

import { useTranslations } from 'next-intl';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const t = useTranslations('Contact');
  const phoneNumber = '201096888859';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  return (
    <div className="whatsapp-floating-container">
      <a
        href={whatsappUrl}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
      >
        <div className="whatsapp-icon-wrapper">
          <FaWhatsapp />
        </div>
        <div className="whatsapp-pulse" />
        <div className="whatsapp-pulse-2" />
      </a>
      <div className="whatsapp-tooltip">
        <span>{t('whatsapp_tooltip')}</span>
      </div>
    </div>
  );
}
