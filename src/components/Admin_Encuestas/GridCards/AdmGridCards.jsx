import { useEffect,useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SideBar, AdmCard } from '../../../components/index'
import './admGridCard.css'

const AdmGridCards = ({ cards, activeCardId, onAddCard, onSetActive, onDeleteCard }) => {

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