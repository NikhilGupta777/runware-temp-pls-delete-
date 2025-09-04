
import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number;
}

export const Slider: React.FC<SliderProps> = ({ label, value, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id || props.name} className="flex justify-between text-sm font-medium text-gray-400 mb-1">
        <span>{label}</span>
        <span className="text-indigo-400 font-semibold">{value}</span>
      </label>
      <input
        type="range"
        value={value}
        {...props}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
      />
    </div>
  );
};
