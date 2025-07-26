import { useState, useEffect, useRef } from 'react';
import { Navbar, AdmGridCards } from '../../components';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { FaUpload } from "react-icons/fa";
import './Admin_Encuestas.css'


function Admin_Encuestas() {
  const initialized = useRef(false);
  const [encuestaData, setEncuestaData] = useState({
    nombre: '',
    estado: '',
    categoria: '',
    cards: []
  });
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    if (!initialized.current && encuestaData.cards.length === 0) {
      setEncuestaData(prev => ({
        ...prev,
        cards: [
          { id: crypto.randomUUID(), type: 'text', content: {} },
          { id: crypto.randomUUID(), type: null, content: {} }
        ]
      }));
      initialized.current = true;
    }
  }, [encuestaData.cards]);

  const setCardType = (type, cardId) => {
    setEncuestaData(prev => {
      const updatedCards = prev.cards.map(card =>
        card.id === cardId ? { ...card, type } : card
      );

      const hasEmptyCard = updatedCards.some(card => card.type === null);

      return {
        ...prev,
        cards: hasEmptyCard
          ? updatedCards
          : [...updatedCards, { id: crypto.randomUUID(), type: null, content: {} }]
      };
    });
    setActiveCardId(cardId);
  };

  const deleteCard = (id) => {
    setEncuestaData(prev => {
      const idx = prev.cards.findIndex(c => c.id === id);
      const newCards = prev.cards.filter(card => card.id !== id);

      if (newCards.length === 0) {
        const newCard = { id: crypto.randomUUID(), type: "text", content: {} };
        setTimeout(() => setActiveCardId(newCard.id), 0);
        return { ...prev, cards: [newCard] };
      }

      if (activeCardId === id) {
        const prevCard = prev.cards[idx - 1];
        const nextCard = prev.cards[idx + 1];
        const fallbackId = prevCard?.id || nextCard?.id || newCards[0]?.id;
        setTimeout(() => setActiveCardId(fallbackId), 0);
      }

      return { ...prev, cards: newCards };
    });
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setEncuestaData(prev => ({ ...prev, [name]: value }));
  };

  const updateCardContent = (cardId, newContent) => {
    setEncuestaData(prev => ({
      ...prev,
      cards: prev.cards.map(card =>
        card.id === cardId
          ? { ...card, content: { ...card.content, ...newContent } }
          : card
      )
    }));
  };

  const handlePublicar = () => {
    if (!encuestaData.nombre) {
      alert('Por favor ingresa un nombre para la encuesta');
      return;
    }

    // 1. Filtrar cards no definidas y limpiar el contenido
    const cardsFiltradas = encuestaData.cards
      .filter(card => card.type) // Eliminar cards sin tipo
      .map(card => {
        // Clonar la card para no modificar el estado directamente
        const cleanedCard = {
          id: card.id,
          type: card.type,
          content: { ...card.content }
        };

        // Limpieza específica para cada tipo de card
        switch (card.type) {
          case 'text':
            // Asegurar que title y description existan
            cleanedCard.content = {
              title: card.content.title || '',
              description: card.content.description || ''
            };
            break;

          case 'question':
            // Estructura base para preguntas
            const baseQuestion = {
              questionText: card.content.questionText || '',
              questionType: card.content.questionType || ''
            };

            // Campos adicionales según el tipo de pregunta
            switch (card.content.questionType) {
              case 'Choise':
              case 'Verificación':
              case 'Desplegable':
                baseQuestion.options = card.content.options || [];
                break;

              case 'Escala':
                baseQuestion.min = card.content.min || 1;
                baseQuestion.max = card.content.max || 5;
                baseQuestion.labelMin = card.content.labelMin || '';
                baseQuestion.labelMax = card.content.labelMax || '';
                break;

              case 'Archivos':
                baseQuestion.fileConfig = {
                  maxSize: card.content.fileConfig?.maxSize || '10MB',
                  maxFiles: card.content.fileConfig?.maxCount || 1,
                  allowedTypes: card.content.fileConfig?.allowedTypes || ['pdf']
                };
                break;
            }

            cleanedCard.content = baseQuestion;
            break;

          case 'multimedia':
            cleanedCard.content = {
              fileUrl: card.content.fileUrl || '',
              fileType: card.content.fileType || '',
              caption: card.content.caption || ''
            };
            break;
        }

        return cleanedCard;
      });

    // 2. Crear el objeto final de la encuesta
    const encuestaCompleta = {
      nombre: encuestaData.nombre || '',
      estado: encuestaData.estado || '',
      categoria: encuestaData.categoria || '',
      fechaCreacion: new Date().toISOString(),
      cards: cardsFiltradas
    };

    // 3. Convertir a JSON y descargar
    const dataStr = JSON.stringify(encuestaCompleta, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const nombreArchivo = `encuesta_${encuestaData.nombre || 'sin_nombre'}_${new Date().toISOString().slice(0, 10)}.json`;

    // Crear enlace de descarga
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', nombreArchivo);
    linkElement.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEncuestaData({
        ...encuestaData,
        imagen: file
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="Container-Page">

        <Row className="w-100 mb-4">
          <Col md={3} className='d-flex align-items-center'>
            <h2 className='title-page mb-0'>CREAR ENCUESTA</h2>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Nombre"
                className='fs-4'
                name="nombre"
                value={encuestaData.nombre}
                onChange={handleMetadataChange}
                required
              />
            </Form.Group>
          </Col>


          <Col md={3}>
            <Form.Select
              name="estado"
              className="InputEncuesta fs-4"
              value={encuestaData.estado}
              onChange={handleMetadataChange}
              required
            >
              <option value="">Seleccionar Estado</option>
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              name="categoria"
              className="InputEncuesta fs-4"
              value={encuestaData.categoria}
              onChange={handleMetadataChange}
              required
            >
              <option value="">Seleccionar Categoría</option>
              <option value="deportes">Deportes</option>
              <option value="salud">Salud</option>
            </Form.Select>
          </Col>


        </Row>

        <Row className="w-100 mt-2 d-flex justify-content-end align-items-end ">

          <Col md={9}>
            <AdmGridCards
              cards={encuestaData.cards}
              activeCardId={activeCardId}
              onSetActive={setActiveCardId}
              onDeleteCard={deleteCard}
              onSetCardType={setCardType}
              onUpdateContent={updateCardContent}
            />
          </Col>

          <Col md={3}>

            <Form.Group controlId="formFile" className="mb-3">
              <div className="input-group">
                {/* Botón azul con ícono de subida (React Icons) */}
                <label
                  className="input-group-text bg-primary text-white fs-4"
                  htmlFor="customFileInput"
                  style={{ cursor: "pointer" }}
                >
                  <FaUpload /> {/* Ícono de React Icons */}
                </label>

                {/* Input de archivo oculto */}
                <input
                  type="file"
                  id="customFileInput"
                  accept="image/*"
                  className="form-control fs-4 d-none"
                  name="imagen"
                  onChange={handleFileChange}
                  required
                />

                {/* Caja que muestra el nombre del archivo */}
                <input
                  type="text"
                  className="form-control fs-4"
                  placeholder="Subir portada"
                  value={encuestaData.imagen?.name || ""} // Usamos optional chaining por seguridad
                  onClick={() => document.getElementById('customFileInput').click()}
                  readOnly
                  style={{ cursor: "pointer" }}
                />
              </div>
            </Form.Group>

            <Button
              className='w-100 fs-4 fw-bold'
              onClick={handlePublicar}
              disabled={!encuestaData.nombre || !encuestaData.estado || !encuestaData.categoria}
            >
              Publicar
            </Button>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default Admin_Encuestas;