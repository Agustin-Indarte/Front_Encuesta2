import { Button, Card, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './GridCard.css';

function GridCard({ surveys }) {

    const navigate = useNavigate();

    const handleResponder = (survey) => {
        navigate('/user/encuestas', { state: { encuesta: survey } });
    

    };

    return (
        <div className='container mb-5 ContainerGridEncuestas '>
            <Row xs={1} lg={2} className="g-4">
                {surveys.map((survey) => (
                    <Col key={survey.id}>
                        <Card className="h-100">
                            <Row className="g-0 h-100">
                                <Col md={4} className="d-flex">
                                    <Card.Img
                                        src={survey.image}
                                        className="img-full-height img-fluid rounded-start"
                                        alt={survey.name}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="h-100 d-flex flex-column justify-content-center card-content-fixed">
                                        <Card.Title className='card-title fw-bold mb-2'>{survey.name}</Card.Title>
                                        <div className="d-flex justify-content-between align-items-center mb-2" style={{width: '100%'}}>
                                            <span className='fw-bold text-secondary' style={{fontSize: '1rem', textAlign: 'left'}}>
                                                Categoria: {survey.category}
                                            </span>
                                            <span className='text-muted' style={{fontSize: '0.95rem', textAlign: 'right'}}>
                                                {survey.createdAt ? new Date(survey.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                                            </span>
                                        </div>
                                        <Card.Text style={{maxHeight: 120, overflowY: 'auto', marginBottom: 10}}>
                                            {survey.description}
                                        </Card.Text>
                                        <Button
                                            className='btn-reply mt-auto'
                                            onClick={() => handleResponder(survey)}
                                        >
                                            Responder
                                        </Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default GridCard;

