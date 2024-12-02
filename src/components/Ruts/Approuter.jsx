import { Routes, Route } from "react-router-dom";
import Insesion from "../Insesion";
import Reg from "../Reg";
import Busqueda from "../Busqueda";
import App from "../../App";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} /> 
     
      <Route path="/login" element={<Insesion />} />
      <Route path="/Reg" element={<Reg />} />
     
      <Route path="/Busqueda" element={<Busqueda />} />
     
      <Route path="*" element={<div>404: Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRouter;
