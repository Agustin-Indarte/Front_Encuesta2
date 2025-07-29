import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './SurveyTable.module.css';

function SurveyTable({ data, onSelect, onDelete }) {
  return (
    <div className={styles.tableContainer}>
      <Table striped bordered hover responsive className="mb-0"> {/* Quitamos la clase de módulo CSS aquí */}
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>FECHA</th>
            <th>CATEGORÍA</th>
            <th>ENCUESTA</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, i) => (
            <tr 
              key={s.id} 
              className={i % 2 ? styles.even : ''} 
              onClick={() => onSelect(s)}
            >
              <td>{s.id}</td>
              <td>{s.fecha}</td>
              <td>{s.categoria}</td>
              <td>{s.nombre}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={e => { 
                    e.stopPropagation(); 
                    onDelete(s); 
                  }}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SurveyTable;