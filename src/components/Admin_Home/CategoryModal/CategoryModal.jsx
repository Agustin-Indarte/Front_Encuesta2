import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

function CategoryModal({ show, onHide, categories, onSave, onDelete }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = async () => {
    if (!categoryName.trim()) return;
    await onSave(categoryName.trim());
    setCategoryName('');
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSave();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Categorías</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nueva categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese nombre"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSave}>
            Agregar
          </Button>
        </Form>

        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat._id}</td>
                <td>{cat.name}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(cat)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;


