import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SideBar, AdmCard } from '../../../components/index'
import './admGridCard.css'

const AdmGridCards = ({ cards, activeCardId, onAddCard, onSetActive, onDeleteCard }) => {


  // Cuando se selecciona un tipo, agrega una card nueva después de la actual
  const handleSelectType = (type, cardId) => {
    onAddCard(type, cardId);
  };



  return (
    <div
      style={{
        height: '75vh',
        overflowY: 'auto',
        paddingInline: '1rem',
        borderRadius: '12px'
      }}
    >
      {cards.map((card) => (
        <Row
          key={card.id}
          className="Container-AdmCard d-flex align-items-stretch border p-2 mb-3 rounded shadow-md"
          onClick={() => onSetActive(card.id)}
        >
          <Col md={1} className='d-flex justify-content-center align-items-center'>
            {activeCardId === card.id && (
              <SideBar
                onSelectType={(type) => handleSelectType(type, card.id)}
                activeType={card.type}
                onDeleteCard={() => onDeleteCard(card.id)}
                isFirstTextCard={cards[0]?.id === card.id && card.type === "text"}
              />
            )}
          </Col>
          <Col md={11}>
            <AdmCard card={card} isActive={activeCardId === card.id} />
          </Col>
        </Row>
      ))}

      {cards.length === 0 && (
        <div className="border p-4 text-center text-gray-500 rounded shadow">
          No hay cards. Hacé clic en un botón del sidebar para empezar.
        </div>
      )}
    </div>
  );
};

export default AdmGridCards;