'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { HiCode, HiServer, HiChip, HiCheckCircle, HiLocationMarker } from 'react-icons/hi';
import {
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiNodedotjs,
  SiFastapi, SiPostgresql, SiDocker, SiTailwindcss, SiDotnet,
  SiElectron, SiPrisma, SiRedis
} from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa';

const SKILL_CATEGORIES = [
  {
    icon: HiCode,
    key: 'frontend',
    color: '#06B6D4',
    skills: [
      { icon: SiReact, name: 'React / Next.js' },
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: SiTailwindcss, name: 'Tailwind CSS' },
      { icon: SiElectron, name: 'Electron (Desktop)' },
    ],
  },
  {
    icon: HiServer,
    key: 'backend',
    color: '#7C3AED',
    skills: [
      { icon: SiPython, name: 'Python / FastAPI' },
      { icon: SiNodedotjs, name: 'Node.js / NestJS' },
      { icon: SiDotnet, name: '.NET 8 / C#' },
      { icon: SiFastapi, name: 'REST APIs & AI Integration' },
    ],
  },
  {
    icon: HiChip,
    key: 'tools',
    color: '#F59E0B',
    skills: [
      { icon: FaAmazon, name: 'Amazon SP-API' },
      { icon: SiPostgresql, name: 'PostgreSQL / SQLite' },
      { icon: SiRedis, name: 'Redis / MongoDB' },
      { icon: SiDocker, name: 'Docker / CI/CD' },
      { icon: SiPrisma, name: 'Prisma ORM' },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="pt-20 pb-12 md:pt-32 md:pb-20 px-6 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left — Text */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center lg:text-start flex flex-col items-center lg:items-start"
          >
            <motion.div variants={item} className="mb-6">
              <span className="tech-badge tech-badge-cyan text-xs">
                {t('tag')}
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6"
            >
              <span className="text-[var(--text-primary)]">{t('title_1')}</span>
              <br />
              <span className="text-cyan-400">{t('title_2')}</span>
            </motion.h2>

            <motion.p variants={item} className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6 font-light">
              {t('description_1')}
            </motion.p>
            <motion.p variants={item} className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10 font-light hidden md:block">
              {t('description_2')}
            </motion.p>

            {/* Availability Badge */}
            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mt-10">
              <div className="flex items-center gap-3 card px-4 py-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">{t('available')}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <HiLocationMarker className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t('location')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Skill Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-4"
          >
            {SKILL_CATEGORIES.map(({ icon: Icon, key, color, skills }) => (
              <motion.div
                key={key}
                variants={item}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="card p-6 group cursor-default"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-base">
                    {t(key as any)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(({ icon: SkillIcon, name }) => (
                    <span
                      key={name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{ background: `${color}10`, color }}
                    >
                      <SkillIcon className="w-3.5 h-3.5 flex-shrink-0" />
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
