'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const SKILL_LEVELS = [
  {
    key: 'core',
    color: '#06B6D4',
    skills: ['React / Next.js', 'TypeScript', 'Python / FastAPI', 'Tailwind CSS', 'Node.js / NestJS', 'Amazon SP-API'],
    icon: '⚡'
  },
  {
    key: 'proficient',
    color: '#7C3AED',
    skills: ['PostgreSQL / SQLite', 'Docker / Compose', '.NET 8 / C#', 'Prisma ORM', 'Electron (Desktop)', 'Playwright / Web Scraping', 'LLMs & AI Integrations', 'CI/CD (GitHub Actions)'],
    icon: '🚀'
  },
  {
    key: 'familiar',
    color: '#10B981',
    skills: ['SQL Server', 'Redis', 'MongoDB', 'PWA / Service Workers', 'Linux / Bash', 'Cryptography (AES/Fernet)', 'Pandas (BI)'],
    icon: '💡'
  }
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const t = useTranslations('Skills');
  const [openLevel, setOpenLevel] = useState<string>('core');

  return (
    <section id="skills" className="py-16 md:py-20 px-6 relative overflow-hidden">

      {/* Background blobs */}
      <div className="blob blob-violet w-[400px] h-[400px] top-0 right-0 z-0 opacity-20" />
      <div className="blob blob-cyan w-[300px] h-[300px] bottom-0 left-0 z-0 opacity-15" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="tech-badge tech-badge-gold mb-4 inline-block">{t('tag')}</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            <span className="text-[var(--text-primary)]">{t('title_1')} </span>
            <span className="text-cyan-400">{t('title_2')}</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto font-light">
            {t('description')}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {SKILL_LEVELS.map((level) => (
            <motion.div
              key={level.key}
              variants={item}
              className={`card px-6 py-5 md:p-8 group flex flex-col border border-[var(--border-color)] bg-[var(--bg-surface)] rounded-3xl cursor-pointer md:cursor-default overflow-hidden transition-all duration-300 ${openLevel === level.key ? 'h-auto' : 'h-[80px] md:h-full'}`}
              whileHover={{ borderColor: `${level.color}50`, y: -2 }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setOpenLevel(openLevel === level.key ? '' : level.key);
                }
              }}
            >
              {/* Category Header */}
              <div className={`flex items-center justify-between transition-all ${openLevel === level.key ? 'mb-6 pb-6 border-b border-[var(--border-color)]' : 'md:mb-8 md:pb-6 md:border-b border-[var(--border-color)]'}`}>
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-lg md:text-xl shadow-lg shrink-0"
                    style={{ background: `${level.color}15`, border: `1px solid ${level.color}30` }}
                  >
                    {level.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl text-[var(--text-primary)] tracking-tight">
                      {t(`levels.${level.key}`)}
                    </h3>
                  </div>
                </div>
                
                {/* Mobile Accordion Hint */}
                <div className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-color)] shrink-0">
                  <HiChevronDown className={`w-5 h-5 transition-transform duration-300 ${openLevel === level.key ? 'rotate-180 text-cyan-400' : 'text-[var(--text-muted)]'}`} />
                </div>
              </div>

              {/* Skills List */}
              <div className={`flex flex-wrap gap-2.5 transition-opacity duration-300 md:flex ${openLevel === level.key ? 'opacity-100 flex' : 'opacity-0 hidden md:opacity-100'}`}>
                {level.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-2 rounded-xl text-sm font-bold tracking-wide transition-colors"
                    style={{ background: `${level.color}10`, color: level.color, border: `1px solid ${level.color}20` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
