import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function TypeQuestion({ content, onUpdate }) {
    const [questionData, setQuestionData] = useState({
        questionText: content?.questionText || '',
        questionType: content?.questionType || '',
        options: content?.options || (['Choice', 'Verificación', 'Desplegable'].includes(content?.questionType) ? [''] : []),
        min: content?.min || 1,
        max: content?.max || 5,
        labelMin: content?.labelMin || '',
        labelMax: content?.labelMax || '',
        fileConfig: content?.fileConfig || {
            maxSize: 1,
            maxCount: 1,
            allowedTypes: ['pdf']
        }
    });

    useEffect(() => {
        onUpdate(questionData);
    }, [questionData]);

    const handleQuestionChange = (e) => {
        setQuestionData(prev => ({
            ...prev,
            questionText: e.target.value
        }));
    };

    const handleTypeChange = (e) => {
    const newType = e.target.value;

    setQuestionData(prev => {
        const tiposConOpciones = ['Choice', 'Verificación', 'Desplegable'];
        let newOptions = prev.options;

        // Si el nuevo tipo usa opciones y no hay ninguna, iniciamos una
        if (tiposConOpciones.includes(newType)) {
            if (!Array.isArray(prev.options) || prev.options.length === 0) {
                newOptions = [''];
            }
        } else {
            // Para los tipos que no usan opciones, vaciamos
            newOptions = [];
        }

        return {
            ...prev,
            questionType: newType,
            options: newOptions
        };
    });
};



    const removeOption = (index) => {
        if (questionData.options.length > 1) {
            const newOptions = questionData.options.filter((_, i) => i !== index);
            setQuestionData(prev => ({
                ...prev,
                options: newOptions
            }));
        }
    };

    const handleOptionChange = (index, value) => {
    setQuestionData(prev => {
        const newOptions = [...prev.options];
        newOptions[index] = value;

        // Si es el último y no está vacío, agregamos un nuevo campo vacío
        if (index === prev.options.length - 1 && value.trim() !== "") {
            newOptions.push("");
        }

        return {
            ...prev,
            options: newOptions
        };
    });
};

    const addOption = () => {
        setQuestionData({
            ...questionData,
            options: [...questionData.options, ""]
        });
    };


    const renderOptions = () => {
        switch (questionData.questionType) {
            // Renderizado (simplificado)
            case 'Choice':
            case 'Verificación':
            case 'Desplegable':
                return (
                    <div className="mt-1">
                        {questionData.options.map((option, index) => (
                            <Row key={index} className="d-flex align-items-center mb-2">
                                <Col md={8}>
                                    <Form.Control
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder={`Opción ${index + 1}`}
                                        className="me-2"
                                    />

                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeOption(index)}
                                        disabled={questionData.options.length <= 1}
                                    >
                                        ×
                                    </Button>
                                </Col>

                            </Row>
                        ))}
                        <Button variant="outline-primary" size="sm" onClick={addOption}>
                            + Añadir opción
                        </Button>
                    </div>
                );
            case 'Escala':
                return (
                    <div className="mt-1">
                        <Row>
                            <Col md={3}>
                                <Form.Label>Mínimo</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={questionData.min}
                                    onChange={(e) => setQuestionData(prev => ({
                                        ...prev,
                                        min: parseInt(e.target.value) || 0
                                    }))}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>Máximo</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={questionData.max}
                                    onChange={(e) => setQuestionData(prev => ({
                                        ...prev,
                                        max: parseInt(e.target.value) || 5
                                    }))}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>Etiqueta mínima</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={questionData.labelMin}
                                    onChange={(e) => setQuestionData(prev => ({
                                        ...prev,
                                        labelMin: e.target.value
                                    }))}
                                    placeholder="Ej: Malo"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>Etiqueta máxima</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={questionData.labelMax}
                                    onChange={(e) => setQuestionData(prev => ({
                                        ...prev,
                                        labelMax: e.target.value
                                    }))}
                                    placeholder="Ej: Excelente"
                                />
                            </Col>
                        </Row>
                    </div>
                );

            case 'Archivos':
    return (
        <div className="mt-1">
            <Row>
                <Col md={3}>
                    <Form.Label>Tamaño máximo</Form.Label>
                    <Form.Select
                        value={questionData.fileConfig.maxSize}
                        onChange={(e) => setQuestionData(prev => ({
                            ...prev,
                            fileConfig: {
                                ...prev.fileConfig,
                                maxSize: parseInt(e.target.value)
                            }
                        }))}
                    >
                        <option value="1">1 MB</option>
                        <option value="10">10 MB</option>
                        <option value="100">100 MB</option>
                        <option value="1000">1 GB</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Label>Cantidad máxima</Form.Label>
                    <Form.Select
                        value={questionData.fileConfig.maxCount}
                        onChange={(e) => setQuestionData(prev => ({
                            ...prev,
                            fileConfig: {
                                ...prev.fileConfig,
                                maxCount: parseInt(e.target.value)
                            }
                        }))}
                    >
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </Form.Select>
                </Col>
                <Col md={7}>
                    <Form.Label>Tipos de archivo permitidos</Form.Label>
                    <div className="d-flex gap-3 py-2">
                        {['PDF', 'DOC', 'JPG', 'PNG', 'MP3', 'MP4', 'XLS'].map(type => (
                            <Form.Check
                                key={type}
                                type="checkbox"
                                id={`file-type-${type}`}
                                label={type}
                                checked={questionData.fileConfig.allowedTypes?.includes(type.toLowerCase()) || false}
                                onChange={(e) => {
                                    const allowedTypes = questionData.fileConfig.allowedTypes || [];
                                    if (e.target.checked) {
                                        setQuestionData(prev => ({
                                            ...prev,
                                            fileConfig: {
                                                ...prev.fileConfig,
                                                allowedTypes: [...allowedTypes, type.toLowerCase()]
                                            }
                                        }));
                                    } else {
                                        setQuestionData(prev => ({
                                            ...prev,
                                            fileConfig: {
                                                ...prev.fileConfig,
                                                allowedTypes: allowedTypes.filter(t => t !== type.toLowerCase())
                                            }
                                        }));
                                    }
                                }}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );

            case 'Fecha':
                return (
                    <div className="mt-1">
                        <Row>
                            <Col md={6}>
                                <Form.Control disabled
                                    type="date"
                                />
                            </Col>

                        </Row>
                    </div>
                );

            case 'Pregunta':
                return (
                    <div className="mt-1">
                        <Row>
                            <Col md={12}>
                                <Form.Control disabled
                                    className='py-4'
                                    type="text"
                                    placeholder='Espacio para la respuesta'
                                />
                            </Col>

                        </Row>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Form>
            <Row>
                <Col md={8}>
                    <Form.Group className="border-bottom pb-2 mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Pregunta"
                            className="fs-4 fw-medium border-0 bg-transparent px-0 shadow-none"
                            value={questionData.questionText}
                            onChange={handleQuestionChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Select
                            value={questionData.questionType}
                            onChange={handleTypeChange}
                            className="fs-4 py-2"
                        >
                            <option value="">Tipo</option>
                            <option value="Fecha">Fecha</option>
                            <option value="Archivos">Archivos</option>
                            <option value="Pregunta">Respuesta</option>
                            <option value="Verificación">Verificación</option>
                            <option value="Desplegable">Desplegable</option>
                            <option value="Choice">Choice</option>
                            <option value="Escala">Escala</option>

                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            {renderOptions()}
        </Form>
    );
}

export default TypeQuestion;