import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/** GET /api/resenas?propiedadId=X */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const propiedadId = searchParams.get('propiedadId');

    let query = supabase.from('resenas').select('*').order('created_at', { ascending: false });
    if (propiedadId) query = query.eq('property_id', propiedadId);

    const { data, error } = await query;
    if (error) throw error;
    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error('GET /api/resenas:', e);
    return Response.json({ error: 'Error al obtener reseñas' }, { status: 500 });
  }
}

/** POST /api/resenas — Body: { propiedadId, email, title, rating, review } */
export async function POST(request) {
  try {
    const { propiedadId, email, title, rating, review } = await request.json();
    if (!propiedadId || !email || !review) {
      return Response.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('resenas')
      .insert({ property_id: propiedadId, comment: review, rating: rating || 5 })
      .select()
      .single();

    if (error) throw error;
    return Response.json({ message: 'Reseña agregada', resena: data }, { status: 201 });
  } catch (e) {
    console.error('POST /api/resenas:', e);
    return Response.json({ error: 'Error al registrar reseña' }, { status: 500 });
  }
}
