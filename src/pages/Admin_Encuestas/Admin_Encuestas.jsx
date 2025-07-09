import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Row, Form, Col,Button } from 'react-bootstrap'
function Admin_Encuestas() {
  return (
    <>
      <Navbar />

      <div className="Container-Page">
        <Row className="w-100">
          <Col md={3}>
            <h2 className='fw-bold text-primary'>NUEVA ENCUESTA</h2>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-2">
              <Form.Control
                type="email"
                placeholder="Nombre"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Select
              name="categoria"
              className="InputEncuesta"
            >
              <option value="">Seleccionar Estado</option>
              <option value="">Activa</option>
              <option value="">Inactiva</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              name="categoria"
              className="InputEncuesta"
            >
              <option value="">Seleccionar Categoria</option>
              <option value="">Deportes</option>
              <option value="">Salud</option>

            </Form.Select>
          </Col>

          
        </Row>

         <Row className="w-100">
         
        <div style={{height:"480px"}}>

        </div>
          
        </Row>

         <Row className="w-100">
          <Col md={9}>
           
          </Col>
         

          <Col md={3}>
            <Button className='w-100 fs-4 fw-bold'>
                Publicar
            </Button>
          </Col>

          
        </Row>

        
      </div>
    </>
  )
}

export default Admin_Encuestas