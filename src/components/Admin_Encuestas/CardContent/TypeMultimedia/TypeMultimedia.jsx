import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function TypeMultimedia() {
    const [fileUrl, setFileUrl] = useState(null);
    const [fileType, setFileType] = useState(null); // Nuevo estado para el tipo de archivo

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            setFileType(file.type.split('/')[0]); // Guardamos el tipo (image o video)
        }
    };

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
                        <Form.Control
                            type="file"
                            accept="image/*, video/*"
                            onChange={handleFileChange}
                            className="fs-5 py-3"
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Vista previa del multimedia */}
            <Row className="mt-3">
                <Col>
                    {fileUrl && (
                        fileType === 'image' ? (
                            <img
                                src={fileUrl}
                                alt="Vista previa"
                                className="img-fluid rounded"
                                style={{ maxHeight: '500px' }}
                            />
                        ) : (
                            <video
                                controls
                                src={fileUrl}
                                className="img-fluid rounded"
                                style={{ maxHeight: '800px' }}
                            />
                        )
                    )}
                </Col>
            </Row>
        </Form>
    );
}

export default TypeMultimedia;