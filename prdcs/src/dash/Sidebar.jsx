// src/components/Layout.jsx
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

const Sidebar = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/perfil" className="hover:text-gray-400">Mi perfil</Link>
          </li>
          <li className="mb-4">
            <Link to="/notificaciones" className='"hover:text-gray-400'>Notificaciones</Link>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Ofertas</a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 ml-64 bg-gray-100">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">Notifications</button>
            <button className="text-gray-600">User</button>
          </div>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
