import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { handleFileChange } from "../../utils/handleFileChange";
import "./userEncuesta.css";

const Encuesta = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      nombreCompleto: "",
      fechaNacimiento: "",
      preferencia: "",
      opciones: [],
      provincia: "",
      archivo: null,
      puntuacion: "5",
    },
  });

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };

  const opciones = ["Opción 1", "Opción 2", "Opción 3"];

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Crear Nueva Encuesta</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de la Encuesta</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Encuesta sobre hábitos"
            {...register("nombre", {
              required: "Este campo es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
              maxLength: {
                value: 40,
                message: "Máximo 40 caracteres",
              },
            })}
          />
          {errors.nombre && (
            <p className="text-danger">{errors.nombre.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            style={{ resize: "none" }}
            placeholder="Describe brevemente de qué trata"
            {...register("descripcion", {
              required: "Campo requerido",
              maxLength: {
                value: 40,
                message: "Máximo 200 caracteres",
              },
            })}
          />
          {errors.descripcion && (
            <p className="text-danger">{errors.descripcion.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tu nombre y apellido"
            {...register("nombreCompleto", {
              required: true,
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
              maxLength: {
                value: 40,
                message: "Máximo 40 caracteres",
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/u,
                message: "Solo se permiten letras y espacios",
              },
            })}
          />
          {errors.nombreCompleto && (
            <p className="text-danger">{errors.nombreCompleto.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            {...register("fechaNacimiento", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>¿Cuál prefieres?</Form.Label>
          {opciones.map((opt, idx) => (
            <Form.Check
              key={idx}
              type="radio"
              label={opt}
              value={opt}
              {...register("preferencia", { required: true })}
            />
          ))}
          {errors.preferencia && (
            <p className="text-danger">Selecciona una opción</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Selecciona una o más respuestas</Form.Label>
          {opciones.map((opt, idx) => (
            <Form.Check
              key={idx}
              type="checkbox"
              label={opt}
              value={opt}
              {...register("opciones")}
            />
          ))}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Selecciona tu provincia</Form.Label>
          <Form.Select {...register("provincia", { required: true })}>
            <option value="">Seleccionar</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="Tucumán">Tucumán</option>
            <option value="Otra">Otra</option>
          </Form.Select>
          {errors.provincia && (
            <p className="text-danger">Selecciona una provincia</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subí un archivo</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => handleFileChange(e, setValue, setPreviewUrl)}
          />
          {errors.archivo && <p className="text-danger">Archivo requerido</p>}
        </Form.Group>

        {/* Preview de la imagen, si es video no mostramos nada */}
        {previewUrl && (
          <div className="mb-3">
            <img
              src={previewUrl}
              alt="Imagen de la encuesta"
              className="img-preview"
            />
          </div>
        )}

        <Form.Group className="mb-4">
          <Form.Label className="mb-2">Puntúa esta encuesta</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            {Array.from({ length: 10 }, (_, i) => {
              const num = i + 1;
              const selected = watch("puntuacion") === String(num);

              return (
                <label
                  key={num}
                  className={`rounded-circle d-flex align-items-center justify-content-center border
            ${
              selected
                ? "bg-primary text-white border-primary"
                : "bg-light text-dark"
            }
            rating-circle`}
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <input
                    type="radio"
                    value={num}
                    {...register("puntuacion", { required: true })}
                    style={{ display: "none" }}
                  />
                  {num}
                </label>
              );
            })}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Enviar Encuesta
        </Button>
      </Form>
    </Container>
  );
};

export default Encuesta;
