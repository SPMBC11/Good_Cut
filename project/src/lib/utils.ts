import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @function cn
 * 
 * Una función de utilidad para construir cadenas de clases de Tailwind CSS de forma condicional y segura.
 * Combina `clsx` para la lógica condicional y `tailwind-merge` para resolver conflictos de clases de Tailwind.
 * 
 * @param {...any[]} inputs - Una lista de cadenas de clases, objetos o arrays.
 * @returns {string} Una cadena de clases CSS optimizada.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}