import React, {useState} from 'react';
import { Form, Row, Col,ToggleButtonGroup, ToggleButton } from 'react-bootstrap';



function RespQuestion({ content }) {

  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const renderResponseView = () => {
    switch (content.questionType) {
      case 'Choice':
      case 'Verificación':
        return (
          <div className="mt-1">
            <Row>
              {content.options?.map((option, index) => (
                <Col xs={12} sm={6} md={4} key={index}>
                  <Form.Check
                    type={content.questionType === 'Verificación' ? 'checkbox' : 'radio'}
                    name={`q-${content.id}`}
                    label={option}
                  />
                </Col>
              ))}
            </Row>
          </div>
        );

      case 'Desplegable':
        return (
          <div className="mt-1">
            <Form.Select name={`q-${content.id}`} className='py-3 w-75'>
              <option value="">Seleccione una opción</option>
              {content.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>
        );

      case 'Escala':
        return (
           <div className="mt-2">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <span className="fw-bold">{content.labelMin || content.min}</span>
        <div className="d-flex gap-2 flex-wrap">
          {[...Array(content.max - content.min + 1)].map((_, i) => {
            const value = content.min + i;
            const isChecked = selectedValue === value;
            return (
              <Form.Check
                key={i}
                type="radio"
                name={`scale-${content.id}`}
                id={`scale-${content.id}-${value}`}
                checked={isChecked}
                onChange={() => handleChange(value)}
                label={
                  <div
                    className={`d-flex align-items-center justify-content-center rounded-circle border border-2`}
                    style={{
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: isChecked ? '#0d6efd' : 'transparent',
                      color: isChecked ? 'white' : 'inherit',
                      borderColor: isChecked ? '#0d6efd' : undefined,
                    }}
                  >
                    {value}
                  </div>
                }
                className="p-0 m-0 scale-radio"
              />
            );
          })}
        </div>
        <span className="fw-bold">{content.labelMax || content.max}</span>
      </div>

      <style>
        {`
          .scale-radio input[type="radio"] {
            display: none;
          }
        `}
      </style>
    </div>
        );

      case 'Archivos':
        return (
          <div className="mt-1">
            <Form.Control type="file" multiple className='my-2 w-75' />
            <small className="text-muted ms-2">
              Tamaño máximo: {content.fileConfig?.maxSize} MB
            </small>
            <br />
            <small className="text-muted ms-2">
              Cantidad máxima: {content.fileConfig?.maxFiles}
            </small>
          </div>
        );

      case 'Fecha':
        return (
          <div className="mt-1">
            <Form.Control type="date" className='py-3 fs-5' />
          </div>
        );

      case 'Pregunta':
        return (
          <div className="mt-1">
            <Form.Control
              as="textarea"
              rows={3}
              className="py-3 fs-5"
              placeholder="Escribe tu respuesta aquí"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Form>
      <h5 className="mb-3 fs-4">{content.questionText}</h5>
      {renderResponseView()}
    </Form>
  );
}

export default RespQuestion;