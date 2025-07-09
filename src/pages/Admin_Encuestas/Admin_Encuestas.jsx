import { useState, useEffect, useRef } from 'react';
import { Navbar, AdmGridCards } from '../../components'
import { Row, Form, Col, Button } from 'react-bootstrap'
function Admin_Encuestas() {
  const initialized = useRef(false);
  const [cards, setCards] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [pendingActiveId, setPendingActiveId] = useState(null);

  // Agrega una card por defecto al cargar la página
  useEffect(() => {
    if (!initialized.current && cards.length === 0) {
      addCard("text");
      initialized.current = true;
    }
  }, [cards]);

  // Efecto para sincronizar el activeCardId cuando se agrega una nueva card
  useEffect(() => {
    if (pendingActiveId && cards.some(card => card.id === pendingActiveId)) {
      setActiveCardId(pendingActiveId);
      setPendingActiveId(null);
    }
  }, [cards, pendingActiveId]);

  const addCard = (type, afterId = null) => {
    const newCard = {
      id: crypto.randomUUID(),
      type,
      content: {}
    };

    setCards(prevCards => {
      const idx = prevCards.findIndex(card => card.id === afterId);
      const newCards =
        idx >= 0
          ? [...prevCards.slice(0, idx + 1), newCard, ...prevCards.slice(idx + 1)]
          : [...prevCards, newCard];
      return newCards;
    });
    setPendingActiveId(newCard.id); // Ahora se activa cuando la card ya existe en el array
  };

  const deleteCard = (id) => {
    const newCards = cards.filter(card => card.id !== id);

    // Si no queda ninguna card, creamos una nueva
    if (newCards.length === 0) {
      const newCard = {
        id: crypto.randomUUID(),
        type: "text",
        content: {}
      };
      setCards([newCard]);
      setActiveCardId(newCard.id);
      return;
    }

    setCards(newCards);

    // Si la card eliminada era la activa, cambiar a otra
    if (activeCardId === id) {
      const idx = cards.findIndex(c => c.id === id);
      const fallback = newCards[idx] || newCards[idx - 1] || newCards[0];
      setActiveCardId(fallback?.id || null);
    }
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
          <div>
            <div>
              <AdmGridCards
                cards={cards}
                activeCardId={activeCardId}
                onAddCard={addCard}
                onSetActive={setActiveCardId}
                onDeleteCard={deleteCard}
              />
            </div>
          </div>


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