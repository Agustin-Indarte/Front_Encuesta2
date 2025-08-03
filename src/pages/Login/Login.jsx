import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../../helpers/queries.js";
import { useNavigate } from "react-router";
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
    if (login(usuario)) {
      setUsuarioLogueado(usuario.email);
      alert("Logueado correctamente");
      navegacion("/administrador");
    } else {
      alert("Email o contraseña incorrecta");
    }
  };
  return (
    <section className="login-section">
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
            </div>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Login;