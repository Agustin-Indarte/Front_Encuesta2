import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navegacion = useNavigate();

  const onSubmit = (usuario) => {
    // Normalizamos
    const email = usuario.email?.trim().toLowerCase();
    const password = usuario.password?.trim();
    // Admin hardcodeado
    if (email === "admin@gmail.com" && password === "12345678") {
      setUsuarioLogueado({ email, nombre: "Administrador" });
      sessionStorage.setItem(
        "userKey",
        JSON.stringify({ email, nombre: "Administrador" })
      );
      alert("Logueado correctamente");
      navegacion("/admin/home");
      return;
    }
    // Usuarios comunes
    const users = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setUsuarioLogueado(user);
      sessionStorage.setItem("userKey", JSON.stringify(user));
      alert("Logueado correctamente");
      navegacion("/user/home");
    } else {
      alert("Email o contraseña incorrecta");
    }
  };
  return (
    <div className="ContainerFormRegister  d-flex flex-column align-items-center justify-content-center">
      <img
        src="/img/Logo_Azul.png"
        alt="Logo Azul"
        className="mb-4 "
        style={{ maxWidth: "400px", width: "50%" }}
      />
      <h4 className="fs-5 text-white mb-4 text-center">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="fs2">
          Registrate
        </Link>
      </h4>
      <Card className="login-card">
        <Card.Body>
          <Card.Title className="login-title">Iniciar Sesión</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4" controlId="formGroupEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ejemplo@gmail.com"
                className="form-input"
                {...register("email", {
                  required: "El mail es un dato obligatorio",
                  minLength: {
                    value: 11,
                    message: "Debe ingresar como mínimo 11 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "Debe ingresar como máximo 50 caracteres",
                  },
                })}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-4" controlId="formGroupPassword">
              <Form.Label className="form-label">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ejemplo123"
                className="form-input"
                {...register("password", {
                  required: "La contraseña es un campo obligatorio",
                  minLength: {
                    value: 8,
                    message: "Debe ingresar como mínimo 8 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Debe ingresar como máximo 20 caracteres",
                  },
                })}
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>{" "}
            <div className="text-center">
              <Button type="submit" variant="primary" className="login-button">
                Iniciar Sesión
              </Button>
              <div className="text-center mt-3">
                <Link to="/recuperar" className="forgot-password-link">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <p className="text-center text-sm mb-0 mt-4">
        <Link to="/" className="text-blue-600 hover:underline fs-5">
          Volver al inicio
        </Link>
      </p>
    </div>
  );
};

export default Login;
