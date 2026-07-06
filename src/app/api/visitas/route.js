import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/** GET /api/visitas?agrupado=true */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const agrupado = searchParams.get('agrupado') === 'true';

    if (agrupado) {
      // Conteo agrupado por propiedad con join a properties
      const { data, error } = await supabase
        .from('visitas')
        .select('property_id, properties(id, title)')
        .order('property_id');

      if (error) throw error;

      // Agrupar manualmente
      const conteo = {};
      data.forEach((v) => {
        const id = v.property_id;
        if (!conteo[id]) conteo[id] = { id, title: v.properties?.title || `Propiedad ${id}`, visitas: 0 };
        conteo[id].visitas++;
      });

      const ranking = Object.values(conteo).sort((a, b) => b.visitas - a.visitas);
      return Response.json(ranking, { status: 200 });
    }

    const { data, error } = await supabase
      .from('visitas')
      .select('*')
      .order('visited_at', { ascending: false });

    if (error) throw error;
    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error('GET /api/visitas:', e);
    return Response.json({ error: 'Error al leer visitas' }, { status: 500 });
  }
}

/** POST /api/visitas — Body: { propiedadId, userId? } */
export async function POST(request) {
  try {
    const { propiedadId, userId } = await request.json();
    if (!propiedadId) return Response.json({ error: 'propiedadId requerido' }, { status: 400 });

    const { data, error } = await supabase
      .from('visitas')
      .insert({ property_id: propiedadId, user_id: userId || null })
      .select()
      .single();

    if (error) throw error;
    return Response.json({ message: 'Visita registrada', visita: data }, { status: 201 });
  } catch (e) {
    console.error('POST /api/visitas:', e);
    return Response.json({ error: 'Error al registrar visita' }, { status: 500 });
  }
}
