import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error('API key is not configured. Please set the API_KEY environment variable.');
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string[]> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        return response.generatedImages.map(img => img.image.imageBytes);
    } else {
        throw new Error('The API returned a successful response, but no images were found.');
    }

  } catch (error) {
    console.error('Error generating image with Gemini API:', error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the image.');
  }
};