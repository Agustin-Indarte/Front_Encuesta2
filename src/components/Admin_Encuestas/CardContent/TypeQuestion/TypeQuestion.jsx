import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function TypeQuestion({ content, onUpdate }) {
    const [questionData, setQuestionData] = useState({
        questionText: content?.questionText || '',
        questionType: content?.questionType || '',
        options: content?.options || [''],
        min: content?.min || 1,
        max: content?.max || 5,
        labelMin: content?.labelMin || '',
        labelMax: content?.labelMax || '',
        fileConfig: content?.fileConfig || {
            maxSize: '1mb',
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
        setQuestionData(prev => ({
            ...prev,
            questionType: e.target.value,
            options: e.target.value === 'Choise' || 
                    e.target.value === 'Verificación' || 
                    e.target.value === 'Desplegable' ? [''] : []
        }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...questionData.options];
        newOptions[index] = value;
        
        setQuestionData(prev => ({
            ...prev,
            options: newOptions
        }));
    };

    const addOption = () => {
        setQuestionData(prev => ({
            ...prev,
            options: [...prev.options, '']
        }));
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

    const renderOptions = () => {
        switch (questionData.questionType) {
            case 'Choise':
            case 'Verificación':
            case 'Desplegable':
                return (
                    <div className="mt-3">
                        {questionData.options.map((option, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                <Form.Control
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder={`Opción ${index + 1}`}
                                    className="me-2"
                                />
                                <Button 
                                    variant="outline-danger" 
                                    size="sm" 
                                    onClick={() => removeOption(index)}
                                >
                                    ×
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline-primary" size="sm" onClick={addOption}>
                            + Añadir opción
                        </Button>
                    </div>
                );
            
            case 'Escala':
                return (
                    <div className="mt-3">
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
                    <div className="mt-3">
                        <Row>
                            <Col md={6}>
                                <Form.Label>Tamaño máximo (MB)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={questionData.fileConfig.maxSize.replace('mb', '')}
                                    onChange={(e) => setQuestionData(prev => ({
                                        ...prev,
                                        fileConfig: {
                                            ...prev.fileConfig,
                                            maxSize: `${e.target.value}mb`
                                        }
                                    }))}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Cantidad máxima</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={questionData.fileConfig.maxCount}
                                    onChange={(e) => setQuestionData(prev => ({
                                        ...prev,
                                        fileConfig: {
                                            ...prev.fileConfig,
                                            maxCount: parseInt(e.target.value) || 1
                                        }
                                    }))}
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
                            className="fs-3 fw-medium border-0 bg-transparent px-0 shadow-none"
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
                            className="fs-5 py-3"
                        >
                            <option value="">Seleccionar Tipo</option>
                            <option value="Pregunta">Respuesta corta</option>
                            <option value="Fecha">Fecha</option>
                            <option value="Choise">Opción múltiple</option>
                            <option value="Verificación">Casillas de verificación</option>
                            <option value="Desplegable">Lista desplegable</option>
                            <option value="Archivos">Subida de archivos</option>
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