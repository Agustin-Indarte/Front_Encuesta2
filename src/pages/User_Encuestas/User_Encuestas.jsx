import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import "./userEncuesta.css";

const Encuesta = () => {
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

  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Solo se permiten archivos JPG, JPEG, PNG o WEBP");
        e.target.value = null;
        setPreviewUrl(null);
        setFileType(null);
        return;
      }

      setValue("archivo", file, { shouldValidate: true });

      const fileURL = URL.createObjectURL(file);
      setPreviewUrl(fileURL);
      setFileType("image");
    }
  };

  const onSubmit = (data) => {
    console.log("📤 Datos enviados:", data);
    alert("Encuesta enviada con éxito ✅");
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
            onChange={handleFileChange}
          />
          {errors.archivo && <p className="text-danger">Archivo requerido</p>}
        </Form.Group>

        {/* Preview de la imagen, si es video no mostramos nada */}
        {previewUrl && fileType === "image" && (
          <div className="mb-3">
            <img src={previewUrl} alt="Preview" className="img-preview" />
          </div>
        )}

        <Form.Group className="mb-4">
          <Form.Label>Puntúa esta encuesta</Form.Label>
          <div className="d-flex gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <Form.Check
                key={num}
                inline
                type="radio"
                label={num}
                value={num}
                {...register("puntuacion", { required: true })}
              />
            ))}
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
