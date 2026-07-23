import { createClient } from '@supabase/supabase-js';

export const revalidate = 10; // Revalidar los datos en caché como máximo cada 10 segundos
export const dynamic = 'auto'; // Permitir caché ISR en lugar de forzar dinamicidad en cada milisegundo

let supabase;
try {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
} catch (e) {
  console.error("SUPABASE INIT ERROR:", e);
  require('fs').appendFileSync('api-error.log', 'INIT ERROR: ' + e.message + '\\n');
}

const slugify = (text) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-y-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-');

/**
 * GET /api/propiedades
 * Retorna las propiedades de Supabase con soporte para paginación y reducción de campos (select).
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Selector de columnas por modo:
    // - fields=card   → solo columnas mínimas para tarjetas (más rápido, sin timeout)
    // - fields=full   → incluye images y amenities (para edición en admin)
    // - default       → columnas base sin JSONB pesados
    const fields = searchParams.get('fields');
    let selectString = 'id, title, category, price, sufijo_precio, city, address, bedrooms, bathrooms, area, type, cover_image, status, created_at, id_ingreso_manual, slug, year_building, sector_barrio, region, provincia, comuna, lat, lng';
    if (fields === 'card') {
      // Solo lo necesario para tarjetas
      selectString = 'id, title, category, price, sufijo_precio, city, address, bedrooms, bathrooms, area, type, cover_image, status, created_at, id_ingreso_manual, slug, lat, lng';
    } else if (fields === 'full') {
      // Modo edición: incluye galería completa y amenidades
      selectString = '*';
    }
    
    let query = supabase.from('properties').select(selectString);

    // Filtro por ID específico (modo edición: busca solo una propiedad)
    if (searchParams.get('id'))        query = query.eq('id', searchParams.get('id'));
    if (searchParams.get('city'))      query = query.ilike('city', `%${searchParams.get('city')}%`);
    if (searchParams.get('category'))  query = query.eq('category', searchParams.get('category'));
    if (searchParams.get('status'))    query = query.eq('status', searchParams.get('status'));
    if (searchParams.get('agent_id'))  query = query.eq('agent_id', searchParams.get('agent_id'));

    // Ordenar por fecha de creación descendente para asegurar que lo más nuevo cargue primero
    query = query.order('created_at', { ascending: false });

    // Paginación opcional (si no se define limit, aplicamos 100 por defecto)
    const page = searchParams.get('page');
    const limit = searchParams.get('limit') || '100';
    
    const pageNum = parseInt(page || '1', 10) || 1;
    const limitNum = parseInt(limit, 10) || 100;
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;
    query = query.range(from, to);

    const { data, error } = await query;
    if (error) throw error;

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('GET /api/propiedades:', error);
    require('fs').appendFileSync('api-error.log', 'GET error: ' + (error.message || JSON.stringify(error)) + '\n');
    return Response.json({ error: 'Error al conectar con Supabase' }, { status: 500 });
  }
}

/**
 * POST /api/propiedades
 * Inserta una o varias propiedades con soporte de campos SEO avanzados.
 */
