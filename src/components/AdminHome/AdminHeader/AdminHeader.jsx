import React from 'react';
import { Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa'; // Icono de reloj
import styles from './AdminHeader.module.css';

function AdminHeader({
  onSearch,
  onNewSurvey,
  onOpenCategory,
  onSortAZ,
  onSortByDate
}) {
  return (
    <div className={styles.header}>

      {/* ORDENAR - IZQUIERDA */}
      <div className={styles.sortOptions}>
        <span className={styles.sortLabel}>Ordenar por:</span>
        <button className={styles.sortButton} onClick={onSortAZ}>A-Z</button>
        <button className={styles.sortButton} onClick={onSortByDate}>
          <FaClock style={{ marginRight: '5px' }} />
          
        </button>
      </div>

      {/* LADO DERECHO */}
      <div className={styles.rightContent}>

        {/* BOTONES SUPERIORES */}
        <div className={styles.topButtons}>
          <Button className={styles.btnAzul} onClick={onNewSurvey}>CREAR ENCUESTA</Button>
          <Button className={styles.btnAzul} onClick={onOpenCategory}>ADMINISTRAR CATEGORÍAS</Button>
        </div>

        {/* BUSCADOR Y CATEGORÍAS */}
        <div className={styles.bottomRow}>
          <InputGroup className={styles.inputGroup}>
            <FormControl
              placeholder="BUSCAR"
              onChange={e => onSearch(e.target.value)}
              className={styles.inputAzul}
            />
            <Button className={styles.btnAzul}>🔍</Button>
          </InputGroup>

          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle className={styles.btnAzul}>
              CATEGORÍAS
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Categoría A</Dropdown.Item>
              {/* Podés agregar categorías dinámicas si querés */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
