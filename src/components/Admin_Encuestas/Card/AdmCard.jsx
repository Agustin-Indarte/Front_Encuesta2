import React from 'react'
import { Card } from 'react-bootstrap';
import './admCard.css'
import { TypeText, TypeQuestion, TypeMultimedia } from '../../../components'

const AdmCard = ({ card, isActive, onUpdateContent }) => {
  return (
    <Card
      className={`AdmCardEncuesta flex-1 bg-white p-4 rounded border w-full ${isActive ? 'AdmCard-Active' : ''}`}
    >

      {/* Renderizado condicional basado en card.type */}
      <div>
        {card.type === 'text' &&
          <TypeText content={card.content} onUpdate={(data) => onUpdateContent(card.id, data)}/>}
        {card.type === 'question' && <TypeQuestion content={card.content} onUpdate={(data) => onUpdateContent(card.id, data)} />}
        {card.type === 'multimedia' && <TypeMultimedia content={card.content} onUpdate={(data) => onUpdateContent(card.id, data)} />}
        {!card.type && (
          <div className="text-muted fst-italic">Selecciona un tipo en el sidebar para comenzar</div>
        )}
      </div>
    </Card>
  );
};

export default AdmCard