export async function POST(request) {
  try {
    let newData = await request.json();
    
    const processItem = (item) => {
      // Generar slug basado en seo_title o title visual
      const slugBase = item.slug || item.seo_title || item.title || 'propiedad';
      const rawSlug = slugify(slugBase);
      // Agregar un identificador único al final del slug para evitar errores de clave duplicada
      const uniqueSuffix = Math.random().toString(36).substring(2, 7);
      const slug = `${rawSlug}-${uniqueSuffix}`;

      return {
        id: item.id || Math.floor(100000 + Math.random() * 900000),
        title: item.title || 'Propiedad sin título',
        slug: slug,
        description: item.description,
        price: item.price,
        city: item.city,
        region: item.region,
        category: item.category,
        type: item.type,
        status: item.status || 'Disponible',
        bedrooms: item.bedrooms !== undefined ? item.bedrooms : item.bedroom,
        bathrooms: item.bathrooms !== undefined ? item.bathrooms : item.bathroom,
        area: item.area !== undefined ? item.area : item.sqft,
        images: item.images,
        amenities: item.amenities,
        agent_id: item.agent_id || item.agentId || 1,
        address: item.address,
        video_url: item.video_url || item.videoUrl,
        tour_360_url: item.tour_360_url || item.tour360Url,
        garage: item.garage,
        year_building: item.year_building || item.yearBuilding,
        contribuciones: item.contribuciones || item.contribucionesAnuales,
        sufijo_precio: item.sufijo_precio || item.sufijoPrecio,
        provincia: item.provincia,
        comuna: item.comuna,
        codigo_postal: item.codigo_postal || item.codigoPostal,
        superficie_terreno: item.superficie_terreno || item.superficieTerreno,
        habitaciones: item.habitaciones,
        id_ingreso_manual: item.id_ingreso_manual || item.idIngresoManual,
        tamano_estacionamiento: item.tamano_estacionamiento || item.tamanoEstacionamiento,
        disponible_desde: item.disponible_desde || item.disponibleDesde,
        subterraneo_bodega: item.subterraneo_bodega || item.subterraneoBodega,
        detalles_adicionales: item.detalles_adicionales || item.detallesAdicionales,
        tipo_techo: item.tipo_techo || item.tipoTecho,
        material_exterior: item.material_exterior || item.materialExterior,
        tipo_estructura: item.tipo_estructura || item.tipoEstructura,
        num_piso: item.num_piso || item.numPiso,
        clase_energetica: item.clase_energetica || item.claseEnergetica,
        eficiencia_energetica: item.eficiencia_energetica || item.eficienciaEnergetica,
        notas_agente: item.notas_agente || item.notasAgente,
        // Columnas SEO
        seo_title: item.seo_title || item.seoTitle,
        seo_description: item.seo_description || item.seoDescription,
        seo_keywords: item.seo_keywords || item.seoKeywords,
        seo_extract: item.seo_extract || item.seoExtract,
        uso_tipo: item.uso_tipo || item.usoTipo,
        sector_barrio: item.sector_barrio || item.sectorBarrio,
        espacios_comerciales: item.espacios_comerciales || item.espaciosComerciales,
        espacios_habitacionales: item.espacios_habitacionales || item.espaciosHabitacionales,
        lat: item.latitude !== undefined ? Number(item.latitude) : (item.lat !== undefined ? Number(item.lat) : null),
        lng: item.longitude !== undefined ? Number(item.longitude) : (item.lng !== undefined ? Number(item.lng) : null)
      };
    };

    const items = Array.isArray(newData) ? newData.map(processItem) : [processItem(newData)];
    const { data, error } = await supabase.from('properties').insert(items).select();
    
    if (error) {
      console.error('Supabase error detail:', error);
      require('fs').appendFileSync('api-error.log', JSON.stringify(error) + '\\n');
      throw error;
    }

    return Response.json({ message: 'Propiedad(es) creada(s)', data }, { status: 201 });
  } catch (error) {
    console.error('POST /api/propiedades:', error);
    require('fs').appendFileSync('api-error.log', 'Catch block: ' + error.message + '\\n');
    return Response.json({ error: 'Error al crear propiedad', details: error.message }, { status: 500 });
  }
}

/**
 * PUT /api/propiedades
 * Actualiza una propiedad.
 */
