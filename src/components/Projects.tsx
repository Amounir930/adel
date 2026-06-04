'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiCode, HiExternalLink } from 'react-icons/hi';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

type ProjectSize = 'hero' | 'large' | 'medium' | 'small';

interface ProjectDef {
  key: string;
  size: ProjectSize;
  color: string;
  accentColor: string;
  github?: string;
  live?: string;
  hasImage?: boolean;
  imagePath?: string;
  hasMetric?: boolean;
  metric?: { value: string; label: string };
}

const PROJECTS: ProjectDef[] = [
  {
    key: 'crazy_lister',
    size: 'hero',
    color: '#F59E0B',
    accentColor: '#D97706',
    live: 'https://crazylister.com',
    hasImage: true,
    imagePath: '/projects/crazy-1.png',
    hasMetric: true,
  },
  {
    key: 'apex',
    size: 'medium',
    color: '#06B6D4',
    accentColor: '#0891B2',
  },
  {
    key: 'commander_os',
    size: 'medium',
    color: '#10B981',
    accentColor: '#059669',
  },
  {
    key: 'cerebras_studio',
    size: 'hero',
    color: '#8B5CF6',
    accentColor: '#7C3AED',
    hasImage: true,
    imagePath: '/projects/cerebras.png',
  },
  {
    key: 'darb_almaha',
    size: 'hero',
    color: '#3B82F6',
    accentColor: '#2563EB',
    live: 'https://darbalmaha.com',
    hasImage: true,
    imagePath: '/projects/darbalmaha.png',
  },
  {
    key: 'ai_proxy',
    size: 'small',
    color: '#EF4444',
    accentColor: '#DC2626',
  },
  {
    key: 'video_downloader',
    size: 'hero',
    color: '#06B6D4',
    accentColor: '#0891B2',
    hasImage: true,
    imagePath: '/projects/sharepoint.png',
  },
  {
    key: 'alyusr',
    size: 'small',
    color: '#F59E0B',
    accentColor: '#D97706',
  },
  {
    key: 'kitvet',
    size: 'hero',
    color: '#3B82F6',
    accentColor: '#2563EB',
    live: 'https://kitvet.com',
    hasImage: true,
    imagePath: '/projects/kitvet.png',
  },
  {
    key: 'mounir_data_gen',
    size: 'small',
    color: '#EC4899',
    accentColor: '#BE185D',
    github: 'https://github.com/adelfree2023-dev/Mounir',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function FeatureList({ features, color }: { features: string[]; color: string }) {
  return (
    <ul className="space-y-1.5 flex flex-col items-center md:items-start">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] text-center md:text-start">
          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 hidden md:block" style={{ background: color }} />
          {f}
        </li>
      ))}
    </ul>
  );
}

