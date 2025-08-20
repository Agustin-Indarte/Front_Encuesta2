import React, { useState } from 'react';
import { Modal, Button, Form, Table, Row, Col } from 'react-bootstrap';

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
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Administrar Categorías</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={9}>
              <Form.Group className="mb-3">
                
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre de la categoría"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Button variant="primary" onClick={handleSave}>
                Agregar
              </Button>
            </Col>
          </Row>


        </Form>

        <Table striped bordered hover responsive className="mt-1">
          <thead>
            <tr>
              <th className='bg-primary text-white'>ID</th>
              <th  className='bg-primary text-white'>Nombre</th>
              <th  className='bg-primary text-white'>Acciones</th>
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

    </Modal>
  );
}

export default CategoryModal;


