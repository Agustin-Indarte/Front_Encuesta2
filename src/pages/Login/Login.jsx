import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {toast} from "react-hot-toast";

const Login = () => {
 
  const {login} = useAuth();
  const navigate = useNavigate()

  const [form, setForm] = useState({email: "", password:""});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
  setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        if (form.email === "admin@gmail.com" && form.password === "12345678") {
        navigate("/admin/home");
      }else{
          await login(form);
          navigate("/user/home")
      }
    } catch (err) {    
      const messages = err.response?.data?.err;
      // Mostrar mensaje detallado si existe, si no usar el manejo por defecto más abajo
      if (!messages) {
        const serverMsg = err.response?.data?.message || err.message || "Error al iniciar sesión";
        toast.error(serverMsg);
      }
      if(Array.isArray(messages)){
        messages.forEach((msg) => toast.error(msg))
      } else {
        toast.error(messages || "Error al iniciar sesión")
      }
    }
  };



  return (
    <div className="ContainerFormRegister  d-flex flex-column align-items-center justify-content-center">
      <img
        src="/img/Logo_Azul.png"
        alt="Logo Azul"
        className="mb-4 "
        style={{ maxWidth: "400px", width: "50%" }}
      />
      <h4 className="fs-5 text-white mb-4 text-center">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="fs2">
          Registrate
        </Link>
      </h4>
      
      <div className="d-flex flex-column  justify-content-center align-items-center p-4">
          <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded w-100" style={{ maxWidth: "400px" }}>
            <h2 className="h5 fw-bold mb-4 text-center">Iniciar sesión</h2>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Entrar
            </button>

            <div className="text-center small">
              <p className="mb-2">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-primary text-decoration-none">
                  Regístrate
                </Link>
              </p>
              <p>
                <Link to="/recuperar" className="text-primary text-decoration-none">
                  ¿Olvidaste tu contraseña?
                </Link>
              </p>
            </div>
          </form>
        </div>


      <p className="text-center text-sm mb-0 mt-4">
        <Link to="/" className="text-blue-600 hover:underline fs-5">
          Volver al inicio
        </Link>
      </p>
    </div>
  );
};

export default Login;
