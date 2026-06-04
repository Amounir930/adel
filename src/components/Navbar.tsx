'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiTranslate } from 'react-icons/hi';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const dismissed = localStorage.getItem('announcement-dismissed');
      if (!dismissed) {
        setShowAnnouncement(true);
      }
    } catch (e) {
      setShowAnnouncement(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const dismissAnnouncement = () => {
    try {
      localStorage.setItem('announcement-dismissed', 'true');
    } catch (e) {
      // ignore errors in sandboxed/incognito contexts
    }
    setShowAnnouncement(false);
  };

  const navLinks = [
    { name: t('home'), href: '#home' },
    { name: t('about'), href: '#about' },
    { name: t('projects'), href: '#projects' },
    { name: t('skills'), href: '#skills' },
    { name: t('contact'), href: '#contact' },
  ];

  const isAnnouncementVisible = mounted && showAnnouncement && !isOpen;

  return (
    <>
      {/* Announcement Bar */}
      <AnimatePresence>
        {isAnnouncementVisible && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-[110] bg-gradient-to-r from-[#0b001a] via-[#14002e] to-[#0b001a] backdrop-blur-md border-b border-[#8400FF]/35 text-white text-xs font-semibold py-2 px-4 flex items-center justify-between gap-4 h-[40px] overflow-hidden"
          >
            <div className="flex-1 flex items-center justify-center gap-3 text-center overflow-hidden">
              <span className="inline-flex w-1.5 h-1.5 rounded-full bg-[#00FFFF] animate-pulse shrink-0" style={{ boxShadow: '0 0 8px #00FFFF' }} />
              <span className="text-[var(--text-primary)] truncate text-[11px] sm:text-xs">
                {t('announcement')}
              </span>
              <a
                href="https://wa.me/201096888859"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#00FFFF] hover:bg-[#00E5E5] text-black text-[10px] font-black uppercase tracking-wider transition-all shadow-md shadow-[#00FFFF]/20"
              >
                {t('announcement_action')}
              </a>
            </div>
            <button
              onClick={dismissAnnouncement}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white shrink-0"
              aria-label="Dismiss announcement"
            >
              <HiX className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={clsx(
          'fixed left-0 right-0 z-[100] transition-all duration-500 px-6',
          isAnnouncementVisible ? 'top-[40px]' : 'top-0',
          scrolled
            ? 'bg-[var(--bg-base)]/85 backdrop-blur-xl border-b border-[var(--border-color)] py-4'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" dir="ltr">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black"
              style={{ background: 'linear-gradient(135deg, #06B6D4, #7C3AED)' }}
            >
              AM
            </div>
            <span className="text-lg font-black tracking-tighter text-[var(--text-primary)]">
              ADEL<span className="gradient-text-cyan">.</span>DEV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-6 px-6 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-cyan-500/50 transition-all text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <HiTranslate className="w-3.5 h-3.5" />
                {t('switch_lang')}
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)]"
            >
              {isOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[90] bg-[var(--bg-base)]/97 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-black text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => { toggleLanguage(); setIsOpen(false); }}
                className="mt-4 flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-lg font-bold uppercase tracking-widest text-[var(--text-secondary)]"
              >
                <HiTranslate className="w-5 h-5" />
                {t('switch_lang')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
