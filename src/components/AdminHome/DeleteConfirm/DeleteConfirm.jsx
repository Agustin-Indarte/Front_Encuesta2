// src/components/AdminHome/DeleteConfirm.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './DeleteConfirm.module.css';

function DeleteConfirm({ show, onHide, onConfirm, message = '¿Estás seguro?' }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={styles.header}>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>{message}</Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => { onConfirm(); onHide(); }}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirm;
