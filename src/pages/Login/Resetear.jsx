import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Login.css";


function Resetear() {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMensaje("La contraseña debe tener al menos 8 caracteres.");
      setTipoMensaje("error");
      return;
    }
    if (password !== confirmar) {
      setMensaje("Las contraseñas no coinciden.");
      setTipoMensaje("error");
      return;
    }

    console.log("Token recibido:", token);
    console.log("Nueva contraseña:", password);

    setMensaje("¡Contraseña restablecida con éxito!");
    setTipoMensaje("exito");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="login-section">
      <div className="login-card p-4">
        <h2 className="login-title">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Contraseña nueva</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Ingresa tu nueva contraseña"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-input"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
              minLength={8}
              placeholder="Confirma tu nueva contraseña"
            />
          </div>
          <button type="submit" className="login-button">
            Guardar cambios
          </button>
        </form>
        {mensaje && (
          <p
            className={`mt-3 ${
              tipoMensaje === "error" ? "text-danger" : "text-success"
            }`}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}

export default Resetear;