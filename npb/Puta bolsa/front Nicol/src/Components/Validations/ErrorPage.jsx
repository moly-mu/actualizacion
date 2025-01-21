import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode, errorMessage }) => {
  let displayMessage = '';

  switch (errorCode) {
    case 404:
      displayMessage = 'Oops! La página no fue encontrada';
      break;
    case 500:
      displayMessage = '¡Ups! Algo salió mal en el servidor.';
      break;
    default:
      displayMessage = errorMessage || 'Algo inesperado sucedió.';
      break;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full">
        {/* Logotipo o imagen */}
        <div className="mb-6">
          <img
            src="/logo.png" // Ruta de tu logotipo
            alt="Logo"
            className="mx-auto h-24 w-auto"
          />
        </div>
        
        <h1 className="text-6xl font-extrabold text-red-600">{errorCode}</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">{displayMessage}</h2>
        <p className="text-gray-600 mt-2 text-lg">Parece que hubo un error. Intenta nuevamente más tarde.</p>
        
        <div className="mt-6">
          <Link
            to="/"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Volver al inicio
          </Link>
        </div>
        
        {/* Añadir mensaje secundario opcional */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">Si el problema persiste, contacta con el soporte técnico.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
