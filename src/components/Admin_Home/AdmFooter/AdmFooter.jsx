import React, { useState } from 'react'; 
import { Button, Dropdown, Row, Col } from 'react-bootstrap';
import { FaSortAlphaDown, FaClock, FaSearch } from 'react-icons/fa';
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
      onSearch('');
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
      <Col md={4}>
        {isSearching ? (
          <input
            className="AdmHome-inputBuscar"
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
            className="w-100 fs-4 fw-bold bg-black border" 
            onClick={handleBuscarClick}
          >
            BUSCAR
            <FaSearch className='ms-3' size={20} />
          </Button>
        )}
      </Col>

      <Col md={4}>
        <Dropdown>
          <Dropdown.Toggle className='w-100 fs-4 fw-bold bg-black border'>
            CATEGORÍAS
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              onCategorySelect(null);
              onSearch('');
            }}>
              Todas
            </Dropdown.Item>
            {categories.map(cat => (
              <Dropdown.Item 
                key={cat._id} 
                onClick={() => {
                  onCategorySelect(cat.name);
                  onSearch('');
                }}
              >
                {cat.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col md={4}>
        <Dropdown>
          <Dropdown.Toggle className='w-100 fs-4 fw-bold bg-black border'>
            ORDENAR POR
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              onSortAZ();
              onSearch('');
            }}>
              <FaSortAlphaDown className="me-2" />
              Alfabéticamente
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              onSortByDate();
              onSearch('');
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
