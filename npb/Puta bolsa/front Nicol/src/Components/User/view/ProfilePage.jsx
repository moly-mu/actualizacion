import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileContent from "./ProfileContent";

const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("profile"); // Estado para manejar la vista actual

  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirige al usuario a la página principal después de cerrar sesión
  };

  const handleViewChange = (view) => {
    setCurrentView(view); // Cambia la vista cuando se hace clic en el menú
  };

  return (
    <div className="flex min-h-screen">
      {/* Barra lateral */}
      <Sidebar onViewChange={handleViewChange} onLogout={handleLogout} />
      <div className=""></div>
      {/* Contenido principal */}
      <ProfileContent currentView={currentView} user={user} onViewChange={handleViewChange} />
    </div>
  );
};

export default ProfilePage