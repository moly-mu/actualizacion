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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-extrabold text-red-500">{errorCode}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">{displayMessage}</h2>
        <p className="text-gray-600 mt-2">Parece que hubo un error. Intenta nuevamente más tarde.</p>
        
        <div className="mt-6">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
