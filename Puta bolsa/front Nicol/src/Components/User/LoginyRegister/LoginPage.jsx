import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai"; // Para la flecha
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import LoginForm from "./LoginForm"; // Asegúrate de tener el formulario de login

const LoginPage = ({ onLoginClick }) => {
  const navigate = useNavigate(); // Hook para navegar

  const handleBackClick = () => {
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-r from-blue-50 to-blue-100 pb-12">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
        {/* Imagen lateral */}
        <div className="hidden md:block md:w-1/2 relative" style={{ height: "32rem" }}>
          <img
            src="/usuario.jpeg" // Cambia esta ruta con la imagen que quieras mostrar
            alt="Login"
            className="h-full w-full object-cover rounded-l-2xl transform transition-transform duration-300 ease-in-out hover:scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-l-2xl"></div> {/* Fondo oscuro para mejorar el contraste */}
        </div>

        {/* Contenido principal */}
        <div className="relative w-full md:w-1/2 p-8">
          {/* Botón de regresar */}
          <button
            onClick={handleBackClick}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition duration-300"
          >
            <AiOutlineArrowLeft size={24} />
          </button>

          {/* Título de la página */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h2>

          {/* Formulario de login */}
          <LoginForm onLoginClick={onLoginClick} />

          {/* Enlace para ir al registro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Aún no tienes cuenta?{" "}
              <button
                onClick={() => navigate("/register")} // Navega a la página de registro
                className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200 ease-in-out"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
