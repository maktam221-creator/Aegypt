import { cloudinaryConfig } from '../config';

/**
 * Mocks an image upload by returning a random placeholder image URL.
 * This function simulates a network delay and then provides a URL from picsum.photos.
 * This allows image upload functionality to work without a real Cloudinary account setup.
 * @param file The image file being "uploaded".
 * @returns A promise that resolves to a placeholder image URL.
 */
async function mockUploadImage(file: File): Promise<string> {
  console.log(`Simulating upload for: ${file.name}`);
  // Simulate a network delay of 1.5 seconds
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate a random seed to get a unique image from picsum.photos
  const seed = Date.now() + Math.random();
  const imageUrl = `https://picsum.photos/seed/${seed}/800/600`;
  
  console.log(`Mock upload complete. URL: ${imageUrl}`);
  return imageUrl;
}

// Configuration is now sourced from config.ts
const CLOUDINARY_CLOUD_NAME = cloudinaryConfig.cloudName;
const CLOUDINARY_UPLOAD_PRESET = cloudinaryConfig.uploadPreset;

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Uploads a file. Currently uses a mock function to simulate the upload.
 * To use a real Cloudinary account, replace the call to mockUploadImage with the
 * commented-out fetch logic below, and ensure your details in `config.ts` are correct.
 * @param file The image file to upload.
 * @returns The secure URL of the uploaded image.
 */
export async function uploadImage(file: File): Promise<string> {
  // Using mock function to avoid real API calls.
  return mockUploadImage(file);

  /*
  // --- Original Cloudinary implementation ---
  // To enable, remove the `return mockUploadImage(file);` line above and uncomment this block.
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Cloudinary API Error:', errorBody);
      throw new Error('فشل رفع الصورة. تأكد من إعدادات Cloudinary.');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // Re-throw the error so it can be caught and handled by the calling component.
    throw error;
  }
  */
}
