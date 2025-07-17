export const handleFileChange = (e, setValue, setPreviewUrl) => {
  const file = e.target.files[0];

  if (file) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      // CUANDO INSTALEMOS LOS TOAST VAMOS A CAMBIAR EL ALERT POR EL TOAST
      alert("Solo se permiten archivos JPG, JPEG, PNG o WEBP");
      e.target.value = null;
      setPreviewUrl(null);
      return;
    }

    setValue("archivo", file, { shouldValidate: true });

    const fileURL = URL.createObjectURL(file);
    setPreviewUrl(fileURL);
  }
};
