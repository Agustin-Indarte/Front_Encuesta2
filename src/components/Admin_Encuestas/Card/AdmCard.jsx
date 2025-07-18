import React from 'react'
import { Card } from 'react-bootstrap';
import './admCard.css'
import { TypeText, TypeQuestion, TypeMultimedia } from '../../../components'

const AdmCard = ({ card, isActive }) => {
  return (
    <Card
      className={`AdmCardEncuesta flex-1 bg-white p-4 rounded border w-full ${isActive ? 'AdmCard-Active' : ''}`}
    >

      {/* Renderizado condicional basado en card.type */}
      <div>
        {card.type === 'text' && <TypeText />}
        {card.type === 'question' && <TypeQuestion />}
        {card.type === 'multimedia' && <TypeMultimedia />}
        {!card.type && (
          <div className="text-muted fst-italic">Selecciona un tipo en el sidebar para comenzar</div>
        )}
      </div>
    </Card>
  );
};

export default AdmCard