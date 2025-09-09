import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * @component Card
 * 
 * Contenedor principal para una tarjeta. Proporciona el estilo base como el fondo, borde y sombra.
 * @param {React.ReactNode} children - Contenido de la tarjeta.
 * @param {string} [className] - Clases CSS adicionales para personalizar el contenedor.
 */
export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("bg-white border rounded-xl p-4 shadow-sm", className)}>
      {children}
    </div>
  );
};

/**
 * @component CardHeader
 * 
 * Contenedor para la cabecera de una tarjeta. Generalmente contiene el título.
 * @param {React.ReactNode} children - Contenido de la cabecera.
 * @param {string} [className] - Clases CSS adicionales.
 */
export const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("mb-2", className)}>{children}</div>
);

/**
 * @component CardTitle
 * 
 * Componente para el título de una tarjeta. Debe usarse dentro de `CardHeader`.
 * @param {React.ReactNode} children - El texto del título.
 * @param {string} [className] - Clases CSS adicionales.
 */
export const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
);

/**
 * @component CardContent
 * 
 * Contenedor para el contenido principal de una tarjeta.
 * @param {React.ReactNode} children - El contenido principal.
 * @param {string} [className] - Clases CSS adicionales.
 */
export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("", className)}>{children}</div>;