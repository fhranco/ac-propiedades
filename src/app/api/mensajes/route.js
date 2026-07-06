import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/** GET /api/mensajes */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = supabase.from('mensajes').select('*').order('sent_at', { ascending: false });
    if (userId) query = query.or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`);

    const { data, error } = await query;
    if (error) throw error;
    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error('GET /api/mensajes:', e);
    return Response.json({ error: 'Error al obtener mensajes' }, { status: 500 });
  }
}

/** POST /api/mensajes — Body: { propiedadId, fromUserId?, content } */
export async function POST(request) {
  try {
    const body = await request.json();
    const { propiedadId, fromUserId, content } = body;

    if (!propiedadId) return Response.json({ error: 'propiedadId requerido' }, { status: 400 });

    const { data, error } = await supabase
      .from('mensajes')
      .insert({ from_user_id: fromUserId || null, content: content || `Clic WhatsApp prop:${propiedadId}` })
      .select()
      .single();

    if (error) throw error;
    return Response.json({ message: 'Mensaje registrado', mensaje: data }, { status: 201 });
  } catch (e) {
    console.error('POST /api/mensajes:', e);
    return Response.json({ error: 'Error al guardar mensaje' }, { status: 500 });
  }
}
