import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate de react-router-dom
import { AiOutlineArrowLeft } from "react-icons/ai"; // Para el ícono de la flecha
import Swal from "sweetalert2"; // Importamos SweetAlert2
import axios from 'axios'; // Importamos axios

const LoginForm = ({ onLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const navigate = useNavigate(); // Usamos useNavigate para navegar a diferentes rutas

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación: verifica si los campos están vacíos
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    const userData = { email, password };
    setError(""); // Resetea el mensaje de error

    // Realizar la solicitud POST al backend usando axios
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login/user', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Almacenar el token en localStorage
        localStorage.setItem('token', response.data.token);

        // Llamar al callback de login con los datos del usuario
        onLoginClick(response.data);

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Bienvenido a tu perfil.",
          confirmButtonText: "Ir a perfil",
          confirmButtonColor: "#10b981",
        }).then(() => {
          // Redirigir al perfil
          navigate("/profile");
        });
      } else {
        setError(response.data.message || "Error al iniciar sesión.");
        Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: response.data.message || "Error al iniciar sesión.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      setError("Hubo un error al iniciar sesión.");
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "Por favor, inténtelo de nuevo más tarde.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  const handleBackClick = () => {
    navigate("/"); // Esto redirige al usuario a la página principal
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg relative max-w-sm mx-auto">
      {/* Botón de regresar */}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mensaje de error */}
        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* Campo de email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu correo"
            className={`w-full border ${
              !email ? "border-red-100" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out`}
          />
        </div>

        {/* Campo de contraseña */}
        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
            className={`w-full border ${
              !password ? "border-red-100" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out`}
          />
        </div>

        {/* Link de "Olvidaste tu contraseña" */}
        <div className="text-right">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón para ingresar */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition duration-200"
        >
          INGRESAR
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
