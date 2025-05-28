import axios from 'axios';

const API_URL = "http://localhost:3000";

export const listarEventos = async () => {
  const response = await axios.get(`${API_URL}/eventos`);
  return response.data;
};

export const cadastrarEvento = async (formData, token) => {
  const response = await axios.post(`${API_URL}/eventos`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
};

// Outros métodos como editarEvento(), deletarEvento() podem vir aqui
