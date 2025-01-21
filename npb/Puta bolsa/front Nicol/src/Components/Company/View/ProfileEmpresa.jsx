import React, { useState } from "react";
import SidebarEmpresa from "./SidebarEmpresa";
import ProfileContentEmpresa from "./ProfileContentEmpresa";
import { Navigate } from "react-router-dom";

const ProfileEmpresa = ({ empresa, onLogout }) => {
  const [currentView, setCurrentView] = useState("perfilEmpresa");

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  if (!empresa) {
    return <Navigate to="/login-empresa" replace />;
  }

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <SidebarEmpresa onViewChange={handleViewChange} onLogout={onLogout} />

      {/* Contenido principal */}
      <div className="flex-1">
        <ProfileContentEmpresa currentView={currentView} empresa={empresa} />
      </div>
    </div>
  );
};

export default ProfileEmpresa;
