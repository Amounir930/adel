'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { HiDownload, HiCode, HiServer, HiChip } from 'react-icons/hi';

const STATS = [
  { key: 'stat_projects', value: '8+' },
  { key: 'stat_years', value: '4+' },
  { key: 'stat_tech', value: '20+' },
  { key: 'stat_countries', value: '3' },
];

export default function Hero() {
  const t = useTranslations('Hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 pt-24 pb-10 md:pt-32 md:pb-24 lg:pb-32 overflow-hidden bg-grid"
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(700px circle at ${spotX}px ${spotY}px, rgba(6,182,212,0.07), transparent 70%)`,
        }}
      />

      {/* Animated Blobs */}
      <div className="blob blob-cyan w-[600px] h-[600px] -top-40 -left-40 z-0" />
      <div className="blob blob-violet w-[500px] h-[500px] top-1/2 -right-40 z-0" style={{ animationDelay: '3s' }} />
      <div className="blob blob-gold w-[300px] h-[300px] bottom-20 left-1/3 z-0" style={{ animationDelay: '5s', opacity: 0.15 }} />

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Right Side (Image) - in RTL first item is on the right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="w-full lg:w-5/12 flex justify-center order-1"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full p-2 group shadow-2xl shadow-cyan-500/20">
            <div className="absolute inset-0 rounded-full animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06B6D4_0%,#7C3AED_50%,#06B6D4_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-1.5 rounded-full bg-[var(--bg-base)] z-10" />
            <Image
              src="/projects/Adel-mounir.png"
              alt="Adel Mounir"
              fill
              className="rounded-full object-cover z-20 border-[6px] border-[var(--bg-base)] group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </motion.div>

        {/* Left Side (Content) - in RTL second item is on the left */}
        <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-start order-2">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 md:mb-6 inline-flex items-center gap-2"
          >
            <span className="relative inline-flex overflow-hidden rounded-full p-[1px] bg-[var(--border-color)]">
              <span className="relative inline-flex items-center gap-2 rounded-full bg-[var(--bg-surface)] px-4 py-1.5 text-sm font-semibold text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t('title')} — {t('title_badge')}
              </span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-4 md:mb-6">
              <span className="block text-[var(--text-primary)]">{t('name')}</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-xl text-[var(--text-secondary)] mb-6 md:mb-10 max-w-2xl leading-relaxed font-light"
          >
            {t('description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-8 md:mb-12 w-full sm:w-auto"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="btn-primary flex items-center gap-3 text-sm md:text-base px-8 py-3.5 md:py-4 rounded-2xl w-full sm:w-auto justify-center"
            >
              <HiCode className="w-5 h-5" />
              {t('cta')}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="btn-ghost flex items-center gap-3 text-sm md:text-base px-8 py-3.5 md:py-4 rounded-2xl w-full sm:w-auto justify-center"
            >
              <HiDownload className="w-5 h-5" />
              {t('resume')}
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl"
          >
            {STATS.map(({ key, value }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="card p-4 text-center border border-[var(--border-color)] bg-[var(--bg-surface)] rounded-2xl"
              >
                <div className="text-2xl md:text-3xl font-black gradient-text-cyan mb-1">{value}</div>
                <div className="text-[10px] md:text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest leading-tight">{t(key as any)}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

    </section>
  );
}
