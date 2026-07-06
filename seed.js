const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Leer archivo .env.local de forma nativa sin dotenv
let supabaseUrl = "";
let supabaseKey = "";

try {
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim();
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseKey = line.split('=')[1].trim();
    }
  }
} catch (e) {
  console.error("Error leyendo archivo .env.local:", e.message);
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: No se encontraron las credenciales de Supabase en .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const seedProperties = [
  {
    id: 101,
    title: "Hermosa Casa con Vista al Estrecho de Magallanes",
    slug: "hermosa-casa-con-vista-al-estrecho-de-magallanes",
    description: "Exclusiva propiedad ubicada en zona residencial de Punta Arenas. Cuenta con amplios espacios, calefacción central, ventanas termopanel y una espectacular vista panorámica al Estrecho de Magallanes.\n\nIdeal para uso mixto comercial y habitacional.",
    price: 135000000,
    city: "Punta Arenas",
    region: "Magallanes y la Antártica Chilena",
    category: "Casa",
    type: "Venta",
    status: "Disponible",
    bedrooms: 1,
    bathrooms: 2,
    area: 105,
    superficie_terreno: 204,
    address: "Villa Jardín de la Patagonia, Punta Arenas",
    sector_barrio: "Villa Jardín de la Patagonia - Etapa 1",
    uso_tipo: "Uso Mixto",
    espacios_comerciales: "Hall de recepción + 2 salas multiuso + 1 baño visita",
    espacios_habitacionales: "1 dormitorio principal + 1 baño completo + living comedor + cocina americana",
    garage: "2",
    tamano_estacionamiento: "Entrada para 2 vehículos",
    year_building: "2022",
    video_url: "https://www.youtube.com/watch?v=oqNZOOWF8qM",
    tour_360_url: "https://my.matterport.com/show/?m=9sA4mxwSJL8",
    seo_title: "Casa en venta en Villa Jardín de la Patagonia, Punta Arenas – Uso comercial y habitacional",
    seo_description: "Casa en venta en Villa Jardín de la Patagonia, Punta Arenas. Propiedad de uso mixto comercial y habitacional, 204 m² de terreno y 105 m² construidos.",
    seo_keywords: "casa en venta en Punta Arenas, casa en venta Villa Jardín de la Patagonia, propiedad comercial en Punta Arenas, casa uso mixto comercial y habitacional Punta Arenas",
    seo_extract: "Casa en venta de uso mixto con patio y estacionamientos en Villa Jardín de la Patagonia, Punta Arenas.",
    images: [
      "/images/listings/g-1.jpg"
    ],
    amenities: [
      "Estacionamiento",
      "Calefacción central",
      "Citófono",
      "Agua caliente 24h",
      "Fibra óptica / Internet"
    ],
    agent_id: 1
  }
];

async function runSeed() {
  console.log("Iniciando carga de datos en Supabase...");
  
  // Limpiar propiedades antiguas por si acaso
  await supabase.from('properties').delete().eq('id', 101);

  const { data, error } = await supabase
    .from('properties')
    .insert(seedProperties)
    .select();

  if (error) {
    console.error("Error cargando propiedades:", error);
  } else {
    console.log("¡Carga exitosa! Propiedades creadas:", data);
  }
}

runSeed();
