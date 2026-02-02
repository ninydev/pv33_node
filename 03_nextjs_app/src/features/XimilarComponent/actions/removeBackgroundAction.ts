'use server';

import { removeBackground } from '../api/ximilarApi';

export async function removeBackgroundAction(formData: FormData) {
  try {
    const file = formData.get('image') as File;
    if (!file) {
      return { error: 'No image provided' };
    }

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    
    // Ximilar API expects base64 string, sometimes with data prefix, 
    // but the curl example shows it might be just the base64 or with prefix.
    // The example in curl: "_base64": "data:image/jpeg;base64,/9j/..."
    const mimeType = file.type;
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    const result = await removeBackground(dataUrl);
    
    if (result.records && result.records.length > 0) {
      return { success: true, imageUrl: result.records[0]._output_url };
    }

    return { error: 'Failed to process image' };
  } catch (error: any) {
    console.error('Remove Background Error:', error);
    return { error: error.message || 'Something went wrong' };
  }
}
