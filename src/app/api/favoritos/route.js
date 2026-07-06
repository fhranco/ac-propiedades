import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/** GET /api/favoritos?userId=X */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = supabase
      .from('favoritos')
      .select('*, properties(id, title, slug, price, city, category, images, status)')
      .order('added_at', { ascending: false });

    if (userId) query = query.eq('user_id', userId);

    const { data, error } = await query;
    if (error) throw error;
    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error('GET /api/favoritos:', e);
    return Response.json({ error: 'Error al leer favoritos' }, { status: 500 });
  }
}

/** POST /api/favoritos — Body: { userId, propiedadId } */
export async function POST(request) {
  try {
    const { userId, propiedadId } = await request.json();
    if (!userId || !propiedadId) {
      return Response.json({ error: 'userId y propiedadId son requeridos' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('favoritos')
      .insert({ user_id: userId, property_id: propiedadId })
      .select()
      .single();

    if (error) throw error;
    return Response.json({ message: 'Favorito agregado', favorito: data }, { status: 201 });
  } catch (e) {
    console.error('POST /api/favoritos:', e);
    return Response.json({ error: 'Error al agregar favorito' }, { status: 500 });
  }
}

/** DELETE /api/favoritos — Body: { userId, propiedadId } */
export async function DELETE(request) {
  try {
    const { userId, propiedadId } = await request.json();
    if (!userId || !propiedadId) {
      return Response.json({ error: 'userId y propiedadId son requeridos' }, { status: 400 });
    }

    const { error } = await supabase
      .from('favoritos')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propiedadId);

    if (error) throw error;
    return Response.json({ message: 'Favorito eliminado' }, { status: 200 });
  } catch (e) {
    console.error('DELETE /api/favoritos:', e);
    return Response.json({ error: 'Error al eliminar favorito' }, { status: 500 });
  }
}
