import React from 'react'
import { Card } from 'react-bootstrap';
import './admCard.css'

const AdmCard = ({ card, isActive }) => {
  return (
    <Card className="AdmCardEncuesta flex-1 bg-white p-4 rounded border w-full">
      <div> {/* Contenedor adicional para mejor control */}
        <h3 className="text-lg font-semibold capitalize">Card tipo: {card.type}</h3>
        <p className="text-sm text-gray-500 mt-2">
          {isActive ? "🟢 Editando esta card..." : "Haz clic para editar"}
        </p>
      </div>
      {/* Espacio reservado para futuros elementos */}
      <div></div> 
    </Card>
  );
};


export default AdmCard