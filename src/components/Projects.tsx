'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { HiCode, HiExternalLink, HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { PROJECTS, ProjectDef } from '@/data/projects';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function renderTerminalContent(key: string) {
  if (key === 'ai_proxy') {
    return (
      <div className="font-mono text-[10px] text-cyan-400 space-y-1 select-none">
        <div>$ python -m uvicorn main:app</div>
        <div className="text-slate-500">INFO: Load balancer active on port 8000</div>
        <div className="text-emerald-400">INFO: Keys cached: 12 active / 0 expired</div>
        <div className="text-violet-400">INFO: Cryptography engine: AES-256 active</div>
      </div>
    );
  }
  if (key === 'municipal_lease_db') {
    return (
      <div className="font-mono text-[10px] text-emerald-400 space-y-1 select-none">
        <div>CREATE TABLE municipal_leases (</div>
        <div className="text-slate-500">  lease_id SERIAL PRIMARY KEY,</div>
        <div className="text-slate-500">  tenant_id INT NOT NULL REFERENCES tenants,</div>
        <div className="text-violet-400">  rent_amount NUMERIC(10, 2) CHECK (rent_amount &gt; 0)</div>
        <div>); -- Database optimized in 3NF</div>
      </div>
    );
  }
  return (
    <div className="font-mono text-[10px] text-slate-400 space-y-1 select-none">
      <div>$ git status</div>
      <div className="text-emerald-400">On branch main</div>
      <div>Your branch is up to date with &apos;origin/main&apos;.</div>
      <div className="text-violet-400">nothing to commit, working tree clean</div>
    </div>
  );
}

export default function Projects() {
  const t = useTranslations('Projects');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'enterprise', 'ai', 'saas', 'websites'];

  const filteredProjects = PROJECTS.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const isFiltered = selectedCategory !== 'all';

  // Dynamically calculate grid spans to eliminate holes and maintain clean layout ratios
  const layoutItems = (() => {
    const items = filteredProjects.map((p) => {
      const isWide =
        p.hasMetric ||
        p.key === 'crazy_lister' ||
        p.key === 'cerebras_studio' ||
        p.key === 'safaric_youth';
      return {
        project: p,
        lgSpan: isWide ? 2 : 1,
        mdSpan: isWide ? 2 : 1,
      };
    });

    if (!isFiltered) {
      return items;
    }

    // Adjust lg spans (3 columns) to fill gaps at the end
    let lgSum = items.reduce((sum, item) => sum + item.lgSpan, 0);
    let lgRemainder = lgSum % 3;
    if (lgRemainder === 1) {
      const last = items[items.length - 1];
      if (last) last.lgSpan = 3;
    } else if (lgRemainder === 2) {
      const last = items[items.length - 1];
      if (last && last.lgSpan === 1) last.lgSpan = 2;
    }

    // Adjust md spans (2 columns) to fill gaps at the end
    let mdSum = items.reduce((sum, item) => sum + item.mdSpan, 0);
    if (mdSum % 2 === 1) {
      const last = items[items.length - 1];
      if (last && last.mdSpan === 1) last.mdSpan = 2;
    }

    return items;
  })();

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-start"
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

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const label = cat === 'all' ? (t.raw('tag') === 'اعمال حقيقية' || t.raw('tag') === 'أعمال حقيقية' || t.raw('tag') === 'Real Work' ? (cat === 'all' && t.raw('tag').includes('حقيقية') ? 'الكل' : 'All') : 'All') : t(`categories.${cat}`);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all border ${
                  isActive
                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-cyan-500/40'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-6"
        >
          {layoutItems.map((item) => {
            const { project, lgSpan, mdSpan } = item;

            const lgSpanClass =
              lgSpan === 3
                ? 'lg:col-span-3'
                : lgSpan === 2
                ? 'lg:col-span-2'
                : 'lg:col-span-1';

            const mdSpanClass =
              mdSpan === 2
                ? 'md:col-span-2'
                : 'md:col-span-1';

            const cardSpan = `${lgSpanClass} ${mdSpanClass} col-span-1`;
            const hasImages = project.images && project.images.length > 0;
            const tags = (t.raw(`items.${project.key}.tags`) as string[]) || [];

            const imageHeightClass =
              lgSpan === 3
                ? 'md:h-64 h-44'
                : lgSpan === 2
                ? 'md:h-56 h-44'
                : 'h-44';

            return (
              <motion.div
                key={project.key}
                variants={itemVariants}
                className={`card group relative p-6 flex flex-col justify-between overflow-hidden hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 ${cardSpan}`}
                style={{
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-surface)',
                }}
                whileHover={{ borderColor: `${project.color}40` }}
              >
                {/* Neon Glow Hover Underlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 250px at 50% 120%, ${project.color}12, transparent)`,
                  }}
                />

                {/* Card Main Body */}
                <div className="space-y-5">
                  {/* Category & Status Indicator */}
                  <div className="flex justify-between items-center">
                    <span
                      className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border"
                      style={{
                        background: `${project.color}10`,
                        color: project.color,
                        borderColor: `${project.color}30`,
                      }}
                    >
                      {t(`categories.${project.category}`)}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">v1.0</span>
                  </div>

                  {/* Browser or Terminal visualizer */}
                  {hasImages ? (
                    <div className={`relative w-full ${imageHeightClass} bg-slate-900 rounded-xl overflow-hidden border border-white/5 flex flex-col group-hover:border-cyan-500/20 transition-all duration-300`}>
                      {/* Browser Mockup controls */}
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-950 border-b border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                        <div className="h-2 w-20 bg-white/5 rounded mx-auto" />
                      </div>
                      <div className="relative flex-1 bg-slate-950">
                        <Image
                          src={project.images[0]}
                          alt={t(`items.${project.key}.name`)}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                          className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={`relative w-full ${imageHeightClass} bg-slate-950 rounded-xl overflow-hidden border border-white/5 flex flex-col p-4 group-hover:border-cyan-500/20 transition-all duration-300`}>
                      {/* Terminal header */}
                      <div className="flex items-center gap-1 border-b border-white/5 pb-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        <span className="text-[8px] text-slate-500 font-mono ml-2">bash</span>
                      </div>
                      {renderTerminalContent(project.key)}
                    </div>
                  )}

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                      {t(`items.${project.key}.name`)}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-medium mt-1 leading-snug">
                      {t(`items.${project.key}.tagline`)}
                    </p>
                  </div>
                </div>

                {/* Footer specs & CTA */}
                <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex justify-between items-center">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dynamic page link */}
                  <Link
                    href={`/projects/${project.key}`}
                    className="flex items-center justify-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}25`,
                    }}
                  >
                    <span>{t('view_project')}</span>
                    <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
