import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './dash/Sidebar';
import Profile from './dash/Profile'; // Ruta a tu componente de perfil
import Notifications from './dash/Notifications'; // Crea este componente

const App = () => {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/perfil" element={<Profile />} />
          <Route path="/notificaciones" element={<Notifications />} />
          <Route path="/ofertas" element={<div>Ofertas en construcción</div>} />
        </Routes>
      </Sidebar>
    </Router>
  );
};

export default App;
