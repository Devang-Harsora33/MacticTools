import { getStorage } from "firebase-admin/storage";
import { app } from "@/lib/firebase";

export const setCacheControl = async (filePath: string) => {
  const storage = getStorage(app);
  const bucket = storage.bucket();
  const file = bucket.file(filePath);

  await file.setMetadata({
    cacheControl: 'public, max-age=31536000', // Cache for 1 year
  });
};

// Use this function after uploading an image
export const uploadImageWithCache = async (file: File, path: string) => {
  const storage = getStorage(app);
  const bucket = storage.bucket();
  const fileRef = bucket.file(path);

  // Upload the file
  const buffer = await file.arrayBuffer();
  await fileRef.save(new Uint8Array(buffer), {
    metadata: {
      contentType: file.type,
      cacheControl: 'public, max-age=31536000', // Cache for 1 year
    },
  });

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media`;
}; 