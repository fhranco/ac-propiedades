import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/** GET /api/logs-desarrollo */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('logs_desarrollo')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(500);

    if (error) throw error;
    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error('GET /api/logs-desarrollo:', e);
    return Response.json({ error: 'Error al leer logs' }, { status: 500 });
  }
}

/** POST /api/logs-desarrollo — Body: { type, message, details } */
export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('logs_desarrollo')
      .insert({
        type: body.type || 'info',
        message: body.message || '',
        details: body.details || '',
      })
      .select()
      .single();

    if (error) throw error;
    return Response.json({ message: 'Log registrado', log: data }, { status: 201 });
  } catch (e) {
    console.error('POST /api/logs-desarrollo:', e);
    return Response.json({ error: 'Error al escribir log' }, { status: 500 });
  }
}
