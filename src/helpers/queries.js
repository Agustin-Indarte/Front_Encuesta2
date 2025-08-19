// usuario administrador
const userAdmin = {
  email: 'admin@gmail.com',
  password: '12345678'
};

export const login = (usuario) => {
  // Normalizamos los valores que vienen del formulario
  const email = usuario.email?.trim().toLowerCase();
  const password = usuario.password?.trim();

  // Validación segura y tolerante a errores comunes
  if (email === userAdmin.email && password === userAdmin.password) {
    sessionStorage.setItem('userKey', JSON.stringify(userAdmin.email));
    return true;
  } else {
    return false;
  }
};
