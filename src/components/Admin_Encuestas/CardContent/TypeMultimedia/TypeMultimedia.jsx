import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Spinner } from 'react-bootstrap';

function TypeMultimedia({ content, onUpdate }) {
    const [mediaData, setMediaData] = useState({
        caption: content?.caption || '',
        fileUrl: content?.fileUrl || '',
        fileType: content?.fileType || null,
        isLoading: false,
        error: null
    });

    useEffect(() => {
        // Actualizar el componente padre solo cuando tengamos una URL válida
        if (mediaData.fileType) {
            onUpdate(mediaData);
        }
    }, [mediaData]);

    const verificarYMostrarMultimedia = async (url) => {
        if (!url) {
            setMediaData(prev => ({
                ...prev,
                fileType: null,
                isLoading: false,
                error: null
            }));
            return;
        }

        setMediaData(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            // Validar URL
            new URL(url);
            
            // Determinar tipo de archivo
            const tipo = obtenerTipoMultimedia(url);
            if (!tipo) {
                throw new Error('URL no es una imagen o video soportado');
            }

            // Verificar si el recurso existe y es accesible
            const response = await fetch(url, { method: 'HEAD' });
            if (!response.ok) {
                throw new Error('El recurso no está disponible');
            }

            setMediaData(prev => ({
                ...prev,
                fileUrl: url,
                fileType: tipo,
                isLoading: false,
                error: null
            }));

        } catch (error) {
            setMediaData(prev => ({
                ...prev,
                fileType: null,
                isLoading: false,
                error: error.message
            }));
        }
    };

    const obtenerTipoMultimedia = (url) => {
        const extensionesImagen = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const extensionesVideo = ['mp4', 'webm', 'ogg'];
        
        try {
            const urlObj = new URL(url);
            const extension = urlObj.pathname.split('.').pop().toLowerCase();
            
            if (extensionesImagen.includes(extension)) {
                return 'image';
            }
            
            if (extensionesVideo.includes(extension)) {
                return 'video';
            }
            
            // Si no reconocemos por extensión, intentamos por tipo MIME
            if (url.includes('image')) return 'image';
            if (url.includes('video')) return 'video';
            
            return null;
        } catch {
            return null;
        }
    };

    const manejarCambioUrl = (e) => {
        const url = e.target.value.trim();
        setMediaData(prev => ({ ...prev, fileUrl: url }));
        
        // Usamos un debounce para no hacer muchas peticiones
        const timer = setTimeout(() => {
            verificarYMostrarMultimedia(url);
        }, 800);
        
        return () => clearTimeout(timer);
    };

    const manejarCambioDescripcion = (e) => {
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
                            onChange={manejarCambioDescripcion}
                            name="caption"
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Pega la URL de la imagen o video"
                            value={mediaData.fileUrl}
                            onChange={manejarCambioUrl}
                            className="fs-5 py-3"
                        />
                        {mediaData.isLoading && (
                            <div className="mt-2">
                                <Spinner animation="border" size="sm" />
                                <span className="ms-2">Verificando URL...</span>
                            </div>
                        )}
                        {mediaData.error && (
                            <Form.Text className="text-danger d-block mt-2">
                                {mediaData.error}
                            </Form.Text>
                        )}
                    </Form.Group>
                </Col>
            </Row>

            {/* Vista previa */}
            <Row className="mt-3">
                <Col>
                    {mediaData.isLoading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" />
                        </div>
                    ) : mediaData.fileType === 'image' ? (
                        <div>
                            <img
                                src={mediaData.fileUrl}
                                alt="Vista previa"
                                className="img-fluid rounded"
                                style={{ maxHeight: '500px' }}
                                onError={() => setMediaData(prev => ({
                                    ...prev,
                                    fileType: null,
                                    error: 'No se pudo cargar la imagen'
                                }))}
                            />
                            <p className="mt-2 text-muted">Vista previa de la imagen</p>
                        </div>
                    ) : mediaData.fileType === 'video' ? (
                        <div>
                            <video
                                controls
                                src={mediaData.fileUrl}
                                className="img-fluid rounded"
                                style={{ maxHeight: '800px' }}
                                onError={() => setMediaData(prev => ({
                                    ...prev,
                                    fileType: null,
                                    error: 'No se pudo cargar el video'
                                }))}
                            />
                            <p className="mt-2 text-muted">Vista previa del video</p>
                        </div>
                    ) : (
                        mediaData.fileUrl && !mediaData.error && (
                            <div className="alert alert-info">
                                Introduce una URL válida de imagen (jpg, png, gif) o video (mp4, webm)
                            </div>
                        )
                    )}
                </Col>
            </Row>
        </Form>
    );
}

export default TypeMultimedia;