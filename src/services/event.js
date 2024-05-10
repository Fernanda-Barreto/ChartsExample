import axios from "axios";
import { token } from "./token";

// Crie uma instância do Axios com a base URL definida para 'http://3.87.142.74/'
const eventsAPI = axios.create({ baseURL: 'http://52.206.78.25/' });

// Intercepte as requisições e adicione o token de autenticação no cabeçalho
eventsAPI.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Obtém a lista de eventos.
 * @param {number} number - O número da página.
 * @param {number} size - O tamanho da página.
 * @returns {Promise<Array>} Uma promessa que é resolvida com a lista de eventos.
 */
async function getEvents(number, size) {
  try {
    const response = await eventsAPI.get("/event", {
      params: {
        number,
        size,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Erro ao obter os eventos:", response.statusText);
      throw new Error("Erro ao obter os eventos");
    }
  } catch (error) {
    console.error("Erro ao obter os eventos:", error);
    throw new Error("Erro ao obter os eventos");
  }
}

export {
  getEvents,
};