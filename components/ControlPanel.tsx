
import React from 'react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { Slider } from './ui/Slider';
import { Card } from './ui/Card';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (value: string) => void;
  negativePrompt: string;
  setNegativePrompt: (value: string) => void;
  steps: number;
  setSteps: (value: number) => void;
  guidance: number;
  setGuidance: (value: number) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
  steps,
  setSteps,
  guidance,
  setGuidance,
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
        
        <Textarea
          label="Negative Prompt (Optional)"
          id="negative_prompt"
          rows={3}
          placeholder="e.g., blurry, low quality, cartoon, watermark"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        />
        
        <Slider
          label="Inference Steps"
          id="steps"
          min="10"
          max="50"
          step="1"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
        />
        
        <Slider
          label="Guidance Scale (CFG)"
          id="guidance"
          min="1"
          max="20"
          step="0.5"
          value={guidance}
          onChange={(e) => setGuidance(Number(e.target.value))}
        />
        
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
