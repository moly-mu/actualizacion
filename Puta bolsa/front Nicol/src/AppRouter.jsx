import React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./Components/User/LoginyRegister/LoginPage.jsx";
import LoginEmpresa from "./Components/Company/LoginyRegister/LoginEmpresa.jsx";
import RegisterPage from "./Components/User/LoginyRegister/RegisterPage.jsx"
import RegisterEmpresaPage from "./Components/Company/LoginyRegister/RegisterEmpresaPage.jsx";
import Main from "./Components/HomePage/Main.jsx";
import ProfilePage from "./Components/User/view/ProfilePage.jsx";
import ProfileEmpresa from "./Components/Company/View/ProfileEmpresa.jsx"; // Componente del perfil de la empresa

// Importamos los componentes que se usan
import Header from "./Components/Layout/Header.jsx";
import Footer from "./Components/Layout/Footer.jsx";
import ErrorPage from "./Components/Validations/ErrorPage.jsx"; // Importamos el componente de error

const AppRouter = ({ user, empresa, onLoginClick, onRegisterClick, onLogout, onLoginEmpresa, onRegisterEmpresa, onLogoutEmpresa }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Para obtener la ruta actual

  // Función para determinar el título de la sección según la ruta
  const getSectionTitle = () => {
    if (location.pathname === "/login") return "Sección Usuario";
    if (location.pathname === "/login-empresa") return "Sección Empresa";
    if (location.pathname === "/register") return "Registro Usuario";
    if (location.pathname === "/register-empresa") return "Registro Empresa";
  };

  return (
    <div className="font-sans">
      {/* Mostrar el Header en la página principal y en las rutas de login y registro */}
      {(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/login-empresa" || location.pathname === "/register" || location.pathname === "/register-empresa") && (
        <Header sectionTitle={getSectionTitle()} user={user} empresa={empresa} onLogout={onLogout} />
      )}

      {/* Contenido principal */}
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Main />} />

        {/* Ruta de Login para Usuario */}
        <Route
          path="/login"
          element={
            <LoginPage
              onLoginClick={(userData) => {
                onLoginClick(userData); // Manejar login de usuario
                navigate("/profile"); // Redirigir al perfil después de login
              }}
              onRegisterClick={() => navigate("/register")} // Ir a registro
            />
          }
        />

        {/* Ruta de Login para Empresa */}
        <Route
          path="/login-empresa"
          element={
            <LoginEmpresa
              onLoginEmpresa={onLoginEmpresa} // Pasamos la función de login de empresa
              onBack={() => navigate("/")} // Regresar a la página principal
            />
          }
        />

        {/* Ruta de Registro para Usuario */}
        <Route
          path="/register"
          element={
            <RegisterPage
              onRegister={(userData) => {
                onRegisterClick(userData); // Manejar registro de usuario
                navigate("/profile"); // Redirigir al perfil después de registro
              }}
              onLoginClick={() => navigate("/login")} // Ir a login
              onBack={() => navigate(-1)} // Regresar a la página anterior
            />
          }
        />

        {/* Ruta de Registro para Empresa */}
        <Route
          path="/register-empresa"
          element={
            <RegisterEmpresaPage
              onRegister={(empresaData) => {
                onRegisterEmpresa(empresaData); // Manejar registro de empresa
                navigate("/profile-empresa"); // Redirigir al perfil de empresa después de registro
              }}
              onLoginClick={() => navigate("/login-empresa")} // Ir a login de empresa
              onBack={() => navigate(-1)} // Regresar a la página anterior
            />
          }
        />

        {/* Ruta de Perfil para Usuario */}
        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage user={user} onLogout={onLogout} />
            ) : (
              <Navigate to="/" replace /> // Redirige a la página principal si no hay usuario
            )
          }
        />

        {/* Ruta de Perfil para Empresa */}
        <Route
          path="/profile-empresa"
          element={
            empresa ? (
              <ProfileEmpresa empresa={empresa} onLogoutEmpresa={onLogoutEmpresa} />
            ) : (
              <Navigate to="/" replace /> // Redirige a la página principal si no hay empresa
            )
          }
        />

        {/* Ruta para manejar 404 */}
        <Route
          path="*"
          element={<ErrorPage errorCode={404} errorMessage="La página que buscas no existe" />}
        />
      </Routes>

      {/* Mostrar el Footer solo en la página principal */}
      {location.pathname === "/" && <Footer />}
    </div>
  );
};

export default AppRouter;
