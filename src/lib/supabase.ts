import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase client singleton
let supabaseInstance: SupabaseClient | undefined;

export const supabase: SupabaseClient = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabaseInstance;
})();



/**
 * Upload an image (or any file) to Supabase Storage.
 * Returns the public URL of the uploaded file.
 */
export async function uploadImage(
  file: File,
  bucket: string = 'property-images',
  path: string = ''
): Promise<string | null> {
  const fileName = `${path}${file.name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: true, cacheControl: '3600', contentType: file.type });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  // Build public URL
  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return publicData?.publicUrl ?? null;
}
