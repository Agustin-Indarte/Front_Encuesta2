import { Button,  Row, Col, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function AdminHeader({
  onOpenCategory,
}) {

  const navigate = useNavigate();
  
  return (
    <>

      <Row className="w-100 mb-4">
        <Col md={4} className='d-flex align-items-center'>
          <h2 className='title-page mb-0'>ADMINISTRAR ENCUESTAS</h2>
        </Col>
        <Col md={4}>
          <Button className="w-100 fs-4 fw-bold bg-black border" onClick={onOpenCategory}>ADMINISTRAR CATEGORÍAS</Button>
        </Col>


        <Col md={4}>
          <Button className="w-100 fs-4 fw-bold bg-black border" onClick={() => navigate('/admin/encuestas')}>CREAR ENCUESTA</Button>
        </Col>
      </Row>
    </>

  );
}

export default AdminHeader;
