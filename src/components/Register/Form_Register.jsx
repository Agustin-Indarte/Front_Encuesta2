import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Form_Register.css'
import { Button } from "react-bootstrap";

function Form_Register() {
  const [data, setData] = useState({ 
    nombre: "", 
    apellido: "", 
    email: "", 
    respuestaEmail: "", 
    password: "", 
    confirmPassword: "" 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    const { nombre, apellido, email, password, confirmPassword, respuestaEmail } = data;

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !password || !confirmPassword || !respuestaEmail) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Obtener usuarios del localStorage
      const users = JSON.parse(localStorage.getItem('usuarios')) || [];
      const exists = users.find(u => u.email === data.email);
      if (exists) {
        toast.error("Ya existe un usuario con ese email");
        return;
      }

      const newUser = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: data.password,
        respuestaEmail: data.respuestaEmail,
      };

      users.push(newUser);
      localStorage.setItem('usuarios', JSON.stringify(users));

      toast.success("Registrado correctamente (guardado localmente)");

      // Mostrar todos los usuarios en consola
      console.log("Usuarios registrados:", users); /* BOORRAR DESPUES!!! MUCHO MUY IMPORTANTEEE */

      // Limpiar formulario
      setData({ 
        nombre: "", 
        apellido: "", 
        email: "", 
        respuestaEmail: "", 
        password: "", 
        confirmPassword: "" 
      });

      navigate("/login");
    } catch (err) {
      toast.error("Error al guardar el usuario");
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
        <div className="col-12 col-md-6">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="form-control"
            onChange={handleChange}
            value={data.nombre}
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            className="form-control"
            onChange={handleChange}
            value={data.apellido}
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

      <div className="mt-2 mb-3 ">
        <small>¿Quieres recibir notificaciones por email?</small>
        <div className="d-flex flex-column flex-md-row gap-2 mt-1">
          <label className="d-flex align-items-center">
            <input 
              type="radio" 
              name="respuestaEmail" 
              value="si" 
              className="me-2" 
              onChange={handleChange}
              checked={data.respuestaEmail === "si"}
            />
            Sí, me gustaría
          </label>
          <label className="d-flex align-items-center">
            <input 
              type="radio" 
              name="respuestaEmail" 
              value="no" 
              className="me-2" 
              onChange={handleChange}
              checked={data.respuestaEmail === "no"}
            />
            No, gracias
          </label>
        </div>
      </div>

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
