import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { UserCard } from '../../../components';

function UserGridCards({ cards }) {
  if (!cards || !Array.isArray(cards)) return null; // Evita el error si cards no existe

  return (
    <div className='AdmGridCard'>
      {cards.map((card) => (
        <Row
          key={card.id}
          className="Container-AdmCard d-flex border mb-3 ps-2 py-3 rounded shadow-md"
        >
          <Col md={6} className="card-col">
            <UserCard {...card} />
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default UserGridCards