import { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SideBar, AdmCard } from '../../../components/index'
import './admGridCard.css'

const AdmGridCards = ({ cards, activeCardId, onSetCardType, onSetActive, onDeleteCard }) => {


  // Referencia al contenedor del scroll
  const gridContainerRef = useRef(null);
  // Guardamos el número previo de cards para comparar
  const prevCardsLengthRef = useRef(cards.length);

  // Cuando se selecciona un tipo, agrega una card nueva después de la actual
  const handleSelectType = (type, cardId) => {
    onAddCard(type, cardId);
  };

  // Efecto para el auto-scroll
  useEffect(() => {
    const gridContainer = gridContainerRef.current;
    const prevCardsLength = prevCardsLengthRef.current;

    // Solo hacemos scroll si:
    // 1. Hay cards (evita el primer render)
    // 2. El número de cards aumentó (se agregó una nueva)
    if (gridContainer && cards.length > 0 && cards.length > prevCardsLength) {
      gridContainer.scrollTo({
        top: gridContainer.scrollHeight,
        behavior: 'smooth' // Efecto suave
      });
    }

    // Actualizamos la referencia con el nuevo length
    prevCardsLengthRef.current = cards.length;
  }, [cards.length])



  return (
    <div
      className='AdmGridCard'
      ref={gridContainerRef} // Asignamos la referencia 
    >
      {cards.map((card, index) => {
        const isFirst = index === 0;
        const isEmpty = card.type === null;
        const isActive = activeCardId === card.id;

        const showSidebar = isEmpty || (!isFirst && isActive); // 👈 solo si es vacía o activa y no es la primera

        return (
          <Row
            key={card.id}
            className="Container-AdmCard d-flex border mb-3 ps-2 py-3 rounded shadow-md"
            onClick={() => {
              if (!isEmpty && !isFirst) {
                onSetActive(card.id);
              }
            }}
          >
            <Col md={1} className="sidebar-col mx-3">
              {showSidebar && (
                <SideBar
                  onSelectType={(type) => onSetCardType(type, card.id)}
                  activeType={card.type}
                  onDeleteCard={() => onDeleteCard(card.id)}
                  isFirstTextCard={false}
                />
              )}
            </Col>
            <Col md={10} className="card-col">
              <AdmCard card={card} isActive={isActive} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default AdmGridCards;