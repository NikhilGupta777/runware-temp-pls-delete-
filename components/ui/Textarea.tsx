
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
      />
    </div>
  );
};
