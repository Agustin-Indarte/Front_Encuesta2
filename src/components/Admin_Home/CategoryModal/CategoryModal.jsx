import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CategoryModal({ show, onHide, categories, onSave, onDelete }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    onSave(categoryName);
    setCategoryName('');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Categorías</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nueva categoría</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Ingrese nombre"
            />
          </Form.Group>
        </Form>
        <ul>
          {categories.map(cat => (
            <li key={cat._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{cat.nombre}</span>
              <Button variant="danger" size="sm" onClick={() => onDelete(cat)}>Eliminar</Button>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button variant="primary" onClick={handleSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;

