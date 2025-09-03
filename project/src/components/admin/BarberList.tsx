// src/components/admin/BarberList.tsx
import React from "react";
import BarberDetails from "./BarberDetails";
import type { Barber } from "../../types";

interface BarberListProps {
  barbers: Barber[];
  onEdit: (barber: Barber) => void;
}

const BarberList: React.FC<BarberListProps> = ({ barbers, onEdit }) => {
  if (barbers.length === 0) {
    return <p className="text-gray-500">No hay barberos registrados.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {barbers.map((barber) => (
        <BarberDetails
          key={barber.id}
          barber={barber}
          isAdmin
          onEdit={() => onEdit(barber)}
          onDelete={(id) => {
            // luego podemos conectar esto al contexto para eliminar
            console.log("Eliminar barber con id:", id);
          }}
        />
      ))}
    </div>
  );
};

export default BarberList;
