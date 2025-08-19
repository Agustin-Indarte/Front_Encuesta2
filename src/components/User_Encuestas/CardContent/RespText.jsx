import { Row, Card } from 'react-bootstrap'

function RespText({ content }) {
  return (
    <div>

      <Row>
        <Card.Body>
          <Card.Title className="fs-3 fw-bolder">
            {content.title}
          </Card.Title>
          <Card.Text className="fs-5">
            {content.description}
          </Card.Text>
        </Card.Body>
      </Row>

    </div>
  )
}

export default RespText