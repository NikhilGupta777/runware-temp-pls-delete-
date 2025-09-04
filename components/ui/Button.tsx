
import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading = false, ...props }) => {
  return (
    <button
      {...props}
      disabled={props.disabled || isLoading}
      className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};
