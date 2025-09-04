
export interface RunwareGenerationParams {
  prompt: string;
  model: string;
  negative_prompt?: string;
  width: number;
  height: number;
  num_images: number;
  steps: number;
  guidance: number;
}

export interface ImageData {
  base64_json: string;
  seed: number;
}

export interface UsageData {
    credits: number;
}

export interface RunwareGenerationResponse {
  data: ImageData[];
  usage: UsageData;
}
