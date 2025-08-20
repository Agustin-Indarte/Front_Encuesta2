import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { UserCard } from '../../../components';

function UserGridCards({ cards, onRespuesta }) {
  if (!cards || !Array.isArray(cards)) return null;

  return (
    <div className='AdmGridCard'>
      {cards.map((card) => (
        <Row
          key={card._id}
          className="Container-AdmCard d-flex border mb-3 ps-2 py-3 rounded shadow-md"
        >
          <Col md={6} className="card-col">
            <UserCard {...card} id={card._id} onRespuesta={onRespuesta} />
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default UserGridCards