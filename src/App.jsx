import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './index.css'
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Inicio, Login, Register, Admin_Encuestas, Admin_Home, User_Encuestas, User_Home, Error404,AdminRespuestas } from "./pages"


function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  return (
    
     
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />} />
          <Route path="/admin/encuestas" element={<Admin_Encuestas />} />
          <Route path="/admin/home" element={<Admin_Home />} />
          <Route path="/user/encuestas" element={<User_Encuestas />} />
          <Route path="/user/home" element={<User_Home />} />

          <Route path="/admin-respuestas" element={<AdminRespuestas />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
   
    
  );
}

export default App;