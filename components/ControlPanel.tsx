import React from 'react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { Card } from './ui/Card';
import { AspectRatio } from '../services/geminiService';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (value: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (value: AspectRatio) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

const aspectRatios: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];

const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  isLoading,
  onGenerate,
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Generation Settings</h2>
        
        <Textarea
          label="Prompt"
          id="prompt"
          rows={5}
          placeholder="e.g., An astronaut riding a horse on Mars, cinematic lighting"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-5 gap-2">
            {aspectRatios.map(ratio => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${
                  aspectRatio === ratio
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
            <Button onClick={onGenerate} isLoading={isLoading} disabled={!prompt.trim() || isLoading}>
            Generate Image
            </Button>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;