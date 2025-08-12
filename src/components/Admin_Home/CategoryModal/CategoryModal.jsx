import React, { useState } from 'react';
import { Modal, Button, FormControl, Table, Row, Col } from 'react-bootstrap';
import styles from './CategoryModal.module.css';
import {crearCategoria} from '../../../api';

function CategoryModal({ show, onHide, categories, onSave, onDelete, categoriesLoaded }) {
  const [name, setName] = useState('');

  const handleSave = async () => {
    if (name.trim()) {
      await crearCategoria(name);
    alert('Categoria enviada correctamente al backend');
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName={styles.modalWidth} // Clase adicional para controlar el ancho
      className='d-flex justify-content-center align-items-center'
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>GESTIÓN DE CATEGORÍAS</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>




        {categories.length === 0 ? (
          <div className={styles.emptyMessage}>
            <p>No hay categorías registradas</p>
            <small>Comience agregando una nueva categoría</small>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <Table striped bordered hover size="sm" className={styles.categoryTable}>
              <thead>
                <tr>
                  <th className={styles.idColumn}>ID</th>
                  <th className={styles.dateColumn}>FECHA</th>
                  <th className={styles.nameColumn}>NOMBRE</th>
                  <th className={styles.actionsColumn}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.fecha}</td>
                    <td>{c.nombre.toUpperCase()}</td>
                    <td  className='text-center'>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(c)}
                        className={styles.deleteBtn}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <div className='w-100'>
          <div className="input-group">
            <FormControl
              placeholder="Nueva Categoría"
              value={name}
              onChange={e => setName(e.target.value)}
              className={styles.formControl}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            />
            <div className="input-group-append">
              <Button
                variant="primary"
                onClick={handleSave}
                className={styles.saveButton}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;