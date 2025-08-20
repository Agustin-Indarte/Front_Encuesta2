import api from '../apiConfig';

export const guardarRespuesta = async (data) => {
  try {
    const res = await api.post('/respuestas', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerRespuestasPorEncuesta = async (idEncuesta) => {
  const res = await api.get(`/respuestas/encuesta/${idEncuesta}`);
  return res.data;
};