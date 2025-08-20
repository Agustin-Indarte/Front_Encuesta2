import React from 'react'
import { Card } from 'react-bootstrap';
import './AdmCard.css'
import { TypeText, TypeQuestion, TypeMultimedia } from '../../../components'

const AdmCard = ({ card, isActive, onUpdateContent }) => {
  return (
    <Card
      className={`AdmCardEncuesta flex-1  p-4 rounded border w-full ${
        isActive ? 'AdmCard-Active' : ''
      } ${
        !card.type ? 'AdmCard-Inactive' : ''
      }`}
    >
      {/* Renderizado condicional basado en card.type */}
      <div>
        {card.type === 'text' &&
          <TypeText content={card.content} onUpdate={(data) => onUpdateContent(card.id, data)}/>}
        {card.type === 'question' && <TypeQuestion content={card.content} onUpdate={(data) => onUpdateContent(card.id, data)} />}
        {card.type === 'multimedia' && <TypeMultimedia content={card.content} onUpdate={(data) => onUpdateContent(card.id, data)} />}
        {!card.type && (
          <div className="text-muted fst-italic fs-5"> ← Selecciona un tipo de tarjeta en la cinta para comenzar</div>
        )}
      </div>
    </Card>
  );
};

export default AdmCard