import { Button, ButtonGroup, Dropdown, InputGroup, Form, Row, Col } from 'react-bootstrap';
import './BodyUserHome.css';
import { useEffect, useState } from 'react';
import GridCard from '../GridCard/GridCard';


function BodyUserHome() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const respuesta = await fetch('../../../../public/DataUserHome/category.json');
                const data = await respuesta.json();
                setCategories(data);
            } catch (error) {
                console.error('Error al cargar las categorias', error)
            }
        }
        loadCategories();
    }, []);

    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        loadSurveys();
    }, []);

    const loadSurveys = async () => {
        try {
            const answer = await fetch('../../../../public/DataUserHome/surveys.json');
            const data = await answer.json();
            setSurveys(data);
        } catch (error) {
            console.error('Error al cargar las encuestas', error)
        }
    }

    function handleSeleccion(cat) {
        if (cat === 'Todas') {
            loadSurveys();
        } else {
            getCategories(cat);
        }
    }

    function getCategories(nameCat) {

        const loadFilteredSurveys = async () => {
            try {
                const answer = await fetch('../../../../public/DataUserHome/surveys.json');
                const data = await answer.json();
                const filteredCategories = data.filter((item) => item.category === nameCat);
                setSurveys(filteredCategories);
            } catch (error) {
                console.error('Error al cargar las encuestas', error)
            }
        }

        loadFilteredSurveys();
    }

    function handleSeleccionOrder(orderBy) {
        if (orderBy === 'A-Z') {
            setSurveys([...surveys].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (orderBy === 'Z-A') {
            setSurveys([...surveys].sort((a, b) => b.name.localeCompare(a.name)));
        } else {
            console.log('filtar por Las mas nuevas');
        }
    }

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
            <GridCard surveys={surveys} />
        </div>
    )
}

export default BodyUserHome
