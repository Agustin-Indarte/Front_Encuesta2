import React, { useState } from 'react'
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

function TypeQuestion() {
    // Estados para controlar los diferentes tipos de preguntas
    const [tipoPregunta, setTipoPregunta] = useState('');
    const [opciones, setOpciones] = useState(['']); // Para preguntas de opción múltiple
    const [opcionesDesplegable, setOpcionesDesplegable] = useState(['']); // Para desplegables
    const [opcionesVerificacion, setOpcionesVerificacion] = useState(['']); // Para casillas de verificación
    const [rangoEscala, setRangoEscala] = useState({ min: 0, max: 10 }); // Para escalas
    const [configArchivos, setConfigArchivos] = useState({
        tamanoMaximo: '1mb',
        cantidadMaxima: '1',
        tiposPermitidos: ['pdf']
    });

    // Manejar cambio en el tipo de pregunta
    const manejarCambioTipo = (e) => {
        setTipoPregunta(e.target.value);
    };

    // Eliminar una opción
    const eliminarOpcion = (index, opcionesArray, setOpciones) => {
        if (opcionesArray.length > 1) {
            const nuevasOpciones = opcionesArray.filter((_, i) => i !== index);
            setOpciones(nuevasOpciones);
        }
    };

    const agregarOpcionManual = () => {
        setOpciones([...opciones, '']); // Añade un campo vacío al final
    };

    // Para Choise (Opción múltiple)
    const manejarCambioOpcion = (indice, valor) => {
        const nuevasOpciones = [...opciones];
        nuevasOpciones[indice] = valor;
        setOpciones(nuevasOpciones);

        // Agregar nuevo campo si:
        // 1. Es el último campo Y
        // 2. El valor anterior estaba vacío ("") Y
        // 3. El nuevo valor tiene al menos 1 carácter (primera letra)
        if (indice === opciones.length - 1 && opciones[indice] === "" && valor.length === 1) {
            setOpciones([...nuevasOpciones, ""]);
        }
    };





    // Para Verificación
    const manejarCambioVerificacion = (indice, valor) => {
        const nuevasOpciones = [...opcionesVerificacion];
        nuevasOpciones[indice] = valor;
        setOpcionesVerificacion(nuevasOpciones);

        if (indice === opcionesVerificacion.length - 1 && opcionesVerificacion[indice] === "" && valor.length === 1) {
            setOpcionesVerificacion([...nuevasOpciones, ""]);
        }
    };

    // Para Desplegable
    const manejarCambioDesplegable = (indice, valor) => {
        const nuevasOpciones = [...opcionesDesplegable];
        nuevasOpciones[indice] = valor;
        setOpcionesDesplegable(nuevasOpciones);

        if (indice === opcionesDesplegable.length - 1 && opcionesDesplegable[indice] === "" && valor.length === 1) {
            setOpcionesDesplegable([...nuevasOpciones, ""]);
        }
    };

    // Renderizar el input según el tipo de pregunta
    const renderizarInput = () => {
        switch (tipoPregunta) {
            case 'Pregunta':
                return (
                    <Form.Group className="">
                        <Form.Control
                            type="text"
                            placeholder="Espacio para la respuesta"
                            className="fs-5 py-3"
                            disabled
                        />
                    </Form.Group>
                );

            case 'Fecha':
                return (
                    <Form.Group className="">
                        <Form.Control
                            type="date"
                            placeholder="Seleccione una fecha"
                            className="fs-5 w-50 py-3"
                        />
                    </Form.Group>
                );

            case 'Choise':
                return (
                    <Form.Group className="w-100">
                        {opciones.map((opcion, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center py-2 border-bottom w-50"
                            >
                                {/* Indicador visual (círculo) en lugar del radio real */}
                                <div className="rounded-circle border me-2" style={{
                                    width: '18px',
                                    height: '18px',
                                    minWidth: '18px',
                                    borderColor: '#6c757d'
                                }}></div>

                                {/* Input para el texto de la opción */}
                                <Form.Control
                                    type="text"
                                    value={opcion}
                                    onChange={(e) => manejarCambioOpcion(index, e.target.value)}
                                    placeholder={`Opción ${index + 1}`}
                                    className="fs-5 border-0 bg-transparent px-0 shadow-none flex-grow-1"
                                />

                                {/* Botón para eliminar (solo si hay más de una opción) */}
                                {opciones.length > 1 && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => eliminarOpcion(index)}
                                        className="mt-2"
                                    >
                                        ×
                                    </Button>
                                )}

                                {opciones.length == 1 && (
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={agregarOpcionManual}
                                        className="mt-2 "
                                    >
                                        +
                                    </Button>
                                )}
                            </div>
                        ))}
                    </Form.Group>
                );

            case 'Verificación':
                return (
                    <Form.Group className="pb-2 w-100">
                        {opcionesVerificacion.map((opcion, index) => (
                            <div key={index} className="d-flex align-items-center py-2 border-bottom w-50">
                                {/* Cuadrado para checkbox */}
                                <div className="border me-2" style={{
                                    width: '18px',
                                    height: '18px',
                                    minWidth: '18px',
                                    borderColor: '#6c757d',
                                    borderRadius: '3px'
                                }}></div>

                                {/* Input */}
                                <Form.Control
                                    type="text"
                                    value={opcion}
                                    onChange={(e) => manejarCambioVerificacion(index, e.target.value)}
                                    placeholder={`Opción ${index + 1}`}
                                    className="fs-5 border-0 bg-transparent px-0 shadow-none flex-grow-1"
                                />

                                {/* Botón Eliminar (si hay más de 1 opción) */}
                                {opcionesVerificacion.length > 1 && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => eliminarOpcion(index, opcionesVerificacion, setOpcionesVerificacion)}
                                        className="ms-3"
                                    >
                                        ×
                                    </Button>
                                )}

                                {/* Botón Añadir (solo en la primera opción) */}
                                {opcionesVerificacion.length === 1 && index === 0 && (
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => setOpcionesVerificacion([...opcionesVerificacion, ''])}
                                        className="ms-3"
                                    >
                                        +
                                    </Button>
                                )}
                            </div>
                        ))}
                    </Form.Group>
                );

            case 'Desplegable':
                return (
                    <Form.Group className="pb-2">

                        {/* Editor de opciones */}
                        <div className="border rounded p-3 w-50">
                            {opcionesDesplegable.map((opcion, index) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    <span className="me-2 fw-bold" style={{ minWidth: '24px' }}>
                                        {index + 1}.
                                    </span>

                                    <Form.Control
                                        type="text"
                                        value={opcion}
                                        onChange={(e) => manejarCambioDesplegable(index, e.target.value)}
                                        placeholder={`Texto para la opción ${index + 1}`}
                                        className="fs-5 border-0 bg-transparent px-0 shadow-none flex-grow-1 border-bottom"
                                    />

                                    {/* Botón Eliminar (si hay más de 1 opción) */}
                                    {opcionesDesplegable.length > 1 && (
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => eliminarOpcion(index, opcionesDesplegable, setOpcionesDesplegable)}
                                            className="ms-2"
                                        >
                                            ×
                                        </Button>
                                    )}

                                    {/* Botón Añadir (solo en la primera opción) */}
                                    {opcionesDesplegable.length === 1 && index === 0 && (
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => setOpcionesDesplegable([...opcionesDesplegable, ''])}
                                            className="ms-2"
                                        >
                                            +
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                );

            case 'Archivos':
                return (
                    <Form.Group className="pb-2 mb-3 w-50">

                        <Row className='mb-3'>
                            <Col md={6}>
                                <Form.Label>Tamaño máximo por archivo:</Form.Label>
                                <Form.Select
                                    value={configArchivos.tamanoMaximo}
                                    onChange={(e) => setConfigArchivos({ ...configArchivos, tamanoMaximo: e.target.value })}
                                    className="fs-5"
                                >
                                    <option value="1mb">1 MB</option>
                                    <option value="10mb">10 MB</option>
                                    <option value="100mb">100 MB</option>
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label>Cantidad máxima de archivos:</Form.Label>
                                <Form.Select
                                    value={configArchivos.cantidadMaxima}
                                    onChange={(e) => setConfigArchivos({ ...configArchivos, cantidadMaxima: e.target.value })}
                                    className="fs-5"
                                >
                                    <option value="1">1</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Label>Tipos de archivo permitidos:</Form.Label>
                            <div className="d-flex flex-wrap gap-4 mt-2">
                                {[
                                    { value: "image", label: "JPG/PNG" },
                                    { value: "pdf", label: "PDF" },
                                    { value: "doc", label: "DOC" },
                                    { value: "excel", label: "EXCEL" },
                                    { value: "video", label: "MP4" },
                                    { value: "audio", label: "MP3" },


                                ].map((tipo) => (
                                    <Form.Check
                                        key={tipo.value}
                                        type="checkbox"
                                        id={`tipo-archivo-${tipo.value}`}
                                        label={tipo.label}
                                        checked={configArchivos.tiposPermitidos.includes(tipo.value)}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setConfigArchivos(prev => ({
                                                ...prev,
                                                tiposPermitidos: isChecked
                                                    ? [...prev.tiposPermitidos, tipo.value]
                                                    : prev.tiposPermitidos.filter(t => t !== tipo.value)
                                            }));
                                        }}
                                        className="fs-5"
                                    />
                                ))}
                            </div>
                        </Row>

                    </Form.Group>
                );

            case 'Escala':
                return (
                    <Form.Group className="pb-2 mb-3">
                        <Row className="align-items-center"> {/* Añade align-items-center para vertical alignment */}
                            {/* Columna para los números de la escala */}
                            <Col md={1} className="pe-0"> {/* Reducido a md={2} y pe-0 para quitar padding derecho */}
                                <div className="d-flex flex-column gap-2"> {/* Usa flex-column y gap para espaciado */}
                                    <Form.Control
                                        type="number"
                                        value={rangoEscala.min}
                                        onChange={(e) => setRangoEscala({ ...rangoEscala, min: parseInt(e.target.value) || 0 })}
                                        className="fs-5"
                                       
                                    />
                                    <div className="text-center">Al</div> {/* Texto centrado */}
                                    <Form.Control
                                        type="number"
                                        value={rangoEscala.max}
                                        onChange={(e) => setRangoEscala({ ...rangoEscala, max: parseInt(e.target.value) || 10 })}
                                        className="fs-5"
                                        
                                    />
                                </div>
                            </Col>

                            {/* Columna para las etiquetas */}
                            <Col md={5} className="ms-3"> {/* ps-1 para pequeño padding izquierdo */}
                                <div className="d-flex flex-column gap-5"> {/* Mismo gap que la columna numérica */}
                                    <div className='border-bottom'>
                                        <Form.Control
                                            type="text"
                                            value={rangoEscala.etiquetaMin || ''}
                                            onChange={(e) => setRangoEscala({ ...rangoEscala, etiquetaMin: e.target.value })}
                                            placeholder='Ej: Malo'
                                            className="fs-5 border-0 bg-transparent px-0 shadow-none w-100"
                                        />
                                    </div>
                                    <div className='border-bottom'>
                                        <Form.Control
                                            type="text"
                                            value={rangoEscala.etiquetaMax || ''}
                                            onChange={(e) => setRangoEscala({ ...rangoEscala, etiquetaMax: e.target.value })}
                                            placeholder='Ej: Excelente'
                                            className="fs-5 border-0 bg-transparent px-0 shadow-none w-100"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>
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
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Select
                            value={tipoPregunta}
                            onChange={manejarCambioTipo}
                            className="InputEncuesta fs-4"
                        >
                            <option value="">Seleccionar Tipo</option>
                            <option value="Pregunta">Pregunta</option>
                            <option value="Fecha">Fecha</option>
                            <option value="Choise">Opción múltiple</option>
                            <option value="Verificación">Casillas de verificación</option>
                            <option value="Desplegable">Desplegable</option>
                            <option value="Archivos">Archivos</option>
                            <option value="Escala">Escala</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            {renderizarInput()}
        </Form>
    );
}

export default TypeQuestion;