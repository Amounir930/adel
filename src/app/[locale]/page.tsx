import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Hero' });

  const siteTitle =
    locale === 'ar'
      ? 'عادل منير | مطور Full Stack ونظم مؤسسية'
      : 'Adel Mounir | Full-Stack Developer';
  const siteDesc = t('description');

  return {
    title: siteTitle,
    description: siteDesc,
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      type: 'website',
      images: [
        {
          url: 'https://adel.mounir.60sec.shop/photo/adel.png',
          width: 800,
          height: 800,
          alt: siteTitle,
        },
      ],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Global structured metadata schemas for search engines
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Adel Mounir',
    'url': `https://adel.mounir.60sec.shop/${locale}`,
    'jobTitle': 'Full-Stack Developer',
    'knowsAbout': ['Software Development', 'Web Development', 'Databases', 'APIs', 'Automation'],
    'sameAs': [
      'https://github.com/adelfree2023-dev',
      'https://mostaql.com/u/adeldev93'
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Adel Mounir Portfolio',
    'url': `https://adel.mounir.60sec.shop/${locale}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  );
}
