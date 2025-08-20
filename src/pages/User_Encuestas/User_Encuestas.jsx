import React, { useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {Navbar, UserGridCards} from '../../components';
import { guardarRespuesta } from '../../api';

function User_Encuestas() {
  const location = useLocation();
  const encuesta = location.state?.encuesta;
  const [respuestas, setRespuestas] = useState([]);

  // Usa un ObjectId de usuario real (ajusta este valor por uno válido de tu base de datos)
  const usuarioId = '665f2c7b8e8b2c0012a1b2c4';

  // Cambia para usar el _id real de la card
  const handleRespuesta = (cardId, valor) => {
    setRespuestas(prev => {
      const filtradas = prev.filter(r => r.cardId !== cardId);
      return [...filtradas, { cardId, valor }];
    });
  };

  const handleEnviar = async () => {
    try {
      await guardarRespuesta({
        encuesta: encuesta._id || encuesta.id,
        usuario: usuarioId,
        respuestas
      });
      alert('Respuestas enviadas correctamente');
    } catch (e) {
      alert('Error al enviar respuestas');
    }
  };

  return (
    <>
      <Navbar />
      <div className="Container-Page">
        <Row className="w-100 mb-4">
          <Col md={3} >
           
          </Col>
          <Col md={6} className='d-flex align-items-center justify-content-center'> <h2 className='title-page mb-0'>{encuesta?.name}</h2></Col>
     
          <Col md={3}>
          
            </Col>
        </Row>
        <Row className="w-100 mt-2 d-flex justify-content-end align-items-end ">
          <Col md={3}>
            
          </Col>
          <Col md={6}>
          {/* Pasa el _id real de cada card */}
          <UserGridCards cards={encuesta?.cards || []} onRespuesta={handleRespuesta} />
          </Col>
          <Col md={3}>
            <Button className='w-100 fs-4 fw-bold' onClick={handleEnviar}>
              Responder
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User_Encuestas