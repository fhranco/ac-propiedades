const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Manual env parser to avoid external dependencies
if (fs.existsSync('.env.local')) {
  const envFile = fs.readFileSync('.env.local', 'utf-8');
  envFile.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      if (key && !key.startsWith('#')) {
        process.env[key] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = 'propiedades';

// Helper to convert base64 to Buffer
function base64ToBuffer(base64Str) {
  const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return null;
  }
  return {
    type: matches[1],
    buffer: Buffer.from(matches[2], 'base64')
  };
}

async function uploadToStorage(base64Str, path) {
  const parsed = base64ToBuffer(base64Str);
  if (!parsed) return null;

  // Determinar extensión basándose en el tipo MIME
  let ext = 'webp';
  if (parsed.type.includes('png')) ext = 'png';
  if (parsed.type.includes('jpeg') || parsed.type.includes('jpg')) ext = 'jpg';

  const fullPath = `${path}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fullPath, parsed.buffer, {
      contentType: parsed.type,
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error(`  Error uploading ${fullPath}:`, error.message);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fullPath);

  return publicUrl;
}

async function migrateProperties() {
  console.log("Starting migration for Properties...");
  const { data: properties, error } = await supabase
    .from('properties')
    .select('id, title, images');

  if (error) {
    console.error("Error fetching properties:", error);
    return;
  }

  console.log(`Found ${properties.length} properties to check.`);

  for (const prop of properties) {
    let imagesArray = [];
    if (Array.isArray(prop.images)) {
      imagesArray = prop.images;
    } else if (typeof prop.images === 'string') {
      try {
        imagesArray = JSON.parse(prop.images);
      } catch (e) {
        imagesArray = [prop.images];
      }
    }

    if (!imagesArray || imagesArray.length === 0) continue;

    console.log(`Checking Property ID ${prop.id} ("${prop.title}"):`);
    let updated = false;
    const newImages = [];

    for (let i = 0; i < imagesArray.length; i++) {
      const img = imagesArray[i];
      if (typeof img === 'string' && img.startsWith('data:image')) {
        console.log(`  Converting image ${i + 1}/${imagesArray.length} from base64...`);
        const path = `migrated/prop-${prop.id}-${i}-${Date.now()}`;
        const publicUrl = await uploadToStorage(img, path);
        if (publicUrl) {
          newImages.push(publicUrl);
          updated = true;
        } else {
          newImages.push(img); // Mantener el original si falla
        }
      } else {
        newImages.push(img); // Mantener si ya es URL
      }
    }

    if (updated) {
      const { error: updateError } = await supabase
        .from('properties')
        .update({ images: newImages })
        .eq('id', prop.id);

      if (updateError) {
        console.error(`  Failed to update Property ID ${prop.id}:`, updateError.message);
      } else {
        console.log(`  Successfully migrated Property ID ${prop.id}!`);
      }
    } else {
      console.log("  No base64 images found or already migrated.");
    }
  }
}

async function migrateBlogs() {
  console.log("\nStarting migration for Blogs...");
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('id, title, image');

  if (error) {
    console.error("Error fetching blogs:", error);
    return;
  }

  console.log(`Found ${blogs.length} blogs to check.`);

  for (const blog of blogs) {
    if (blog.image && blog.image.startsWith('data:image')) {
      console.log(`Migrating Blog ID ${blog.id} ("${blog.title}")...`);
      const path = `blogs/migrated/blog-${blog.id}-${Date.now()}`;
      const publicUrl = await uploadToStorage(blog.image, path);
      if (publicUrl) {
        const { error: updateError } = await supabase
          .from('blogs')
          .update({ image: publicUrl })
          .eq('id', blog.id);

        if (updateError) {
          console.error(`  Failed to update Blog ID ${blog.id}:`, updateError.message);
        } else {
          console.log(`  Successfully migrated Blog ID ${blog.id}!`);
        }
      }
    } else {
      console.log(`Blog ID ${blog.id} already migrated or has no base64 image.`);
    }
  }
}

async function run() {
  try {
    await migrateProperties();
    await migrateBlogs();
    console.log("\nMigration completed successfully! 🎉");
  } catch (err) {
    console.error("Migration error:", err);
  }
}

run();
