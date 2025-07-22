import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function TypeMultimedia({ content, onUpdate }) {
    const [mediaData, setMediaData] = useState({
        caption: content?.caption || '',
        fileUrl: content?.fileUrl || null,
        fileType: content?.fileType || null,
        file: null
    });

    useEffect(() => {
        // Actualizar cuando cambien los datos
        onUpdate(mediaData);
    }, [mediaData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const type = file.type.split('/')[0]; // 'image' o 'video'
            setMediaData(prev => ({
                ...prev,
                fileUrl: url,
                fileType: type,
                file: file
            }));
        }
    };

    const handleCaptionChange = (e) => {
        setMediaData(prev => ({
            ...prev,
            caption: e.target.value
        }));
    };

    return (
        <Form>
            <Row>
                <Col md={8}>
                    <Form.Group className="border-bottom pb-2 mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Descripción del multimedia"
                            className="fs-3 fw-medium border-0 bg-transparent px-0 shadow-none"
                            value={mediaData.caption}
                            onChange={handleCaptionChange}
                            name="caption"
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

            {/* Vista previa */}
            <Row className="mt-3">
                <Col>
                    {mediaData.fileUrl && (
                        mediaData.fileType === 'image' ? (
                            <img
                                src={mediaData.fileUrl}
                                alt="Vista previa"
                                className="img-fluid rounded"
                                style={{ maxHeight: '500px' }}
                            />
                        ) : (
                            <video
                                controls
                                src={mediaData.fileUrl}
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