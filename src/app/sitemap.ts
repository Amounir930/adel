import { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://adel.mounir.60sec.shop';
  const locales = ['ar', 'en'];
  
  const entries: MetadataRoute.Sitemap = [];

  // 1. Homepage entries for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    });
  }

  // 2. Project dynamic detail page entries for each locale
  for (const project of PROJECTS) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.key}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
