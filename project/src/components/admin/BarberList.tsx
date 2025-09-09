// src/components/admin/BarberList.tsx
import React, { useRef } from "react";
import { useBarbers } from "../../context/BarberContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BarberDetails from "./BarberDetails";
import type { Barber } from "../../types";

/**
 * @interface BarberListProps
 * @property {Barber[]} barbers - La lista de barberos a mostrar.
 * @property {(barber: Barber) => void} onEdit - Callback que se ejecuta al hacer clic en el botón de editar de un barbero.
 */
interface BarberListProps {
  barbers: Barber[];
  onEdit: (barber: Barber) => void;
}

/**
 * @component BarberList
 * 
 * Muestra una lista horizontal de barberos con controles de desplazamiento.
 * Utiliza el componente `BarberDetails` para mostrar cada barbero en modo administrador.
 * 
 * @param {BarberListProps} props - Propiedades del componente.
 * @returns {React.FC}
 */
const BarberList: React.FC<BarberListProps> = ({ barbers, onEdit }) => {
  // Hook para acceder a la función de eliminar barbero del contexto
  const { deleteBarber } = useBarbers();
  // Ref para el contenedor de la lista para controlar el scroll
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Desplaza la lista de barberos horizontalmente.
   * @param {"left" | "right"} direction - La dirección del desplazamiento.
   */
  const scrollByAmount = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9; // Desplaza el 90% del ancho visible
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Si no hay barberos, muestra un mensaje
  if (barbers.length === 0) {
    return <p className="text-gray-500">No hay barberos registrados.</p>;
  }

  return (
    <div className="relative">
      {/* Botón de desplazamiento a la izquierda */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="p-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      {/* Botón de desplazamiento a la derecha */}
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="p-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Contenedor de la lista de barberos */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "thin" }}
      >
        {barbers.map((barber) => (
          <div key={barber.id} className="snap-start shrink-0 w-[280px] sm:w-[320px]">
            <BarberDetails
              barber={barber}
              isAdmin // Pasa el flag de administrador
              onEdit={() => onEdit(barber)}
              onDelete={(id) => {
                // Pide confirmación antes de eliminar
                if (window.confirm("¿Estás seguro de eliminar este barbero?")) {
                  deleteBarber(id);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarberList;
