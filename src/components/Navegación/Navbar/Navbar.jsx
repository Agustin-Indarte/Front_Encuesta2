import './Navbar.css';
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

function NavBar({ usuario }) {
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if (usuario && usuario.nombre) {
            setNombre(usuario.nombre);
        } else {
            // Intentar recuperar de sessionStorage
            const user = JSON.parse(sessionStorage.getItem('userKey'));
            if (user && user.nombre) setNombre(user.nombre);
        }
    }, [usuario]);

    return (
        <Navbar expand="md" className='custom-Navbar fixed-top shadow-lg justify-content-between'>
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand>
                    <Link to="/" className="navbar-brand">
                        <Image src="/img/Logo_Azul.png" alt="Logo Azul" />
                    </Link>
                </Navbar.Brand>

                {/* Perfil */}
                <div
                    className="Navbar-Perfil d-flex align-items-center justify-content-end"
                >
                    <p className="text-light me-3 fs-4 fw-bold d-none d-md-block mb-0">{nombre || 'Usuario'}</p>
                    <Image src="/img/icon-perfil.png" className='me-2' alt="img-perfil" rounded />
                </div>
            </Container>
        </Navbar>
    );
}

export default NavBar;