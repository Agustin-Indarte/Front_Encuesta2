import api from '../apiConfig';

// Traer todas las categorías
export const getCategories = async () => {
  try {
    const res = await api.get('/categories');
    return res.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

// Crear categoría
export const crearCategoria = async (data) => {
  try {
    const res = await api.post('/categories', data);
    return res.data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

// Eliminar categoría
export const eliminarCategoria = async (id) => {
  try {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    throw error;
  }
};

