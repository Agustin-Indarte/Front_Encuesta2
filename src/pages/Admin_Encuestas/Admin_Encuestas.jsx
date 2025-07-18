import { useState, useEffect, useRef } from 'react';
import { Navbar, AdmGridCards } from '../../components'
import { Row, Form, Col, Button } from 'react-bootstrap'
function Admin_Encuestas() {
  const initialized = useRef(false);
  const [cards, setCards] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    if (!initialized.current && cards.length === 0) {
      setCards([
        { id: crypto.randomUUID(), type: 'text', content: {} },
        { id: crypto.randomUUID(), type: null, content: {} }
      ]);
      initialized.current = true;
    }
  }, [cards]);

  const setCardType = (type, cardId) => {
    setCards(prevCards => {
      const updatedCards = prevCards.map(card =>
        card.id === cardId
          ? { ...card, type }
          : card
      );

      const hasEmptyCard = updatedCards.some(card => card.type === null);

      if (!hasEmptyCard) {
        updatedCards.push({
          id: crypto.randomUUID(),
          type: null,
          content: {}
        });
      }

      return updatedCards;
    });

    // Activamos directamente (más confiable)
    setActiveCardId(cardId);
  };

  const deleteCard = (id) => {

    setCards(prevCards => {
      const idx = prevCards.findIndex(c => c.id === id);
      const newCards = prevCards.filter(card => card.id !== id);

      if (newCards.length === 0) {
        const newCard = { id: crypto.randomUUID(), type: "text", content: {} };
        setTimeout(() => setActiveCardId(newCard.id), 0);
        return [newCard];
      }

      if (activeCardId === id) {
        const prevCard = prevCards[idx - 1];
        const nextCard = prevCards[idx + 1];
        const fallbackId = prevCard?.id || nextCard?.id || newCards[0]?.id;
        setTimeout(() => setActiveCardId(fallbackId), 0);
      }

      return newCards;
    });
  };


  return (
    <>
      <Navbar />
      <div className="Container-Page">
        {/*  <h2 className='fw-bold text-primary'>CREAR ENCUESTA</h2> */}
        <Row className="w-100 mb-4">

          <Col md={3}>
            <Form.Group >
              <Form.Control type="text" placeholder="Nombre" className='fs-4' />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Select name="estado" className="InputEncuesta fs-4" >
              <option value="">Seleccionar Estado</option>
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select name="categoria" className="InputEncuesta fs-4">
              <option value="">Seleccionar Categoría</option>
              <option value="deportes">Deportes</option>
              <option value="salud">Salud</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button className='w-100 fs-4 fw-bold'>Publicar</Button>
          </Col>
        </Row>

        {/* GRILLA DE CARDS */}
        <Row className="w-100 mt-2">
          <Col md={2} />  {/* Espacio vacío 25% */}
          <Col md={7}>    {/* Contenedor centrado 50% */}
            <AdmGridCards
              cards={cards}
              activeCardId={activeCardId}
              onSetActive={setActiveCardId}
              onDeleteCard={deleteCard}
              onSetCardType={setCardType}
            />
          </Col>
          <Col md={3} />  {/* Espacio vacío 25% */}
        </Row>

        {/* BOTÓN PUBLICAR */}
        <Row className="w-100 mt-4">
          <Col md={9}></Col>

        </Row>
      </div>
    </>
  );
}

export default Admin_Encuestas;