import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * @file main.tsx
 * 
 * Punto de entrada principal de la aplicación React.
 * Aquí es donde la aplicación se monta en el DOM.
 */

// Obtiene el elemento raíz del DOM donde se montará la aplicación.
const rootElement = document.getElementById('root')!;

// Crea la raíz de la aplicación utilizando la API moderna de React.
const root = createRoot(rootElement);

// Renderiza el componente principal `App` dentro de `StrictMode`.
// `StrictMode` ayuda a detectar problemas potenciales en la aplicación durante el desarrollo.
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);