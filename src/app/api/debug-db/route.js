import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.from('properties').select('*');
    
    return Response.json({
      envUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      envKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      data,
      error
    }, { status: 200 });

  } catch (err) {
    return Response.json({ message: err.message, stack: err.stack }, { status: 200 });
  }
}
