// src/components/Admin_Home/AdmFooter/AdmFooter.jsx
import React, { useState } from 'react';
import { Button, Dropdown, Row, Col } from 'react-bootstrap';
import { FaSortAlphaDown, FaClock, FaSearch, FaBroom } from 'react-icons/fa';
import "./AdmHomeFooter.css";

function AdmFooter({
  onSearch,
  onSortAZ,
  onSortByDate,
  categories = [],
  onCategorySelect,
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

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
      onSearch(''); // Limpiar búsqueda
    }
  };

  const handleInputBlur = () => {
    if (searchText.trim() === '') {
      setIsSearching(false);
      onSearch('');
    }
  };

  const handleBuscarClick = () => {
    setIsSearching(true);
  };

  return (
    <Row className="w-100 mt-4">
      {/* Buscar encuesta */}
 <Col md={4} className="d-flex gap-2">
<Button
          className="fs-4 fw-bold bg-secondary border flex-shrink-0"
          style={{ width: '60px' }}
          title="Limpiar filtros"
          onClick={() => {
            setSearchText('');
            setIsSearching(false);
            onSearch('');
            onCategorySelect(null);
          }}
        >
          <FaBroom size={22} />
        </Button>
        <div className="flex-grow-1">
          {isSearching ? (
            <input
              className="AdmHome-inputBuscar w-100"
              type="text"
              value={searchText}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder="Buscar encuesta..."
              autoFocus
            />
          ) : (
            <Button
              className="w-100 fs-4 fw-bold bg-black border d-flex justify-content-center align-items-center"
              onClick={handleBuscarClick}
            >
              BUSCAR
              <FaSearch className='ms-3' size={22} />
            </Button>
          )}

        </div>
        
      </Col>

      {/* Filtrar por categoría */}
      <Col md={4}>
        <Dropdown>
          <Dropdown.Toggle className='w-100 fs-4 fw-bold bg-black border'>
            CATEGORÍAS
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              onCategorySelect(null);
              onSearch(''); // Limpiar búsqueda al cambiar categoría
            }}>
              Todas
            </Dropdown.Item>
            {categories.map(cat => (
              <Dropdown.Item
                key={cat._id}
                onClick={() => {
                  onCategorySelect(cat.name);
                  onSearch(''); // Limpiar búsqueda al cambiar categoría
                }}
              >
                {cat.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      {/* Ordenar encuestas */}
      <Col md={4}>
        <Dropdown>
          <Dropdown.Toggle className='w-100 fs-4 fw-bold bg-black border'>
            ORDENAR POR
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              onSortAZ();
              onSearch(''); // Limpiar búsqueda al ordenar
            }}>
              <FaSortAlphaDown className="me-2" />
              Alfabéticamente
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              onSortByDate();
              onSearch(''); // Limpiar búsqueda al ordenar
            }}>
              <FaClock className="me-2" />
              Más recientes
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>

     
    </Row>
  );
}

export default AdmFooter;


