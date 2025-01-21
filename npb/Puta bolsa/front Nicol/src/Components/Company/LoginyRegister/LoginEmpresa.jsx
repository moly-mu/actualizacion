
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PropTypes from "prop-types";
import LoginEmpresaForm from "./LoginEmpresaForm";

const LoginEmpresa = ({ onBack, onLoginEmpresa }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    onBack ? onBack() : navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-r from-blue-50 to-blue-100 pb-12">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-5xl">
        {/* Imagen lateral con 1/2 de ancho */}
        <div className="hidden md:block md:w-1/2 relative" style={{ height: "32rem"}}>
          <img
            src="/empresa.webp" // Ruta a la imagen dentro de la carpeta public
            alt="Imagen empresa"
            className="h-full w-full object-cover rounded-l-2xl transform transition-transform duration-300 ease-in-out hover:scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-l-2xl"></div> {/* Fondo oscuro para mejorar el contraste */}
        </div>

        {/* Contenido principal ajustado a 1/2 */}
        <div className="relative w-full md:w-1/2 p-8">
          {/* Botón de regresar */}
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition duration-300"
          >
            <AiOutlineArrowLeft size={24} />
          </button>

          {/* Título */}
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Iniciar Sesión
          </h2>

          {/* Formulario de login */}
          <LoginEmpresaForm onLoginEmpresa={onLoginEmpresa} />

          {/* Enlace para registro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Aún no tienes cuenta?{" "}
              <button
                onClick={() => navigate("/register-empresa")}
                className="text-blue-500 hover:text-blue-700 hover:underline transition duration-200"
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

LoginEmpresa.propTypes = {
  onBack: PropTypes.func,
  onLoginEmpresa: PropTypes.func.isRequired,
};

export default LoginEmpresa;
