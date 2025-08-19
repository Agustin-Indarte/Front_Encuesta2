import React, {useState} from 'react'
import { Form, Row } from 'react-bootstrap'


function TypeText({ content, onUpdate }) {
    const [textData, setTextData] = useState({
        title: content?.title || '',
        description: content?.description || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...textData, [name]: value };
        setTextData(newData);
        onUpdate(newData); // Envía los datos actualizados
    };

    return (
        <div>
            <Form>
                <Row>
                    <Form.Group className="border-bottom pb-2 d-inline-block mb-3 w-50">
                        <Form.Control
                            name="title"
                            value={textData.title}
                            onChange={handleChange}
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
                            name="description"
                            value={textData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}

export default TypeText