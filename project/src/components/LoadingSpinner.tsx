import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'text-golden' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} ${color} animate-spin`}
        style={{
          background: `conic-gradient(transparent, transparent, transparent, currentColor)`,
          borderRadius: '50%',
          mask: 'radial-gradient(farthest-side,transparent calc(100% - 3px), #000 0)',
        }}
      />
    </div>
  );
};

export default LoadingSpinner;