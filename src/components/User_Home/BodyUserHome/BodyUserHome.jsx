import { Button, ButtonGroup, Dropdown, InputGroup,Form } from 'react-bootstrap';
import './BodyUserHome.css';
import { useEffect, useState } from 'react';
import GridCard from '../GridCard/GridCard';


function BodyUserHome() {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
       const loadCategories = async () =>{
            try {
                const respuesta = await fetch('../../../../public/DataUserHome/category.json');
                const data = await respuesta.json();
                setCategories(data);
            } catch (error) {
                console.error('Error al cargar las categorias', error)
            }
       }
       loadCategories();
    },[]);

    const [surveys, setSurveys] = useState([]);

    useEffect(() =>{
        loadSurveys();
    },[]); 

    const loadSurveys = async () =>{
            try {
                const answer = await fetch('../../../../public/DataUserHome/surveys.json');
                const data = await answer.json();
                setSurveys(data);
            } catch (error) {
                console.error('Error al cargar las encuestas', error)
            }
        }

    function handleSeleccion(cat) {
        if(cat==='Todas'){
            loadSurveys();
        }else{
            getCategories(cat);
        }     
    }

    function getCategories(nameCat){
        
        const loadFilteredSurveys = async () =>{
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

    function handleSeleccionOrder(orderBy){
        if(orderBy === 'A-Z'){
            setSurveys([...surveys].sort((a, b) => a.name.localeCompare(b.name)));
        }else if(orderBy === 'Z-A'){
            setSurveys([...surveys].sort((a, b) => b.name.localeCompare(a.name)));
        }else{
            console.log('filtar por Las mas nuevas');
        }
    }

  return (
    <div className='container_body'>
        <div className='container my-5'>
            <div className='row'>
                <div className='col-12'>
                    <h1>NUESTRAS ENCUESTAS</h1>
                </div>
            </div>
            <div className='row my-4'>
                <div className='col-md-3 col-sm-12 mb-2'>
                    <Dropdown as={ButtonGroup} >
                        <Button variant='secondary'>Ordenar por:</Button>

                        <Dropdown.Toggle split variant='secondary' id="dropdown-split-basic" />

                        <Dropdown.Menu >
                            <Dropdown.Item  href="#/action-1" onClick={() => handleSeleccionOrder('A-Z')}>A-Z</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={() => handleSeleccionOrder('Z-A')}>Z-A</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" onClick={() => handleSeleccionOrder('Los mas nuevos')}>Los mas nuevos</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='col-md-6 col-sm-12 mb-2'>
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
                </div>
                <div className='col-md-3 col-sm-12 mb-2'>
                    <Dropdown>
                        <Dropdown.Toggle variant='secondary' id="dropdown-basic">
                            Categorias
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item 
                                    href={`#/`}
                                    onClick={() => handleSeleccion('Todas')} >
                                        Todas
                            </Dropdown.Item>
                            {   
                                categories.map((cat) =>(
                                    <Dropdown.Item 
                                    key={cat.id} 
                                    href={`#/categorias/${cat.nombre}`}
                                    onClick={() => handleSeleccion(cat.nombre)} >
                                        {cat.nombre}
                                    </Dropdown.Item>
                                ))
                            }
                        
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>

        <GridCard surveys={surveys}/>
    </div>
  )
}

export default BodyUserHome
