'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const t = useTranslations('Contact');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "b33899ea-0d73-4db4-8d91-f964f66cb867");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-6 relative overflow-hidden">

      {/* Blobs */}
      <div className="blob blob-cyan w-[500px] h-[500px] bottom-0 right-0 z-0 opacity-15" />
      <div className="blob blob-violet w-[400px] h-[400px] top-0 left-0 z-0 opacity-15" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

          {/* Left — Info */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center lg:text-start flex flex-col items-center lg:items-start"
          >
            <motion.span variants={item} className="tech-badge tech-badge-cyan mb-6 inline-block">
              {t('tag')}
            </motion.span>

            <motion.h2 variants={item} className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
              <span className="text-[var(--text-primary)]">{t('lets_talk_title')} </span>
              <span className="text-cyan-400">{t('lets_talk_span')}</span>
            </motion.h2>

            <motion.p variants={item} className="text-[var(--text-secondary)] text-lg font-light leading-relaxed mb-10">
              {t('description')}
            </motion.p>

            {/* Contact Cards */}
            <motion.div variants={container} className="space-y-3 w-full max-w-sm mx-auto lg:mx-0">
              {/* Email */}
              <motion.a
                variants={item}
                href={`mailto:${t('email')}`}
                className="flex items-center gap-4 card p-4 group cursor-pointer"
                whileHover={{ x: 6, borderColor: 'rgba(6,182,212,0.5)' }}
              >
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0">
                  <HiMail className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-center md:text-start">
                  <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-[var(--text-primary)] font-semibold text-sm truncate" dir="ltr">{t('email')}</p>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                variants={item}
                href={t('whatsapp')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 card p-4 group cursor-pointer"
                whileHover={{ x: 6, borderColor: 'rgba(34,197,94,0.5)' }}
              >
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0">
                  <FaWhatsapp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest mb-0.5">WhatsApp</p>
                  <p className="text-[var(--text-primary)] font-semibold text-sm" dir="ltr">{t('phone')}</p>
                </div>
              </motion.a>


              {/* Location */}
              <motion.div
                variants={item}
                className="flex items-center gap-4 card p-4"
              >
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
                  <HiLocationMarker className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest mb-0.5">Location</p>
                  <p className="text-[var(--text-primary)] font-semibold text-sm">Egypt — Available Remote 🌍</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="card p-6 md:p-8 space-y-5"
          >
            <motion.div variants={item}>
              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-widest text-xs text-center md:text-start">
                {t('form.full_name_label')}
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder={t('form.name_placeholder')}
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-input)] shadow-sm text-[var(--text-primary)] text-sm outline-none transition-all focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-[var(--text-placeholder)] text-center md:text-start"
              />
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-widest text-xs text-center md:text-start">
                {t('form.email_label')}
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder={t('form.email_placeholder')}
                dir="ltr"
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-input)] shadow-sm text-[var(--text-primary)] text-sm outline-none transition-all focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-[var(--text-placeholder)] text-center md:text-start"
              />
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-widest text-xs text-center md:text-start">
                {t('form.message_label')}
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t('form.message_placeholder')}
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-input)] shadow-sm text-[var(--text-primary)] text-sm outline-none transition-all focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-[var(--text-placeholder)] resize-none text-center md:text-start"
              />
            </motion.div>

            <motion.button
              variants={item}
              type="submit"
              disabled={formStatus === 'loading'}
              whileHover={formStatus !== 'loading' ? { scale: 1.02 } : {}}
              whileTap={formStatus !== 'loading' ? { scale: 0.98 } : {}}
              className={`btn-primary w-full py-4 text-base font-bold rounded-xl transition-all ${formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {formStatus === 'loading' ? t('form.status_loading') : `${t('send')} →`}
            </motion.button>

            <motion.div variants={item} className="h-6">
              {formStatus === 'success' && (
                <p className="text-center text-sm font-semibold text-emerald-500">
                  {t('form.status_success')}
                </p>
              )}
              {formStatus === 'error' && (
                <p className="text-center text-sm font-semibold text-rose-500">
                  {t('form.status_error')}
                </p>
              )}
            </motion.div>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-divider mt-20 mb-8"
        />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)] text-center md:text-start">
          <p>
            © {new Date().getFullYear()} <span className="text-[var(--text-secondary)] font-semibold">{t('footer.copyright')}</span>. {t('footer.all_rights_reserved')}.
          </p>
          <p className="font-mono text-xs">{t('footer.built_with')}</p>
        </div>
      </div>
    </section>
  );
}
