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

          {/* Right — Form (IDE Styled) */}
          <motion.form
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            dir="ltr"
            className="card p-0 overflow-hidden relative border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl flex flex-col"
          >
            {/* IDE Window Title Bar */}
            <div className="bg-slate-950/60 px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-cyan-400">⚡</span>
                <span>contact_form.ts</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                UTF-8
              </div>
            </div>

            {/* Code Window Body */}
            <div className="p-4 sm:p-6 md:p-8 space-y-5 bg-slate-950/20 font-mono text-xs sm:text-sm">
              {/* Header Comment */}
              <div className="flex items-start gap-2.5 select-none">
                <span className="text-slate-600 w-5 text-right shrink-0">01</span>
                <span className="text-slate-500">// Initialize project consultation request</span>
              </div>

              <div className="flex items-start gap-2.5 select-none">
                <span className="text-slate-600 w-5 text-right shrink-0">02</span>
                <p className="text-indigo-400">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">projectRequest</span> = <span className="text-slate-400">{'{'}</span>
                </p>
              </div>

              {/* Name Field */}
              <div className="flex items-start gap-2.5">
                <span className="text-slate-600 w-5 text-right shrink-0 pt-3 select-none">03</span>
                <div className="flex-1 flex flex-col gap-1 py-1 px-3 rounded-lg bg-slate-900/60 border border-white/5 focus-within:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 select-none">
                    <span>// {t('form.full_name_label')}</span>
                    <span>string</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                    <span className="text-amber-400/80 shrink-0">name:</span>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder={`"${t('form.name_placeholder')}"`}
                      className="flex-1 bg-transparent border-none outline-none text-emerald-400 font-mono text-sm placeholder:text-slate-600 py-0.5"
                    />
                    <span className="text-slate-400 hidden sm:inline">,</span>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="flex items-start gap-2.5">
                <span className="text-slate-600 w-5 text-right shrink-0 pt-3 select-none">04</span>
                <div className="flex-1 flex flex-col gap-1 py-1 px-3 rounded-lg bg-slate-900/60 border border-white/5 focus-within:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 select-none">
                    <span>// {t('form.email_label')}</span>
                    <span>string (email)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                    <span className="text-amber-400/80 shrink-0">email:</span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={`"${t('form.email_placeholder')}"`}
                      dir="ltr"
                      className="flex-1 bg-transparent border-none outline-none text-emerald-400 font-mono text-sm placeholder:text-slate-600 py-0.5 text-left"
                    />
                    <span className="text-slate-400 hidden sm:inline">,</span>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="flex items-start gap-2.5">
                <span className="text-slate-600 w-5 text-right shrink-0 pt-3 select-none">05</span>
                <div className="flex-1 flex flex-col gap-1 py-1.5 px-3 rounded-lg bg-slate-900/60 border border-white/5 focus-within:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 select-none">
                    <span>// {t('form.message_label')}</span>
                    <span>string (markdown)</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-amber-400/80 shrink-0">message:</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder={`\`${t('form.message_placeholder')}\``}
                      className="w-full bg-transparent border-none outline-none text-emerald-400 font-mono text-sm placeholder:text-slate-600 resize-none py-0.5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 select-none">
                <span className="text-slate-600 w-5 text-right shrink-0">06</span>
                <span className="text-slate-400">{'}'};</span>
              </div>

              <div className="flex items-start gap-2.5 select-none">
                <span className="text-slate-600 w-5 text-right shrink-0">07</span>
                <p className="text-indigo-400">
                  <span className="text-cyan-400">sendRequest</span>(<span className="text-blue-400">projectRequest</span>);
                </p>
              </div>

              {/* Submit & Status */}
              <motion.div variants={item} className="pt-2 select-none">
                <motion.button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  whileHover={formStatus !== 'loading' ? { scale: 1.01 } : {}}
                  whileTap={formStatus !== 'loading' ? { scale: 0.99 } : {}}
                  className={`relative font-mono text-sm font-bold w-full py-4 rounded-xl transition-all overflow-hidden flex items-center justify-center gap-2 ${
                    formStatus === 'loading'
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                      : 'bg-cyan-500 text-slate-950 border border-cyan-400 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 hover:shadow-cyan-500/30'
                  }`}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-500 border-t-transparent" />
                      <span>{t('form.status_loading')}</span>
                    </>
                  ) : (
                    <>
                      <span>execute_submit()</span>
                      <span className="text-xs opacity-80">→</span>
                    </>
                  )}
                </motion.button>

                <div className="h-6 mt-3">
                  {formStatus === 'success' && (
                    <p className="text-center text-sm font-semibold text-emerald-400 font-mono">
                      {`// ${t('form.status_success')}`}
                    </p>
                  )}
                  {formStatus === 'error' && (
                    <p className="text-center text-sm font-semibold text-rose-400 font-mono">
                      {`// Error: ${t('form.status_error')}`}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
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
