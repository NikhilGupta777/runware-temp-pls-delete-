import React from 'react';
import { Card } from './ui/Card';
import { Spinner } from './ui/Spinner';

interface ImageDisplayProps {
  images: string[];
  isLoading: boolean;
  error: string | null;
}

const WelcomeMessage: React.FC = () => (
  <div className="text-center p-8">
    <h2 className="text-2xl font-bold mb-2 text-white">AI Image Generator</h2>
    <p className="text-gray-400">
      Describe what you want to see in the prompt box on the left, adjust the settings, and click "Generate" to create your image.
    </p>
  </div>
);

const LoadingState: React.FC = () => (
    <div className="text-center p-8">
        <div className="flex justify-center items-center mb-4">
            <Spinner />
        </div>
        <h2 className="text-xl font-semibold text-white">Generating your masterpiece...</h2>
        <p className="text-gray-400">The AI is thinking. This might take a moment.</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg">
    <h2 className="text-xl font-bold text-red-400 mb-2">Generation Failed</h2>
    <p className="text-red-300">An error occurred while generating the image.</p>
    <pre className="mt-4 text-xs text-left bg-gray-900 p-2 rounded text-red-300 overflow-x-auto">
        <code>{message}</code>
    </pre>
  </div>
);

const ImageGrid: React.FC<{ images: string[] }> = ({ images }) => (
    <div>
        <div className="grid grid-cols-1 gap-4 p-4">
            {images.map((base64, index) => (
            <div key={index} className="relative group">
                <img
                    src={`data:image/jpeg;base64,${base64}`}
                    alt={`Generated art ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <a 
                    href={`data:image/jpeg;base64,${base64}`} 
                    download={`generated_image_${index + 1}.jpeg`}
                    className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                    title="Download Image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
            </div>
            ))}
        </div>
    </div>
);

const ImageDisplay: React.FC<ImageDisplayProps> = ({ images, isLoading, error }) => {
  return (
    <Card className="flex items-center justify-center min-h-full p-4 bg-gray-800/50">
      {isLoading && <LoadingState />}
      {!isLoading && error && <ErrorDisplay message={error} />}
      {!isLoading && !error && images.length > 0 && <ImageGrid images={images} />}
      {!isLoading && !error && images.length === 0 && <WelcomeMessage />}
    </Card>
  );
};

export default ImageDisplay;