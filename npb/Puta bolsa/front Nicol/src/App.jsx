import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter.jsx"; // Importamos AppRouter

const App = () => {
  const [user, setUser] = useState(null); // Información del usuario
  const [empresa, setEmpresa] = useState(null); // Información de la empresa

  // Función para manejar el inicio de sesión de usuario
  const handleLogin = (userData) => {
    setUser(userData); // Guardar la información del usuario en el estado
  };

  // Función para manejar el cierre de sesión de usuario
  const handleLogout = () => {
    setUser(null); // Limpiar la información del usuario en el estado
  };

  // Función para manejar el inicio de sesión de empresa
  const handleLoginEmpresa = (empresaData) => {
    setEmpresa(empresaData); // Guardar la información de la empresa en el estado
  };

  // Función para manejar el cierre de sesión de empresa
  const handleLogoutEmpresa = () => {
    setEmpresa(null); // Limpiar la información de la empresa en el estado
  };

  return (
    <Router>
      <AppRouter
        user={user} // Información del usuario
        empresa={empresa} // Información de la empresa
        onLoginClick={handleLogin} // Función de login para usuario
        onLogout={handleLogout} // Función de logout para usuario
        onLoginEmpresa={handleLoginEmpresa} // Función de login para empresa
        onLogoutEmpresa={handleLogoutEmpresa} // Función de logout para empresa
      />
    </Router>
  );
};

export default App;
