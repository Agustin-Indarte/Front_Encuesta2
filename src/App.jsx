import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  Login,
  Register,
  Admin_Encuestas,
  Admin_Home,
  User_Encuestas,
  User_Home,
  Error404, 
  AdminRespuestas,
  Recuperar,
  Resetear,
  VerifyEmail,
} from "./pages";



function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/admin/encuestas" element={<Admin_Encuestas />} />
      <Route path="/admin/home" element={<Admin_Home />} />
      <Route path="/user/encuestas" element={<User_Encuestas />} />
      <Route path="/user/home" element={<User_Home />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
      <Route path="/reset-password" element={<Resetear />} />

      <Route path="/admin-respuestas" element={<AdminRespuestas />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;