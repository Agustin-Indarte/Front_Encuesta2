import React from 'react'
import { Row, Col, Button,Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Inicio.css'


function Inicio() {
  const navigate = useNavigate();

  return (
    <div className='Container-PageInicio w-100 h-100 d-flex justify-content-center align-items-center flex-column'>

      <Image src="/img/Logo_Azul.png" alt="Logo Azul" className="mb-4"  rounded />

      <h2 className='fs-2 text-white mb-5'>INICIO</h2>


      <div className='ContainerRoutes w-100 h-100 d-flex justify-content-center align-items-center flex-column'>
        <Row className="mb-3">
          <Col>
            <Button  className="custom-btn" variant="primary" onClick={() => navigate('/login')}>Login</Button>
          </Col>
          <Col>
            <Button  className="custom-btn" variant="success" onClick={() => navigate('/register')}>Register</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button  className="custom-btn" variant="info" onClick={() => navigate('/user/home')}>Home Usuario</Button>
          </Col>
          <Col>
            <Button  className="custom-btn" variant="secondary" onClick={() => navigate('/admin/home')}>Home Admin</Button>
          </Col>
          
        </Row>
        <Row>
          <Col>
            <Button  className="custom-btn" variant="warning" onClick={() => navigate('/user/encuestas')}>Encuestas Usuario</Button>
          </Col>
          
          <Col>
            <Button  className="custom-btn" variant="dark" onClick={() => navigate('/admin/encuestas')}>Encuestas Admin</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Inicio