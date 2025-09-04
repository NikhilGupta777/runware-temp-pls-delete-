
import React, { useState, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import ImageDisplay from './components/ImageDisplay';
import { generateImage } from './services/runwareService';
import { RunwareGenerationParams } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A majestic lion king on a throne, with a golden crown, highly detailed, photorealistic');
  const [negativePrompt, setNegativePrompt] = useState<string>('cartoon, painting, illustration, (worst quality, low quality, normal quality:2)');
  const [steps, setSteps] = useState<number>(25);
  const [guidance, setGuidance] = useState<number>(7);

  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [usage, setUsage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setUsage(null);

    const params: RunwareGenerationParams = {
      prompt,
      model: 'runware:101@1',
      negative_prompt: negativePrompt,
      width: 1024,
      height: 1024,
      num_images: 1,
      steps,
      guidance,
    };

    try {
      const response = await generateImage(params);
      if (response.data && response.data.length > 0) {
        const images = response.data.map(imgData => imgData.base64_json);
        setGeneratedImages(images);
        setUsage(response.usage.credits);
      } else {
        setError('The API returned a successful response, but no images were found.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, negativePrompt, steps, guidance, isLoading]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="text-indigo-400">Runware</span> AI Image Studio
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Turn your imagination into stunning visuals with the power of AI.
        </p>
      </header>
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ControlPanel
            prompt={prompt}
            setPrompt={setPrompt}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            steps={steps}
            setSteps={setSteps}
            guidance={guidance}
            setGuidance={setGuidance}
            isLoading={isLoading}
            onGenerate={handleGenerate}
          />
        </div>
        <div className="lg:col-span-2">
            <ImageDisplay
                images={generatedImages}
                isLoading={isLoading}
                error={error}
                usage={usage}
            />
        </div>
      </main>
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Powered by Runware AI. Created by a World-Class React Engineer.</p>
      </footer>
    </div>
  );
};

export default App;
