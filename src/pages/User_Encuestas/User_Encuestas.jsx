import React from 'react'
import { Col, Row, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {Navbar, UserGridCards} from '../../components';

function User_Encuestas() {
  const location = useLocation();
  const encuesta = location.state?.encuesta;
console.log('Encuesta:', encuesta);
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
          <UserGridCards cards={encuesta?.cards || []} />
          </Col>
          <Col md={3}>
            <Button className='w-100 fs-4 fw-bold'>
              Responder
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User_Encuestas