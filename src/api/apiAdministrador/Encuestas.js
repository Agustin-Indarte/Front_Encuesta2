import api from "../apiConfig";

export const crearEncuesta = async (data) => {
    try {
      const response = await api.post('/encuestas', data); 
      return response.data;
    } catch (error) {
      console.error('Error al crear la encuesta:', error);
      throw error;
    }
};

export const obtenerEncuestas = async () => {
    try {
        const response = await api.get('/encuestas');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las encuestas:', error);
        throw error;
    }
};

export const actualizarEncuesta = async (id, data) => {
    try {
        const response = await api.put(`/encuestas/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la encuesta:', error);
        throw error;
    }
};

export const eliminarEncuesta = async (id) => {
    try {
        const response = await api.delete(`/encuestas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la encuesta:', error);
        throw error;
    }
};