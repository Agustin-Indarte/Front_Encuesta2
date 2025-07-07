import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './SurveyModal.module.css';

function SurveyModal({ show, onHide, survey, categories, onSave }) {
  const [formState, setFormState] = useState({ id: null, nombre: '', categoria: '' });

  useEffect(() => {
    if (survey) {
      setFormState({ id: survey.id, nombre: survey.nombre, categoria: survey.categoria });
    } else {
      setFormState({ id: null, nombre: '', categoria: '' });
    }
  }, [survey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formState.nombre || !formState.categoria) return;
    onSave(formState);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className={styles.header} closeButton>
        <Modal.Title>{survey ? 'Editar encuesta' : 'Crear encuesta'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>
        <Form>
          <Form.Group className="mb-3" controlId="surveyName">
            <Form.Label>Nombre de encuesta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa un título..."
              name="nombre"
              value={formState.nombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="surveyCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoria" value={formState.categoria} onChange={handleChange}>
              <option value="">Selecciona...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {survey ? 'Guardar' : 'Crear'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SurveyModal;