export async function PUT(request) {
  try {
    const { id, updates } = await request.json();
    if (!id) return Response.json({ error: 'ID requerido' }, { status: 400 });

    const mappedUpdates = {
      title: updates.title,
      description: updates.description,
      price: updates.price,
      city: updates.city,
      region: updates.region,
      category: updates.category,
      type: updates.type,
      status: updates.status,
      bedrooms: updates.bedrooms !== undefined ? updates.bedrooms : updates.bedroom,
      bathrooms: updates.bathrooms !== undefined ? updates.bathrooms : updates.bathroom,
      area: updates.area !== undefined ? updates.area : updates.sqft,
      images: updates.images,
      cover_image: updates.cover_image || updates.coverImage,
      amenities: updates.amenities,
      agent_id: updates.agent_id || updates.agentId,
      address: updates.address,
      video_url: updates.video_url || updates.videoUrl,
      tour_360_url: updates.tour_360_url || updates.tour360Url,
      garage: updates.garage,
      year_building: updates.year_building || updates.yearBuilding,
      contribuciones: updates.contribuciones || updates.contribucionesAnuales,
      sufijo_precio: updates.sufijo_precio || updates.sufijoPrecio,
      provincia: updates.provincia,
      comuna: updates.comuna,
      codigo_postal: updates.codigo_postal || updates.codigoPostal,
      superficie_terreno: updates.superficie_terreno || updates.superficieTerreno,
      habitaciones: updates.habitaciones,
      id_ingreso_manual: updates.id_ingreso_manual || updates.idIngresoManual,
      tamano_estacionamiento: updates.tamano_estacionamiento || updates.tamanoEstacionamiento,
      disponible_desde: updates.disponible_desde || updates.disponibleDesde,
      subterraneo_bodega: updates.subterraneo_bodega || updates.subterraneoBodega,
      detalles_adicionales: updates.detalles_adicionales || updates.detallesAdicionales,
      tipo_techo: updates.tipo_techo || updates.tipoTecho,
      material_exterior: updates.material_exterior || updates.materialExterior,
      tipo_estructura: updates.tipo_estructura || updates.tipoEstructura,
      num_piso: updates.num_piso || updates.numPiso,
      clase_energetica: updates.clase_energetica || updates.claseEnergetica,
      eficiencia_energetica: updates.eficiencia_energetica || updates.eficienciaEnergetica,
      notas_agente: updates.notas_agente || updates.notasAgente,
      // Columnas SEO
      seo_title: updates.seo_title || updates.seoTitle,
      seo_description: updates.seo_description || updates.seoDescription,
      seo_keywords: updates.seo_keywords || updates.seoKeywords,
      seo_extract: updates.seo_extract || updates.seoExtract,
      uso_tipo: updates.uso_tipo || updates.usoTipo,
      sector_barrio: updates.sector_barrio || updates.sectorBarrio,
      espacios_comerciales: updates.espacios_comerciales || updates.espaciosComerciales,
      espacios_habitacionales: updates.espacios_habitacionales || updates.espaciosHabitacionales,
      lat: updates.latitude !== undefined ? Number(updates.latitude) : (updates.lat !== undefined ? Number(updates.lat) : undefined),
      lng: updates.longitude !== undefined ? Number(updates.longitude) : (updates.lng !== undefined ? Number(updates.lng) : undefined),
      updated_at: new Date().toISOString()
    };

    Object.keys(mappedUpdates).forEach(
      (key) => mappedUpdates[key] === undefined && delete mappedUpdates[key]
    );

    const { data, error } = await supabase
      .from('properties')
      .update(mappedUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return Response.json({ error: 'Propiedad no encontrada' }, { status: 404 });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('PUT /api/propiedades:', error);
    return Response.json({ error: 'Error al actualizar propiedad' }, { status: 500 });
  }
}

/**
 * DELETE /api/propiedades
 */
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) return Response.json({ error: 'ID requerido' }, { status: 400 });

    // 1. Eliminar referencias en tablas dependientes (simulando ON DELETE CASCADE)
    await Promise.all([
      supabase.from('visitas').delete().eq('property_id', id),
      supabase.from('favoritos').delete().eq('property_id', id),
      supabase.from('mensajes').delete().eq('property_id', id)
    ]);

    // 2. Eliminar la propiedad
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) {
      console.error('DELETE error details:', error);
      throw error;
    }

    return Response.json({ message: 'Propiedad eliminada correctamente' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/propiedades:', error);
    return Response.json({ error: 'Error al eliminar propiedad', details: error.message }, { status: 500 });
  }
}
