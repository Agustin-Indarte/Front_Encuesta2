// src/services/userService.js

export function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

export function addUser(newUser) {
  const users = getUsers();
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
}

export function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email === email);
}
