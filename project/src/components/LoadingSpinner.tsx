import React from 'react';

/**
 * @interface LoadingSpinnerProps
 * @property {'small' | 'medium' | 'large'} [size='medium'] - El tamaño del spinner.
 * @property {string} [color='text-golden'] - La clase de color de Tailwind CSS para el spinner.
 */
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

/**
 * @component LoadingSpinner
 * 
 * Un componente reutilizable para mostrar un indicador de carga (spinner).
 * Es personalizable en tamaño y color.
 * 
 * @param {LoadingSpinnerProps} props - Propiedades del componente.
 * @returns {React.FC}
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'text-golden' 
}) => {
  // Mapeo de tamaños a clases de Tailwind CSS
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} ${color} animate-spin`}
        // Estilos en línea para crear el efecto del spinner con un gradiente cónico y una máscara
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
