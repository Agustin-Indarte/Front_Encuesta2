import React from 'react'
import { Form, Row } from 'react-bootstrap'


function TypeText() {
    return (
        <div>
            <Form>
                <Row>
                    <Form.Group className="border-bottom pb-2 d-inline-block mb-3 w-50">
                        <Form.Control
                            type="text"
                            placeholder="Título"
                            className="fs-3 fw-medium border-0 bg-transparent px-0 shadow-none"
                        />
                    </Form.Group>

                    <Form.Group className="border-bottom pb-2 d-inline-block mb-3 ">
                        <Form.Control
                            type="text"
                            placeholder="Descripción"
                            className="fs-5 border-0 bg-transparent px-0 shadow-none"
                        />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}

export default TypeText