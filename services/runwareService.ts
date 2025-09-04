
import { RunwareGenerationParams, RunwareGenerationResponse } from '../types';

const API_URL = 'https://api.runware.ai/v1/images/generations';

export const generateImage = async (params: RunwareGenerationParams): Promise<RunwareGenerationResponse> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error('API key is not configured. Please set the API_KEY environment variable.');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('API Error Response:', errorBody);
    throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
  }

  return response.json();
};
