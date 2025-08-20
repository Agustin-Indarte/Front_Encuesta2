
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error404.css";
import errorImg from "../../assets/error1.png"; 

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <img src={errorImg} alt="Error 404 - Encuesta2" className="error-image" />
     
      <p className="error-text">
        Lo sentimos, la página que buscas no existe en <strong>Encuesta2</strong>.
      </p>
      <button className="btn-back" onClick={() => navigate("/")}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default Error404;

