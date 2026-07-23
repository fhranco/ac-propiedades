const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/);

if (!urlMatch || !keyMatch) {
  console.error("No se encontraron las variables en .env.local");
  process.exit(1);
}

const supabaseUrl = urlMatch[1].trim();
const supabaseKey = keyMatch[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  try {
    console.log("Conectando a:", supabaseUrl);
    const { data, error } = await supabase
      .from('properties')
      .select('id, title, category');

    if (error) {
      console.error("Error al consultar propiedades:", error);
      return;
    }

    console.log("Conexión EXITOSA.");
    console.log("Número total de propiedades en la base de datos:", data.length);
    if (data.length > 0) {
      console.log("Ejemplo de las primeras 3 propiedades registradas:");
      console.log(data.slice(0, 3));
    } else {
      console.log("No hay propiedades registradas aún.");
    }
  } catch (err) {
    console.error("Error inesperado:", err);
  }
}

testSupabase();
