import { Link } from "react-router-dom";

/**
 * @component NotFound
 * 
 * Página de error 404 que se muestra cuando una ruta no existe.
 * Proporciona un mensaje claro al usuario y un enlace para volver a la página de inicio.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Página no encontrada
      </h2>
      <p className="text-gray-500 mb-6">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      {/* Enlace para redirigir al usuario a la página de inicio */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}