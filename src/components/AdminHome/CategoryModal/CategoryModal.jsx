import React, { useState } from 'react';
import { Modal, Button, FormControl, Table } from 'react-bootstrap';
import styles from './CategoryModal.module.css';

function CategoryModal({ show, onHide, categories, onSave, onDelete }) {
  const [name, setName] = useState('');
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton><Modal.Title>NUEVA CATEGORÍA</Modal.Title></Modal.Header>
      <Modal.Body>
        <FormControl placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} className="mb-3" />
        <Table striped bordered hover size="sm">
          <thead className={styles.thead}><tr><th>ID</th><th>FECHA</th><th>NOMBRE</th><th>ACCIONES</th></tr></thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td><td>{c.fecha}</td><td>{c.nombre.toUpperCase()}</td>
                <td><Button variant="danger" size="sm" onClick={() => onDelete(c)}>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onSave(name)}>GUARDAR</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;
