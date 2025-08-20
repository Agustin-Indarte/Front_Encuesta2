import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1 className="error-title">
        ¡Oops! Parece que esta respuesta no existe... Error
      </h1>
      <img src="/img/error1.png" alt="Error 404 - Encuesta2" className="error-image" />
      <p className="error-text">
        Lo sentimos, la página que buscas no está disponible.  
        Pero tranquilo, aún tienes mucho para responder en{" "}
        <strong>Encuesta2</strong>.
      </p>
      <button className="btn-back" onClick={() => navigate("/")}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default Error404;
