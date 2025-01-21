import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate de react-router-dom
import { AiOutlineArrowLeft } from "react-icons/ai"; // Para el ícono de la flecha
import Swal from "sweetalert2"; // Importamos SweetAlert2

const LoginEmpresaForm = ({ onLoginEmpresa }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate(); // Usamos useNavigate para navegar a diferentes rutas

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    // Validación de correo
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, introduce un correo válido.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    setError(""); // Resetea el mensaje de error
    setLoading(true); // Inicia el proceso de carga

    // Datos del formulario para el login
    const loginData = {
      email,
      password,
    };

    try {
      // Realiza la solicitud de autenticación al backend
      const response = await fetch("http://localhost:5000/api/auth/login/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacenar el token JWT en localStorage
        localStorage.setItem("token", data.token);

        // Llamar a la función de callback pasada como prop para notificar que el login fue exitoso
        onLoginEmpresa(data);

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Bienvenido a tu perfil.",
          confirmButtonText: "Ir a perfil",
          confirmButtonColor: "#10b981",
        }).then(() => {
          navigate("/profile-empresa");
        });
      } else {
        setError(data.message || "Error al iniciar sesión.");
        Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: data.message || "Error al iniciar sesión.",
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
    } finally {
      setLoading(false); // Finaliza el proceso de carga
    }
  };

  const handleBackClick = () => {
    navigate("/"); // Esto redirige al usuario a la página principal
  };

  const handleGoogleLogin = () => {
    // Lógica para inicio de sesión con Google
    Swal.fire({
      icon: "info",
      title: "Google Login",
      text: "Funcionalidad de inicio de sesión con Google próximamente.",
      confirmButtonText: "Entendido",
    });
  };

  const handleRegisterRedirect = () => {
    navigate("/register-empresa"); // Redirige a la página de registro
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password-empresa"); // Redirige a la página de recuperación de contraseña
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
            className={`w-full border ${!email ? "border-red-100" : "border-gray-300"
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
            className={`w-full border ${!password ? "border-red-100" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out`}
          />
        </div>

        {/* Enlace de "¿Olvidaste tu contraseña?" */}
        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Botón para ingresar */}
        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition duration-200 ${loading && "opacity-50 cursor-not-allowed"
            }`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "INGRESAR"}
        </button>
      </form>
    </div>
  );
};

export default LoginEmpresaForm;