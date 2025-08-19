// src/services/userService.js
import bcrypt from 'bcryptjs';

// Obtener lista de usuarios guardados
export function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Registrar usuario con contraseña hasheada
export function addUser(newUser) {
  const users = getUsers();

  // Hashear la contraseña antes de guardarla
  const hashedPassword = bcrypt.hashSync(newUser.password, 10); // 10 = salt rounds

  users.push({
    ...newUser,
    password: hashedPassword,
    verified: false // Estado inicial: cuenta no verificada
  });

  localStorage.setItem('users', JSON.stringify(users));
}

// Buscar usuario por email
export function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email === email);
}

// Verificar si la contraseña ingresada coincide con el hash guardado
export function verifyPassword(inputPassword, hashedPassword) {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}
