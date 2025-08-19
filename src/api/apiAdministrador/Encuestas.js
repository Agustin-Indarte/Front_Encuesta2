import api from "../apiConfig";

export const crearEncuesta = async (data) => {
    try {
      const response = await api.post('/encuestas', data); // <-- solo '/encuestas'
      return response.data;
    } catch (error) {
      console.error('Error al crear la encuesta:', error);
      throw error;
    }
};