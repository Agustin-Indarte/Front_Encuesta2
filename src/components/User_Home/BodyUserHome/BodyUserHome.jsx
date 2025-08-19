import { Button, ButtonGroup, Dropdown, InputGroup, Form, Row, Col } from 'react-bootstrap';
import './BodyUserHome.css';
import { useEffect, useState } from 'react';
import GridCard from '../GridCard/GridCard';
import { obtenerEncuestas } from '../../../api/apiAdministrador/Encuestas';
import { getCategories } from '../../../api/apiAdministrador/Category';

function BodyUserHome() {
    const [categories, setCategories] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [allSurveys, setAllSurveys] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerEncuestas();
                // Solo encuestas activas
                const activas = data.filter(s => (s.state || s.estado) === 'activa');
                setSurveys(activas);
                setAllSurveys(activas);
                const cats = await getCategories();
                setCategories(cats);
            } catch (error) {
                setSurveys([]);
                setAllSurveys([]);
                setCategories([]);
            }
        };
        fetchData();
    }, []);

    function handleSeleccion(cat) {
        setSelectedCategory(cat);
        let filtered = allSurveys;
        if (cat !== 'Todas') {
            filtered = filtered.filter((item) => {
                if (typeof item.category === 'object' && item.category !== null) {
                    return item.category.name === cat;
                }
                return (item.categoria || item.category) === cat;
            });
        }
        // Aplicar búsqueda si hay texto
        if (searchText.trim() !== '') {
            filtered = filtered.filter(s => getFirstCardTitle(s).toLowerCase().includes(searchText.toLowerCase()));
        }
        setSurveys(filtered);
    }

    function handleSeleccionOrder(orderBy) {
        let sorted = [...surveys];
        if (orderBy === 'A-Z') {
            sorted.sort((a, b) => getFirstCardTitle(a).localeCompare(getFirstCardTitle(b)));
        } else if (orderBy === 'Z-A') {
            sorted.sort((a, b) => getFirstCardTitle(b).localeCompare(getFirstCardTitle(a)));
        } else {
            sorted.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        }
        setSurveys(sorted);
    }

    function handleSearch(e) {
        setSearchText(e.target.value);
        let filtered = allSurveys;
        if (selectedCategory !== 'Todas') {
            filtered = filtered.filter((item) => {
                if (typeof item.category === 'object' && item.category !== null) {
                    return item.category.name === selectedCategory;
                }
                return (item.categoria || item.category) === selectedCategory;
            });
        }
        if (e.target.value.trim() !== '') {
            filtered = filtered.filter(s => getFirstCardTitle(s).toLowerCase().includes(e.target.value.toLowerCase()));
        }
        setSurveys(filtered);
    }

    // Helpers para extraer datos de la primera card tipo "text"
    function getFirstCard(survey) {
        return survey.cards?.find(card => card.type === 'text') || {};
    }
    function getFirstCardTitle(survey) {
        return getFirstCard(survey).content?.title || survey.name || '';
    }
    function getFirstCardDescription(survey) {
        return getFirstCard(survey).content?.description || '';
    }
    function getImage(survey) {
        return survey.imagen || survey.image || 'https://via.placeholder.com/150';
    }

    const gridSurveys = surveys.map(s => ({
        id: s._id || s.id,
        name: s.name,
        description: getFirstCardDescription(s),
        image: getImage(s),
        category:
            (typeof s.categoria === 'object' && s.categoria !== null && s.categoria.name) ||
            (typeof s.category === 'object' && s.category !== null && s.category.name) ||
            s.category ||
            '',
        cards: s.cards 
    }));

    return (
        <div className='container_body'>
            <Row className="w-100 mb-4">
                <Col md={4} className=' ms-3 d-flex align-items-center justify-content-end '>
                    <h2 className='title-page mb-0'>NUESTRAS ENCUESTAS</h2>
                </Col>
                <Col md={4}>
                    <InputGroup>
                        <Form.Control
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                            placeholder="Buscar encuesta"
                            value={searchText}
                            onChange={handleSearch}
                        />
                        <Button className='btn-buscar' id="button-addon1" onClick={() => handleSearch({target: {value: searchText}})}>
                            Buscar
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={3} className='d-flex gap-2'>
                    <div className='w-50'>
                        <Dropdown as={ButtonGroup} className='w-100'>
                            <Button variant='secondary'>Ordenar por:</Button>
                            <Dropdown.Toggle split variant='secondary' id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSeleccionOrder('A-Z')}>A-Z</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSeleccionOrder('Z-A')}>Z-A</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSeleccionOrder('Los mas nuevos')}>Los más nuevos</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='w-50'>
                        <Dropdown className='w-100'>
                            <Dropdown.Toggle variant='secondary' id="dropdown-basic" className='w-100'>
                                Categorías
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSeleccion('Todas')}>Todas</Dropdown.Item>
                                {categories.map((cat) => (
                                    <Dropdown.Item
                                        key={cat._id}
                                        onClick={() => handleSeleccion(cat.name)}>
                                        {cat.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>
            </Row>
            <GridCard surveys={gridSurveys} />
        </div>
    )
}

export default BodyUserHome
