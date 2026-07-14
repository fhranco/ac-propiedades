import { createClient } from '@supabase/supabase-js';

export default async function sitemap() {
  const baseUrl = 'https://acpropiedadesmagallanes.cl';

  // Páginas estáticas base
  const staticPages = [
    '',
    '/propiedades',
    '/nosotros',
    '/servicios',
    '/contacto',
    '/preguntas-frecuentes',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  let dynamicPages = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    const { data: properties } = await supabase
      .from('properties')
      .select('id, created_at')
      .eq('status', 'Active')
      .limit(200);

    if (properties && properties.length > 0) {
      dynamicPages = properties.map((prop) => ({
        url: `${baseUrl}/propiedades/${prop.id}`,
        lastModified: prop.created_at
          ? new Date(prop.created_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Sitemap generator error fetching properties:', error);
  }

  return [...staticPages, ...dynamicPages];
}
