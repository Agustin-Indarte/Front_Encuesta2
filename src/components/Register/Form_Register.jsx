import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Form_Register.css'
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

function Form_Register() {
  const [data, setData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const {register} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    const { username, email, password, confirmPassword } = data;

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Todos los campos son obligatorios");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("El email no es válido");
      return false;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        username: data.username,
        email: data.email,
        password: data.password
      });
      toast.success("Registrado correctamente. Revisa tu email 📨");
      setData({ username: "", email: "", password: "", confirmPassword: "" });
      navigate("/login");
    } catch (err) {
      const messages = err.response?.data?.error;
      console.log(err);
      if(Array.isArray(messages)){
        messages.forEach((msg) => toast.error(msg))
      } else {
        toast.error(messages || "Error al registrarse")
      }
    }
  }

  return (
  <div className="ContainerFormRegister  d-flex flex-column align-items-center justify-content-center">
    <img src="/img/Logo_Azul.png" alt="Logo Azul" className="mb-4 " style={{ maxWidth: "400px", width: "50%" }} />
    <h4 className='fs-5 text-white mb-4 text-center'>
      ¿Ya tienes una cuenta? <Link to="/login" className="fs2">Inicia Sesión</Link>
    </h4> 

    <form 
      onSubmit={handleSubmit} 
      className="form w-25 w-md-75 w-lg-50 w-xl-25 mx-auto d-flex flex-column rounded-3 p-3"
    >
      <h2 className="fs-5 mb-4 text-start">Regístrate Gratis</h2>

      <div className="row g-2 mb-2">
        <div className="col-12">
          <input
            type="text"
            name="username"
            placeholder="Nombre de Usuario"
            className="form-control"
            onChange={handleChange}
            value={data.username}
          />
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-12 col-md-6">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="form-control"
            onChange={handleChange}
            value={data.password}
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar"
            className="form-control"
            onChange={handleChange}
            value={data.confirmPassword}
          />
        </div>
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-control mb-2"
        onChange={handleChange}
        value={data.email}
      />

      <Button
        type="submit"
        className="w-100 mt-2  p-2 rounded mb-3 Btn-Registro"
      >
        Registrarse
      </Button>
    </form>

    <p className="text-center text-sm mb-0 mt-4 fs-5">
        <Link to="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </p>
  </div>
);

}

export default Form_Register;
