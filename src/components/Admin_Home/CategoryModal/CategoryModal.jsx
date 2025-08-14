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
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat._id}>
                <td>{cat._id}</td>
                <td>{cat.name}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => onDelete(cat)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button variant="primary" onClick={handleSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;

