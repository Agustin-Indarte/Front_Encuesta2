import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './index.css'
import { Routes, Route } from "react-router-dom";
import { Inicio, Login, Register, Admin_Encuestas, Admin_Home, User_Encuestas, User_Home, Error404 } from "./pages"
import { EncuestasProvider } from './context/EncuestasContext';  // Importa el proveedor correcto

function App() {
  return (
    
      <EncuestasProvider>  {/* Usa EncuestasProvider aquí */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/encuestas" element={<Admin_Encuestas />} />
          <Route path="/admin/home" element={<Admin_Home />} />
          <Route path="/user/encuestas" element={<User_Encuestas />} />
          <Route path="/user/home" element={<User_Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </EncuestasProvider>
    
  );
}

export default App;