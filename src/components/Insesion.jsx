import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";  

const Insesion = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const testUser = {
    email: "prueba@udt.com",
    password: "123456",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === testUser.email && password === testUser.password) {
      alert("Inicio de sesión exitoso");
      navigate("/Busqueda");
      onClose();
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-100">
      <Navbar showAuthButtons={false} /> 

      <main className="flex-grow container mx-auto flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/src/assets/Global Location 1.png"
              alt="Ilustración"
              className="w-4/5 max-h-96"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Iniciar sesión
            </h2>
            {error && (
              <p className="text-red-500 text-center text-sm mb-4">{error}</p>
            )}
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <img
                    src="/src/assets/user (2) 1.png"
                    alt="Ícono de correo"
                    className="h-5 w-5"
                  />
                </span>
                <input
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg pl-10 py-3 text-lg w-full"
                  required
                />
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <img
                    src="/src/assets/padlock (4) 1.png"
                    alt="Ícono de contraseña"
                    className="h-5 w-5"
                  />
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-lg pl-10 py-3 text-lg w-full"
                  required
                />
              </div>

              <a
                href="#"
                className="text-sl text-[#7891F8] hover:underline self-end"
              >
                ¿Olvidaste tu contraseña?
              </a>
              <button
                type="submit"
                className="bg-[#00102D] text-white py-3 px-6 text-lg rounded hover:bg-[#00102dd8] w-full hover:text-white font-bold"
              >
                Ingresar
              </button>

              <div className="flex justify-center mt-6">
                <button className="border border-gray-300 py-3 px-6 rounded hover:bg-gray-100  w-full flex items-center justify-center">
                  <img
                    src="/src/assets/google 2.png"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  <span className="ml-2 text-lg">Continuar con Google</span>
                </button>
              </div>

              <p className="text-center text-sl">
                ¿No tienes cuenta?{" "}
                <Link to="/Reg" className="text-[#7891F8] hover:underline">
                  Regístrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

Insesion.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Insesion;
