import './Navbar.css';
import { Container, Navbar, Image, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

function NavBar() {
    const { user, logout } = useAuth();
    const [showLogout, setShowLogout] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    let nombre = user?.username || user?.nombre || 'Administrador';
    // Si el usuario es el admin, mostrar 'Administrador'
    if (user?.email === 'admin@gmail.com') {
        nombre = 'Administrador';
    }

    const openLogout = () => setShowLogout(true);
    const closeLogout = () => setShowLogout(false);
    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            navigate('/login', { replace: true });
        } finally {
            setIsLoggingOut(false);
            setShowLogout(false);
        }
    };

    return (
        <Navbar expand="md" className='custom-Navbar fixed-top shadow-lg justify-content-between'>
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand>

                    <Image src="/img/Logo_Azul.png" alt="Logo Azul" />

                </Navbar.Brand>

                {/* Perfil */}
                <div
                    className="Navbar-Perfil d-flex align-items-center justify-content-end"
                    onClick={openLogout}
                    role="button"
                    aria-label="Abrir confirmación de cierre de sesión"
                    style={{ cursor: 'pointer' }}
                >
                    <p className="text-light me-3 fs-4 fw-bold d-none d-md-block mb-0">{nombre}</p>
                    <Image src="/img/icon-perfil.png" className='me-2' alt="img-perfil" rounded />
                </div>
            </Container>

            {/* Modal de confirmación de cierre de sesión */}
            <Modal show={showLogout} onHide={closeLogout} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cerrar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Desea cerrar sesión?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeLogout} disabled={isLoggingOut}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmLogout} disabled={isLoggingOut}>Cerrar sesión</Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
}

export default NavBar;