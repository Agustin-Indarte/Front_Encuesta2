import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FaClock, FaSearch } from 'react-icons/fa';
import styles from './AdminHeader.module.css';

function AdminHeader({
  onSearch,
  onNewSurvey,
  onOpenCategory,
  onSortAZ,
  onSortByDate,
  categories = [],
  onCategorySelect,
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleBuscarClick = () => {
    setIsSearching(true);
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchText.trim());
      setIsSearching(false);
    } else if (e.key === 'Escape') {
      setIsSearching(false);
      setSearchText('');
      onSearch(''); // opcional: limpiar búsqueda
    }
  };

  const handleInputBlur = () => {
    // Al perder foco se cierra el input (opcional)
    setIsSearching(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.sortSection}>
        <span className={styles.sortLabel}>Ordenar por:</span>
        <button className={styles.sortButton} onClick={onSortAZ}>A-Z</button>
        <button className={styles.sortButton} onClick={onSortByDate}>
          <FaClock style={{ marginRight: '6px', fontSize: '14px' }} />
          
        </button>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.buttonGroup}>
          <div className={styles.topButtons}>
            <Button className={styles.btnAzul} onClick={onNewSurvey}>CREAR ENCUESTA</Button>
            <Button className={styles.btnAzul} onClick={onOpenCategory}>ADMINISTRAR CATEGORÍAS</Button>
          </div>

          <div className={styles.bottomRow}>
            {isSearching ? (
              <input
                className={styles.inputBuscar}
                type="text"
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onBlur={handleInputBlur}
                placeholder="Buscar encuesta..."
                autoFocus
              />
            ) : (
              <Button className={styles.btnAzul} onClick={handleBuscarClick}>
                BUSCAR
                <FaSearch style={{ marginLeft: '6px', fontSize: '14px' }} />
              </Button>
            )}

            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.btnAzul}>
                CATEGORÍAS
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => onCategorySelect(null)}>Todas</Dropdown.Item>
                {categories.map(cat => (
                  <Dropdown.Item key={cat.id} onClick={() => onCategorySelect(cat.nombre)}>
                    {cat.nombre}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
