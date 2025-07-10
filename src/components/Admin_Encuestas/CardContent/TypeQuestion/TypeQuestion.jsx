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

    // Manejar cambios en opciones de selección
    const manejarCambioOpcion = (indice, valor) => {
        const nuevasOpciones = [...opciones];
        nuevasOpciones[indice] = valor;
        setOpciones(nuevasOpciones);

        // Agregar nueva opción si la última no está vacía
        if (indice === opciones.length - 1 && valor.trim() !== '') {
            setOpciones([...opciones, '']);
        }
    };

    // Eliminar una opción
    const eliminarOpcion = (indice) => {
        if (opciones.length > 1) {
            const nuevasOpciones = opciones.filter((_, i) => i !== indice);
            setOpciones(nuevasOpciones);
        }
    };

    // Manejar cambios en opciones de desplegable
    const manejarCambioDesplegable = (indice, valor) => {
        const nuevasOpciones = [...opcionesDesplegable];
        nuevasOpciones[indice] = valor;
        setOpcionesDesplegable(nuevasOpciones);

        if (indice === opcionesDesplegable.length - 1 && valor.trim() !== '') {
            setOpcionesDesplegable([...opcionesDesplegable, '']);
        }
    };

    // Manejar cambios en opciones de verificación
    const manejarCambioVerificacion = (indice, valor) => {
        const nuevasOpciones = [...opcionesVerificacion];
        nuevasOpciones[indice] = valor;
        setOpcionesVerificacion(nuevasOpciones);

        if (indice === opcionesVerificacion.length - 1 && valor.trim() !== '') {
            setOpcionesVerificacion([...opcionesVerificacion, '']);
        }
    };

    // Renderizar el input según el tipo de pregunta
    const renderizarInput = () => {
        switch (tipoPregunta) {
            case 'Pregunta':
                return (
                    <Form.Group className="pb-2 mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Espacio para la respuesta"
                            className="fs-5"
                            disabled
                        />
                    </Form.Group>
                );

            case 'Fecha':
                return (
                    <Form.Group className="pb-2 mb-3">
                        <Form.Control
                            type="date"
                            placeholder="Seleccione una fecha"
                            className="fs-5 w-50"
                        />
                    </Form.Group>
                );

            case 'Choise':
                return (
                    <Form.Group className="pb-2 mb-3 w-100">
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
                                    style={{ boxShadow: 'none !important' }}
                                />

                                {/* Botón para eliminar (solo si hay más de una opción) */}
                                {opciones.length > 1 && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="ms-3"
                                        onClick={() => eliminarOpcion(index)}
                                        style={{
                                            lineHeight: '1',
                                            padding: '0.25rem 0.5rem',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        ×
                                    </Button>
                                )}
                            </div>
                        ))}
                    </Form.Group>
                );

            case 'Verificación':
                return (
                    <Form.Group className="pb-2 mb-3 w-100">
                        {opcionesVerificacion.map((opcion, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center py-2 border-bottom w-50"
                            >
                                {/* Indicador visual (cuadrado) para checkboxes */}
                                <div className="border me-2" style={{
                                    width: '18px',
                                    height: '18px',
                                    minWidth: '18px',
                                    borderColor: '#6c757d',
                                    borderRadius: '3px' // Menos redondeado que el radio
                                }}></div>

                                {/* Input para el texto de la opción */}
                                <Form.Control
                                    type="text"
                                    value={opcion}
                                    onChange={(e) => manejarCambioVerificacion(index, e.target.value)}
                                    placeholder={`Opción ${index + 1}`}
                                    className="fs-5 border-0 bg-transparent px-0 shadow-none flex-grow-1"
                                    style={{ boxShadow: 'none !important' }}
                                />

                                {/* Botón para eliminar (solo si hay más de una opción) */}
                                {opcionesVerificacion.length > 1 && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="ms-3"
                                        onClick={() => {
                                            const nuevasOpciones = [...opcionesVerificacion];
                                            nuevasOpciones.splice(index, 1);
                                            setOpcionesVerificacion(nuevasOpciones);
                                        }}
                                        style={{
                                            lineHeight: '1',
                                            padding: '0.25rem 0.5rem',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        ×
                                    </Button>
                                )}
                            </div>
                        ))}
                    </Form.Group>
                );

            case 'Desplegable':
  return (
    <Form.Group className="pb-2 mb-3">
      {/* Vista previa del desplegable */}
      <Form.Select className="fs-5 mb-3" disabled>
        <option value="">Vista previa del desplegable</option>
        {opcionesDesplegable
          .filter(opcion => opcion.trim() !== '')
          .map((opcion, index) => (
            <option key={index} value={opcion}>
              {index + 1}. {opcion}
            </option>
          ))}
      </Form.Select>

      {/* Editor de opciones */}
      <div className="border rounded p-3">
        {opcionesDesplegable.map((opcion, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            {/* Número de opción */}
            <span className="me-2 fw-bold" style={{ minWidth: '24px' }}>
              {index + 1}.
            </span>
            
            {/* Input para el texto de la opción */}
            <Form.Control
              type="text"
              value={opcion}
              onChange={(e) => manejarCambioDesplegable(index, e.target.value)}
              placeholder={`Texto para la opción ${index + 1}`}
              className="fs-5 border-0 bg-transparent px-0 shadow-none flex-grow-1"
              style={{ boxShadow: 'none !important' }}
            />

            {/* Botón para eliminar (solo si hay más de una opción) */}
            {opcionesDesplegable.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-2"
                onClick={() => {
                  const nuevasOpciones = [...opcionesDesplegable];
                  nuevasOpciones.splice(index, 1);
                  setOpcionesDesplegable(nuevasOpciones);
                }}
                style={{
                  lineHeight: '1',
                  padding: '0.2rem 0.4rem',
                  fontSize: '0.75rem'
                }}
              >
                ×
              </Button>
            )}
          </div>
        ))}
      </div>
    </Form.Group>
  );

            case 'Archivos':
                return (
                    <Form.Group className="pb-2 mb-3">
                        <div className="mb-3">
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
                        </div>

                        <div className="mb-3">
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
                        </div>

                        <div className="mb-3">
                            <Form.Label>Tipos de archivo permitidos:</Form.Label>
                            <Form.Select
                                multiple
                                value={configArchivos.tiposPermitidos}
                                onChange={(e) => {
                                    const options = [...e.target.selectedOptions];
                                    const values = options.map(option => option.value);
                                    setConfigArchivos({ ...configArchivos, tiposPermitidos: values });
                                }}
                                className="fs-5"
                            >
                                <option value="pdf">PDF</option>
                                <option value="doc">Documentos (DOC/DOCX)</option>
                                <option value="image">Imágenes (JPG/PNG)</option>
                                <option value="video">Videos (MP4)</option>
                                <option value="audio">Audio (MP3)</option>
                                <option value="excel">Excel (XLS/XLSX)</option>
                            </Form.Select>
                        </div>

                        <Form.Control type="file" className="fs-5" />
                    </Form.Group>
                );

            case 'Escala':
                return (
                    <Form.Group className="pb-2 mb-3">
                        <div className="d-flex align-items-center mb-3">
                            <Form.Control
                                type="number"
                                value={rangoEscala.min}
                                onChange={(e) => setRangoEscala({ ...rangoEscala, min: parseInt(e.target.value) || 0 })}
                                className="fs-5 me-2"
                                style={{ width: '100px' }}
                            />
                            <span className="mx-2">a</span>
                            <Form.Control
                                type="number"
                                value={rangoEscala.max}
                                onChange={(e) => setRangoEscala({ ...rangoEscala, max: parseInt(e.target.value) || 10 })}
                                className="fs-5 me-2"
                                style={{ width: '100px' }}
                            />
                        </div>
                        <div>
                            <Form.Range
                                min={rangoEscala.min}
                                max={rangoEscala.max}
                                className="w-100"
                            />
                        </div>
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