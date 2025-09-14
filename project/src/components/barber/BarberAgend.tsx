export default function BarberAgenda() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Agenda de Hoy</h2>
      <div className="bg-white rounded-xl shadow p-4">
        <ul className="space-y-4">
          <li className="flex justify-between border-b pb-2">
            <span>10:00 AM - Juan Pérez (Corte Fade)</span>
            <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Marcar Completado
            </button>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>11:30 AM - Andrés López (Barba)</span>
            <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Marcar Completado
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
