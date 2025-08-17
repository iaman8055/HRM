import supabase from "../config/supabase.js";
export const uploadToSupabase = async (bucketName, fileName, fileBuffer, contentType) => {
  // Upload the file
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Error uploading to Supabase: ${uploadError.message}`);
  }

  // Get public URL
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  if (!data || !data.publicUrl) {
    throw new Error(`Failed to get public URL from bucket: ${bucketName}`);
  }

  return data.publicUrl;
};
