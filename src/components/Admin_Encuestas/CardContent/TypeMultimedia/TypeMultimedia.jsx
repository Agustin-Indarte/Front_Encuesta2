import React from 'react'
import { Form, Row,Col } from 'react-bootstrap'

function TypeMultimedia() {
    return (
        <Form>
            <Row>
                <Col md={8}>
                    <Form.Group className="border-bottom pb-2 mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Multimedia"
                            className="fs-3 fw-medium border-0 bg-transparent px-0 shadow-none"
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Select
                            className="InputEncuesta fs-4"
                        >
                            <option value="">Seleccionar Tipo</option>
                            <option value="Pregunta">Imagen</option>
                            <option value="Fecha">Video</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>


        </Form>
    )
}

export default TypeMultimedia