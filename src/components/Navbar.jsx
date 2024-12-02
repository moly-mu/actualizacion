import React from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Navbar = () => {

  React.useEffect(() => {
    gsap.fromTo(
      ".navbar",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <div className="navbar bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center justify-center flex-1">
        <Link to="/">
          <img
            src="/src/assets/Captura de pantalla 2024-11-18 045933.png"
            alt="Logo"
            className="w-32 h-auto"
          />
        </Link>
      </div>

      <div className="flex items-center gap-8 justify-center flex-1">
       
        <Link to="/Reg">
          <button
            className="text-sm font-medium text-gray-700 hover:text-blue-500 transition"
          >
            Registrarme
          </button>
        </Link>

        
        <Link to="/login">
          <button
            className="px-4 py-2 bg-[#00102D] text-white rounded-lg hover:bg-[#00102dd8]"
          >
            Iniciar sesión
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
