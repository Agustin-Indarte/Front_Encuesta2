import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import "./Login.css";

const API = "http://localhost:4000/api/v1"

function Resetear() {
    const [params] = useSearchParams();
    const [error, setError] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
 // const { token } = useParams();
  const navigate = useNavigate();

   const token = params.get("token");

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setTipoMensaje("error");
      return;
    }
    if (password !== confirmar) {
      setMensaje("Las contraseñas no coinciden.");
      setTipoMensaje("error");
      return;
    }

    const res = await fetch(`${API}/reset-password/${token}`, {
      method: "POST", 
      headers: {"Content-type" : "Application/json"},
      body:JSON.stringify({newPassword:password})
    })

    const data = await res.json();

    if(res.ok) {
      setMensaje(data.message || "Contraseña Actualizada!!! ")
      setTipoMensaje("exito");
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } else {
      setError(data.message || "Error al actualizar la contraseña")
    }


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
              minLength={6}
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
              minLength={6}
              placeholder="Confirma tu nueva contraseña"
            />
          </div>
          <button type="submit" className="login-button">
            Guardar cambios
          </button>
           {mensaje && <p className="text-green-600 mt-3">{mensaje}</p>}
           {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>
       
      </div>
    </div>
  );
}

export default Resetear;