import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import './GridCard.css';

function GridCard() {

    const [surveys, setSurveys] = useState([]);

    useEffect(() =>{

        const loadSurveys = async () =>{
            try {
                const answer = await fetch('../../../../public/DataUserHome/surveys.json');
                const data = await answer.json();
                setSurveys(data);
            } catch (error) {
                console.error('Error al cargar las encuestas', error)
            }
        }

        loadSurveys();

    },[]);


  return (
    <div className='container'>
        <Row xs={1} lg={2} className="g-4">
            {surveys.map((survey) => (
                <Col key={survey.id}>
                <Card className="h-100">
                    <Row className="g-0 h-100">
                    <Col md={4}className="d-flex">
                        <Card.Img
                        src={survey.image}
                        className="img-full-height img-fluid rounded-start"
                        alt={survey.name}
                        />
                    </Col>
                    <Col md={8}>
                        <Card.Body className="h-100 d-flex flex-column justify-content-center">
                        <Card.Title className='card-title fw-bold'>{survey.name}</Card.Title>
                         <Card.Text className='fw-bold text-secondary'>Categoria: {survey.category}</Card.Text>
                        <Card.Text>{survey.description}</Card.Text>
                        <Button className='btn-reply'>Responder</Button>
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

export default GridCard
