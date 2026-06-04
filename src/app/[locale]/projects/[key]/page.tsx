import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { PROJECTS, ProjectDef } from '@/data/projects';
import ProjectImageSlider from '@/components/ProjectImageSlider';
import { HiArrowLeft, HiArrowRight, HiCode, HiExternalLink } from 'react-icons/hi';

interface PageProps {
  params: Promise<{
    locale: string;
    key: string;
  }>;
}

export async function generateStaticParams() {
  const paramsList: { locale: string; key: string }[] = [];
  for (const locale of ['en', 'ar']) {
    for (const project of PROJECTS) {
      paramsList.push({ locale, key: project.key });
    }
  }
  return paramsList;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, key } = await params;
  const project = PROJECTS.find((p) => p.key === key);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: 'Projects' });
  const projectName = t(`items.${key}.name`);
  const projectTagline = t(`items.${key}.tagline`);
  const projectDesc = t(`items.${key}.description`).substring(0, 160);

  return {
    title: `${projectName} | Adel Mounir`,
    description: `${projectTagline} - ${projectDesc}`,
    alternates: {
      canonical: `/${locale}/projects/${key}`,
    },
    openGraph: {
      title: projectName,
      description: projectDesc,
      type: 'article',
      images: project.images.map((img) => ({
        url: img.startsWith('http') ? img : `https://adel.mounir.60sec.shop${img}`,
        width: 1200,
        height: 630,
        alt: projectName,
      })),
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, key } = await params;
  const project = PROJECTS.find((p) => p.key === key);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Projects' });
  const commonT = await getTranslations({ locale, namespace: 'Navigation' });

  const projectName = t(`items.${key}.name`);
  const tagline = t(`items.${key}.tagline`);
  const description = t(`items.${key}.description`);
  const features = t.raw(`items.${key}.features`) as string[];
  const tags = t.raw(`items.${key}.tags`) as string[];
  const metric = project.hasMetric ? t.raw(`items.${key}.metric`) as { value: string; label: string } : null;

  const isRtl = locale === 'ar';

  // JSON-LD Structured Data Schema for Google SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': projectName,
    'description': description,
    'image': project.images.map((img) =>
      img.startsWith('http') ? img : `https://adel.mounir.60sec.shop${img}`
    ),
    'author': {
      '@type': 'Person',
      'name': 'Adel Mounir',
      'url': 'https://adel.mounir.60sec.shop'
    },
    'keywords': tags.join(', '),
    'publisher': {
      '@type': 'Organization',
      'name': 'Adel Mounir Solutions'
    }
  };

  return (
    <>
      {/* Inject Structured Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[var(--bg-base)] py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation Button */}
          <div className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium text-sm shadow-sm"
            >
              {isRtl ? <HiArrowRight className="w-5 h-5" /> : <HiArrowLeft className="w-5 h-5" />}
              <span>{isRtl ? 'العودة للمشاريع' : 'Back to Projects'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left/Main Column: Image Slider & Description (Span 2) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cover/Slider Container */}
              <div className="relative">
                <ProjectImageSlider images={project.images} projectName={projectName} />
              </div>

              {/* General Project Description */}
              <div className="card p-8 md:p-10 space-y-6">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight border-b border-[var(--border-color)] pb-4">
                  {isRtl ? 'تفاصيل المشروع' : 'Project Details'}
                </h2>
                <div className="text-[var(--text-secondary)] leading-relaxed font-light text-base md:text-lg whitespace-pre-line space-y-4">
                  {description}
                </div>
              </div>

              {/* Core Features list */}
              {features && features.length > 0 && (
                <div className="card p-8 md:p-10 space-y-6">
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight border-b border-[var(--border-color)] pb-4">
                    {isRtl ? 'المميزات الرئيسية' : 'Core Features'}
                  </h2>
                  <ul className="space-y-4">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span
                          className="w-2.5 h-2.5 rounded-full mt-2.5 flex-shrink-0"
                          style={{ background: project.color }}
                        />
                        <span className="text-[var(--text-secondary)] font-medium text-base md:text-lg">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Spec Cards, Metrics & CTAs (Span 1) */}
            <div className="space-y-8">
              {/* Project Meta Card */}
              <div className="card p-8 space-y-6">
                <div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest inline-block mb-3"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}35`,
                    }}
                  >
                    {isRtl ? 'معلومات المشروع' : 'Project Spec'}
                  </span>
                  <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
                    {projectName}
                  </h1>
                  <p className="text-sm text-[var(--text-muted)] font-medium mt-1 leading-snug">
                    {tagline}
                  </p>
                </div>

                {/* Metrics Segment */}
                {metric && (
                  <div
                    className="p-5 rounded-2xl border flex items-center gap-4"
                    style={{
                      background: `${project.color}05`,
                      borderColor: `${project.color}25`,
                    }}
                  >
                    <div
                      className="p-3 rounded-xl flex items-center justify-center font-black"
                      style={{
                        background: `${project.color}15`,
                        color: project.color,
                      }}
                    >
                      ROI
                    </div>
                    <div>
                      <div className="text-xl font-black" style={{ color: project.color }}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tech Stack Spec */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {isRtl ? 'التقنيات المستخدمة' : 'Technologies'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-base"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})`,
                      }}
                    >
                      <HiExternalLink className="w-5 h-5" />
                      <span>{isRtl ? 'زيارة المشروع' : 'Live Demo'}</span>
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-all text-base text-[var(--text-primary)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <HiCode className="w-5 h-5" />
                      <span>{isRtl ? 'كود المصدر' : 'Source Code'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
