import { Button, ButtonGroup, Dropdown, InputGroup,Form } from 'react-bootstrap';
import './HeaderUserHome.css';
import { useEffect, useState } from 'react';


function HeaderUserHome() {

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

  return (
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
                        <Dropdown.Item  href="#/action-1">A-Z</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Z-A</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Los mas nuevos</Dropdown.Item>
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
                        {
                            categories.map((cat) =>(
                                  <Dropdown.Item key={cat.id} href={`#/categorias/${cat.nombre}`}>{cat.nombre}</Dropdown.Item>
                            ))
                        }
                      
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    </div>
  )
}

export default HeaderUserHome
