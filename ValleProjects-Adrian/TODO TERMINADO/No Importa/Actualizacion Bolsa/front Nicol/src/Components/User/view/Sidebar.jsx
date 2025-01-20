import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineFileSearch, AiOutlineBell, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import Swal from "sweetalert2";

const Sidebar = ({ onViewChange, onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterna la visibilidad del sidebar en móviles
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Cerrar sesión",
      text: "¿Estás seguro de que deseas cerrar sesión?",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Borra el token del localStorage
        if (onLogout) {
          onLogout(); // Maneja el cierre de sesión
        }
        Swal.fire({
          icon: "success",
          title: "Sesión cerrada",
          text: "Has cerrado sesión exitosamente.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#10b981",
        }).then(() => {
          navigate("/login"); // Redirige al login
        });
      }
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-gradient-to-r from-white to-pink-50 text-gray-800 p-4 flex flex-col justify-between fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out shadow-lg ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sección de logo y frase */}
        <div className="mb-6 flex flex-col items-center space-y-4">
          <h2
            className="text-3xl font-extrabold mb-2 cursor-pointer relative z-10 text-center"
          >
            <span className="text-yellow-500 inline-block transition-all duration-300 ease-in-out transform hover:scale-150 mx-1">U</span>
            <span className="text-blue-500 inline-block transition-all duration-300 ease-in-out transform hover:scale-150 mx-1">D</span>
            <span className="text-red-500 inline-block transition-all duration-300 ease-in-out transform hover:scale-150 mx-1">C</span>
            <span className="text-black text-xl"> TALENTO</span>
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Conectando talento con el mundo laboral
          </p>
        </div>

        {/* Menú de navegación */}
        <div className="space-y-4">
          <ul>
            <li>
              <button
                onClick={() => onViewChange("profile")}
                className="text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out p-2 rounded-lg w-full text-left flex items-center"
              >
                <AiOutlineUser size={20} className="mr-2" />
                Perfil
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("offers")}
                className="text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out p-2 rounded-lg w-full text-left flex items-center"
              >
                <AiOutlinePlus size={20} className="mr-2" />
                Ofertas
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("notifications")}
                className="text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out p-2 rounded-lg w-full text-left flex items-center"
              >
                <AiOutlineBell size={20} className="mr-2" />
                Notificaciones
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("resume")}
                className="text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out p-2 rounded-lg w-full text-left flex items-center"
              >
                <AiOutlineFileSearch size={20} className="mr-2" />
                Hoja de vida
              </button>
            </li>
          </ul>
        </div>

        {/* Cerrar sesión */}
        <div className="mt-auto bg-red-600 text-white p-2 rounded-lg text-center transition-transform duration-200 ease-in-out transform hover:scale-105">
          <button
            onClick={handleLogout}
            className="w-full py-2 font-medium text-sm flex items-center justify-center"
          >
            <AiOutlineLogout size={20} className="mr-2 inline" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Botón hamburguesa */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="text-black p-2 hover:text-white transition duration-300"
        >
          {isOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;