import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    // Buscar agente por email o username
    const { data: agent, error } = await supabase
      .from('agents')
      .select('id, username, email, first_name, last_name, image, password_hash')
      .or(`email.eq.${email},username.eq.${email}`)
      .single();

    if (error || !agent) {
      return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Verificar contraseña con bcrypt
    const validPassword = bcrypt.compareSync(password, agent.password_hash);
    if (!validPassword) {
      return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Obtener rol del perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('agent_id', agent.id)
      .single();

    const role = profile?.role || 'agent';

    return Response.json({
      message: 'Login exitoso',
      user: {
        id: agent.id,
        username: agent.username,
        email: agent.email,
        firstName: agent.first_name,
        lastName: agent.last_name,
        image: agent.image,
        role,
      },
    }, { status: 200 });

  } catch (e) {
    console.error('Login error:', e);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
