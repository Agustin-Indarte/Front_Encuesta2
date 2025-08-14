import { Button, ButtonGroup, Dropdown, InputGroup, Form, Row, Col } from 'react-bootstrap';
import './BodyUserHome.css';
import { useEffect, useState } from 'react';
import GridCard from '../GridCard/GridCard';
import {useCategories} from '../../../context/EncuestasContext'
import { obtenerEncuestas } from '../../../api/apiAdministrador/Encuestas';

function BodyUserHome() {
    const { categories } = useCategories();
    const [surveys, setSurveys] = useState([]);
    const [allSurveys, setAllSurveys] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const data = await obtenerEncuestas();
                setSurveys(data);
                setAllSurveys(data);
            } catch (error) {
                setSurveys([]);
                setAllSurveys([]);
            }
        };
        fetchSurveys();
    }, []);

    function handleSeleccion(cat) {
        if (cat === 'Todas') {
            setSurveys(allSurveys);
        } else {
            const filtered = allSurveys.filter((item) => {
                if (typeof item.category === 'object' && item.category !== null) {
                    return item.category.nombre === cat;
                }
                return (item.categoria || item.category) === cat;
            });
            setSurveys(filtered);
        }
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
            (typeof s.categoria === 'object' && s.categoria !== null && s.categoria.nombre) ||
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
                        />
                        <Button className='btn-buscar' id="button-addon1">
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
                                <Dropdown.Item href="#/action-1" onClick={() => handleSeleccionOrder('A-Z')}>A-Z</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={() => handleSeleccionOrder('Z-A')}>Z-A</Dropdown.Item>
                                <Dropdown.Item href="#/action-3" onClick={() => handleSeleccionOrder('Los mas nuevos')}>Los más nuevos</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='w-50'>
                        <Dropdown className='w-100'>
                            <Dropdown.Toggle variant='secondary' id="dropdown-basic" className='w-100'>
                                Categorías
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href={`#/`} onClick={() => handleSeleccion('Todas')}>Todas</Dropdown.Item>
                                {categories.map((cat) => (
                                    <Dropdown.Item
                                        key={cat.id}
                                        href={`#/categorias/${cat.nombre}`}
                                        onClick={() => handleSeleccion(cat.nombre)}>
                                        {cat.nombre}
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
