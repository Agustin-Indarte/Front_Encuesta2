import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";


function CorreoEnviado() {
  return (
    <div className="login-section">
      <div className="login-card p-4">
        <h2 className="login-title">¡Correo enviado!</h2>
        <p>
          Si tu correo está registrado, recibirás un enlace para restablecer tu
          contraseña.
        </p>
        <p>Revisa tu bandeja de entrada o tu carpeta de spam.</p>
          <Link to="/login" className="forgot-password-link mt-3 d-block">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}

export default CorreoEnviado;