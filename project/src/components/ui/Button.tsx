import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Define las variantes de estilo del botón usando class-variance-authority (CVA).
// Esto permite combinar clases de Tailwind de forma modular y reutilizable.
const buttonVariants = cva(
  // Clases base aplicadas a todos los botones
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      // Define los diferentes estilos visuales del botón
      variant: {
        default: "bg-black text-white hover:bg-gray-800",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      // Define los diferentes tamaños del botón
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    // Variantes por defecto si no se especifican
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * @interface ButtonProps
 * Extiende las propiedades de un botón HTML estándar y añade las variantes personalizadas.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/**
 * @component Button
 * 
 * Un componente de botón reutilizable con variantes de estilo y tamaño.
 * Utiliza `React.forwardRef` para permitir pasar una ref al elemento `button` subyacente.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        // `cn` fusiona las clases de Tailwind de forma segura, aplicando las variantes correctas.
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

// Exporta el componente y las variantes para su uso en otros lugares.
export { Button, buttonVariants };