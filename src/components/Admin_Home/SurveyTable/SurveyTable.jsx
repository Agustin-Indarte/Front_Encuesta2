// src/components/Admin_Home/SurveyTable/SurveyTable.jsx
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './SurveyTable.module.css';
import Switch from '../../Switch/Switch';
import { useNavigate } from 'react-router-dom';

function SurveyTable({ data = [], onSelect, onDelete, onToggleState }) {

  const navigate = useNavigate();
  return (
    <div className={styles.tableContainer}>
      <Table striped bordered hover responsive className="mb-0">
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>FECHA</th>
            <th>CATEGORÍA</th>
            <th>ENCUESTA</th>
            <th className='text-center'>ESTADO</th>
            <th className='text-center'>RESPUESTAS</th>
            <th className='text-center'>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No hay encuestas</td>
            </tr>
          ) : (
            data.map((s, i) => {
              const active = (s.estado || s.state || '').toLowerCase() === 'activa';
              const id = s._id || s.id;
              const fecha = s.fecha || s.date || (s.createdAt ? new Date(s.createdAt).toLocaleDateString('es-AR') : '');
              const categoria = s.categoria || s.category || 'General';
              const nombre = s.nombre || s.name;

              return (
                <tr
                  key={id}
                  className={i % 2 ? styles.even : ''}
                  onClick={() => onSelect && onSelect(s)}
                >
                  <td>{id}</td>
                  <td>{fecha}</td>
                  <td>{categoria}</td>
                  <td>{nombre}</td>
                  <td className='text-center'>
                    <Switch
                      checked={active}
                      onChange={() => onToggleState && onToggleState(s, !active)}
                    />
                  </td>
                  <td className='text-center'>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        navigate('/admin-respuestas', { state: { encuesta: s } });
                      }}
                    >
                      Ver
                    </Button>
                  </td>
                  <td className='text-center'>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        onDelete && onDelete(s);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default SurveyTable;