function TagList({ tags, color }: { tags: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  const t = useTranslations('Projects');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // In RTL, left and right are flipped natively by scrollBy depending on direction
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        // If we reached the end, scroll back to start (basic infinite loop illusion)
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 10;
        if (isEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="projects" className="py-16 md:py-20 px-6 relative overflow-hidden">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-start"
        >
          <span className="tech-badge tech-badge-violet mb-4 inline-block">{t('tag')}</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
              <span className="text-[var(--text-primary)]">{t('title_1')} </span>
              <span className="text-cyan-400">{t('title_2')}</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-sm mx-auto md:mx-0 font-light text-lg md:text-right">
              {t('description')}
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-6"
        >
          {/* HERO PROJECT — Full Width */}
          {PROJECTS.filter(p => p.size === 'hero').map((project) => {
            const features = t.raw(`items.${project.key}.features`) as string[];
            const tags = t.raw(`items.${project.key}.tags`) as string[];
            return (
              <motion.div
                key={project.key}
                variants={item}
                className="card p-8 md:p-12 mb-12 flex flex-col xl:flex-row gap-10 group relative overflow-hidden"
                whileHover={{ borderColor: `${project.color}50` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
                  {/* Content */}
                  <div className="p-8 md:p-14 flex flex-col justify-between order-2 lg:order-1 text-center md:text-start items-center md:items-start">
                    <div className="w-full flex flex-col items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center gap-3 mb-6">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
                          style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
                        >
                          {t('live_badge')} ⚡
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-mono">v3.5</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 text-[var(--text-primary)]">
                        {t(`items.${project.key}.name`)}
                      </h3>
                      <p className="text-[var(--text-secondary)] font-light text-[15px] md:text-base leading-[1.6] md:leading-[1.8] mb-6 line-clamp-3 md:line-clamp-none">
                        {t(`items.${project.key}.description`)}
                      </p>

                      {/* Metric / ROI highlight */}
                      {project.metric && (
                        <div className="flex items-center gap-4 bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl mt-4 justify-center md:justify-start">
                          <div className="p-2 rounded-lg bg-cyan-500/20">
                            <span className="text-cyan-400 font-black">ROI</span>
                          </div>
                          <div className="text-center md:text-start">
                            <span className="text-cyan-400 font-bold text-lg">{t(`items.${project.key}.metric.value`)}</span>
                            <p className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">{t(`items.${project.key}.metric.label`)}</p>
                          </div>
                        </div>
                      )}

                      <div className="hidden md:block mt-6">
                        <FeatureList features={features.slice(0, 4)} color={project.color} />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mt-8 w-full">
                      <TagList tags={tags.slice(0, 3)} color={project.color} />
                      {project.live && (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--text-primary)] transition-all w-full sm:w-auto px-6 py-3 rounded-xl shadow-lg mt-4 sm:mt-0"
                          style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
                        >
                          <HiExternalLink className="w-5 h-5" style={{ color: project.color }} />
                          <span style={{ color: project.color }}>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Image / Mockup */}
                  <div
                    className="relative overflow-hidden min-h-[220px] md:min-h-[280px] lg:min-h-0 order-1 lg:order-2"
                    style={{ background: `linear-gradient(135deg, ${project.color}08, ${project.accentColor}15)` }}
                  >
                    {project.hasImage && project.imagePath ? (
                      <Image
                        src={project.imagePath}
                        alt={t(`items.${project.key}.name`)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-left-top opacity-90 group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-8xl mb-4">🖥️</div>
                          <p className="text-[var(--text-muted)] text-sm">Screenshot coming soon</p>
                        </div>
                      </div>
                    )}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to right, var(--bg-surface) 0%, transparent 30%)`
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* INTERACTIVE CAROUSEL SLIDER FOR REMAINING PROJECTS */}
          <div className="pt-10 w-full">
            <h3 className="text-2xl font-black text-[var(--text-primary)] mb-6 text-center md:text-start">{t('more_projects')}</h3>

            <div className="relative w-full group/slider">
              {/* Overlay Buttons (Always visible on mobile, hover on desktop) */}
              <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-color)] hover:border-cyan-500/50 transition-all text-[var(--text-primary)] opacity-100 md:opacity-0 group-hover/slider:opacity-100 shadow-xl"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-color)] hover:border-cyan-500/50 transition-all text-[var(--text-primary)] opacity-100 md:opacity-0 group-hover/slider:opacity-100 shadow-xl"
              >
                <HiChevronLeft className="w-6 h-6" />
              </button>

              <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
              
              <div
                ref={scrollRef}
                className="flex items-stretch gap-6 w-full overflow-x-auto snap-x snap-mandatory pb-8 pt-4 hide-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {PROJECTS.filter(p => p.size !== 'hero').map((project, idx) => {
                  const features = t.raw(`items.${project.key}.features`) as string[];
                  const tags = t.raw(`items.${project.key}.tags`) as string[];
                  return (
                    <motion.div
                      key={project.key}
                      className="card group p-8 flex flex-col w-[380px] shrink-0 snap-center text-center md:text-start items-center md:items-start"
                      whileHover={{ scale: 1.02, zIndex: 20, borderColor: `${project.color}50` }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                        style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                      >
                        <HiCode className="w-6 h-6" style={{ color: project.color }} />
                      </div>
                      <h3 className="text-2xl font-black mb-2 text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                        {t(`items.${project.key}.name`)}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] font-semibold mb-4 tracking-wide">
                        {t(`items.${project.key}.tagline`)}
                      </p>
                      <p className="text-[var(--text-secondary)] text-[15px] leading-[1.6] md:leading-[1.8] font-light line-clamp-3">
                        {t(`items.${project.key}.description`)}
                      </p>
                      <div className="mb-6 w-full flex justify-center md:justify-start">
                        <FeatureList features={features.slice(0, 3)} color={project.color} />
                      </div>
                      <div className="mt-auto w-full flex flex-col items-center md:items-start">
                        <TagList tags={tags.slice(0, 3)} color={project.color} />
                        <div className="flex items-center gap-4 mt-6">
                          {project.live && (
                            <a 
                              href={project.live} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--text-primary)] transition-all w-full py-3.5 rounded-xl shadow-lg"
                              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                            >
                              <HiExternalLink className="w-5 h-5" style={{ color: project.color }} />
                              <span style={{ color: project.color }}>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
