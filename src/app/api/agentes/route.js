import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * GET /api/agentes
 * Retorna todos los agentes (sin password_hash).
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('agents')
      .select('id, username, email, first_name, last_name, company_name, phone_number, rut, position, language, address, about_me, image, facebook, instagram, linkedin, website, created_at')
      .order('id');

    if (error) throw error;
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('GET /api/agentes:', error);
    return Response.json({ error: 'Error al leer agentes' }, { status: 500 });
  }
}

/**
 * POST /api/agentes
 * Crea un nuevo agente con hash de contraseña y perfil de rol.
 * Body: { username, email, password, role, ...campos }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { password, role = 'agent', ...agentData } = body;

    if (!agentData.username || !agentData.email || !password) {
      return Response.json({ error: 'Username, email y password son requeridos' }, { status: 400 });
    }

    const password_hash = bcrypt.hashSync(password, 12);
    const { data: inserted, error } = await supabase
      .from('agents')
      .insert({ ...agentData, password_hash })
      .select('id')
      .single();

    if (error) throw error;

    // Crear perfil de rol
    await supabase.from('profiles').insert({ agent_id: inserted.id, role });

    return Response.json({ message: 'Agente creado', id: inserted.id }, { status: 201 });
  } catch (error) {
    console.error('POST /api/agentes:', error);
    return Response.json({ error: 'Error al crear agente' }, { status: 500 });
  }
}

/**
 * PUT /api/agentes
 * Actualiza un agente existente.
 * Body: { id, updates }
 */
export async function PUT(request) {
  try {
    const { id, updates } = await request.json();
    if (!id) return Response.json({ error: 'ID requerido' }, { status: 400 });

    // Si se envía contraseña nueva, la hasheamos
    if (updates.password) {
      updates.password_hash = bcrypt.hashSync(updates.password, 12);
      delete updates.password;
    }

    const { data, error } = await supabase
      .from('agents')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id, username, email, first_name, last_name, image')
      .single();

    if (error) throw error;
    if (!data) return Response.json({ error: 'Agente no encontrado' }, { status: 404 });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('PUT /api/agentes:', error);
    return Response.json({ error: 'Error al actualizar agente' }, { status: 500 });
  }
}

/**
 * DELETE /api/agentes
 * Elimina un agente por id.
 * Body: { id }
 */
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) return Response.json({ error: 'ID requerido' }, { status: 400 });

    const { error } = await supabase.from('agents').delete().eq('id', id);
    if (error) throw error;

    return Response.json({ message: 'Agente eliminado' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/agentes:', error);
    return Response.json({ error: 'Error al eliminar agente' }, { status: 500 });
  }
}
