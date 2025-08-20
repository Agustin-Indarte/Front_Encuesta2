import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:4000/api/v1"

function Recuperar() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null);
    setError(null);

    const res = await fetch(`${API}/request-password-reset`, {
      method: "POST", 
      headers: {"Content-type" : "Application/json"},
      body:JSON.stringify({email})
    })

    const data = await res.json();

    if(res.ok) {
      setMessage(data.message || "Email enviado!")
    } else {
      setError(data.message || "Error :(")
    }
    };
  /* const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simulando envío de correo a:", email);
    setTimeout(() => {
      navigate("/correo-enviado");
    }, 1000);
  }; */

  return (
    <div className="login-section">
      <div className="login-card p-4">
        <h2 className="login-title">Recuperar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Enviar enlace
          </button>
           {message && <p className="text-success mt-3 text-center fw-bold">{message}</p>}
            {error && <p className="text-red mt-3">{error}</p>}
        </form>
         <p className="text-center text-sm mb-0 mt-4">
            <Link to="/" className="text-blue-600 hover:underline fs-5">
              Volver al inicio
            </Link>
          </p>
      </div>
    </div>
  );
}

export default Recuperar;