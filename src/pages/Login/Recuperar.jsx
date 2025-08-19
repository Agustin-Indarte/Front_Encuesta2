import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Recuperar() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simulando envío de correo a:", email);
    setTimeout(() => {
      navigate("/correo-enviado");
    }, 1000);
  };

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
        </form>
      </div>
    </div>
  );
}

export default Recuperar;