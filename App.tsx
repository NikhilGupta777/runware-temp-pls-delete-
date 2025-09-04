import React, { useState, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import ImageDisplay from './components/ImageDisplay';
import { generateImage, AspectRatio } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A majestic lion king on a throne, with a golden crown, highly detailed, photorealistic');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateImage(prompt, aspectRatio);
      setGeneratedImages(images);
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
  }, [prompt, aspectRatio, isLoading]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="text-indigo-400">Gemini</span> AI Image Studio
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Turn your imagination into stunning visuals with the power of Google's Gemini.
        </p>
      </header>
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ControlPanel
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            isLoading={isLoading}
            onGenerate={handleGenerate}
          />
        </div>
        <div className="lg:col-span-2">
            <ImageDisplay
                images={generatedImages}
                isLoading={isLoading}
                error={error}
            />
        </div>
      </main>
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Created by a World-Class React Engineer.</p>
      </footer>
    </div>
  );
};

export default App;