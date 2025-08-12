import api from "../apiConfig";

export const crearCategoria = async (data) => {
    try {
      const response = await api.post('/categories', data); // <-- solo '/encuestas'
      return response.data;
    } catch (error) {
      console.error('Error al crear la categoria:', error);
      throw error;
    }
};