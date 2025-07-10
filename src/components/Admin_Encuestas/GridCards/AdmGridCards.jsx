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
    <div className='AdmGridCard'>
      {cards.map((card) => (
        <Row
          key={card.id}
          className="Container-AdmCard d-flex border mb-3 ps-2 py-3 rounded shadow-md"
          onClick={() => onSetActive(card.id)}
        >
          <Col md={1} className='sidebar-col mx-3'>
            {activeCardId === card.id && (
              <SideBar
                onSelectType={(type) => handleSelectType(type, card.id)}
                activeType={card.type}
                onDeleteCard={() => onDeleteCard(card.id)}
                isFirstTextCard={cards[0]?.id === card.id && card.type === "text"}
              />
            )}
          </Col>
          <Col md={11} className='card-col '>
            <AdmCard card={card} isActive={activeCardId === card.id} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default AdmGridCards;