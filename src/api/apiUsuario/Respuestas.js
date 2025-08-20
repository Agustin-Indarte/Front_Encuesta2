import api from '../apiConfig';

export const guardarRespuesta = async (data) => {
  try {
    const res = await api.post('/respuestas', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};