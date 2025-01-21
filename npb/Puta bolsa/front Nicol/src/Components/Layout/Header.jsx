import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';


const Header = ({ sectionTitle}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú

  return (
    <>
      <header className="bg-white shadow-md py-4 px-6 rounded-b-xl font-poppins">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logotipo y eslogan */}
          <div className="flex flex-col items-center">
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-4xl font-extrabold text-yellow-500 transform transition-transform hover:scale-125">
                U
              </span>
              <span className="text-4xl font-extrabold text-blue-500 transform transition-transform hover:scale-125">
                D
              </span>
              <span className="text-4xl font-extrabold text-red-500 transform transition-transform hover:scale-125">
                C
              </span>
              <span className="ml-2 text-4xl font-bold text-gray-800 tracking-wide">
                TALENTO
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center italic">
              Conectando Talento con el mundo laboral
            </p>
          </div>

          {/* Sección título */}
          <div className="text-center hidden md:block">
            <p className="text-xl font-medium text-gray-800 tracking-wide">
              {sectionTitle}
            </p>
          </div>

          {/* Botón hamburguesa para vistas móviles */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex space-x-8 text-lg">
            <button
              onClick={() => navigate("/login-empresa")}
              className="text-gray-800 hover:bg-gray-100 px-5 py-2 rounded-md transition duration-200 transform hover:scale-105 font-semibold tracking-wide"
            >
              Soy Empresa
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-800 hover:bg-gray-100 px-5 py-2 rounded-md transition duration-200 transform hover:scale-105 font-semibold tracking-wide"
            >
              Soy Usuario
            </button>
          </nav>
        </div>

        {/* Menú desplegable para móviles */}
        {menuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-2 text-lg">
              <button
                onClick={() => {
                  navigate("/login-empresa");
                  setMenuOpen(false);
                }}
                className="text-gray-800 hover:bg-gray-100 px-5 py-2 rounded-md transition duration-200 font-semibold"
              >
                Soy Empresa
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="text-gray-800 hover:bg-gray-100 px-5 py-2 rounded-md transition duration-200 font-semibold"
              >
                Soy Usuario
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Divisor visual entre Header y contenido */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-gray-300 to-transparent"></div>
      </div>
    </>
  );
};

Header.propTypes = {
  sectionTitle: PropTypes.string.isRequired, // Se espera que sea una cadena y es obligatorio
};

export default Header;
