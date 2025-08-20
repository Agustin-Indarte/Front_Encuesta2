import './Navbar.css';
import { Container, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';

function NavBar() {
    const { user } = useAuth();
    let nombre = user?.username || user?.nombre || 'Administrador';
    // Si el usuario es el admin, mostrar 'Administrador'
    if (user?.email === 'admin@gmail.com') {
        nombre = 'Administrador';
    }

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
                    <p className="text-light me-3 fs-4 fw-bold d-none d-md-block mb-0">{nombre}</p>
                    <Image src="/img/icon-perfil.png" className='me-2' alt="img-perfil" rounded />
                </div>
            </Container>
        </Navbar>
    );
}

export default NavBar;