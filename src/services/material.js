import axios from "axios";

// Cria uma instância do Axios com a base URL definida para 'http://localhost'
const materialsAPI = axios.create({ baseURL: 'http://52.206.78.25/' });

// Intercepta as requisições e adiciona o token de autenticação no header
materialsAPI.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiY3BmIjoiNDQ0LjQ0NC40NDQtNDQiLCJyb2xlIjoiTWFzdGVyIiwiaWF0IjoxNzE0OTMwOTQ5LCJleHAiOjE3MTQ5MzQ1NDl9.lYRE4kJ9hR6nsXofSxpSJTY6c07hR_k363PuhcGRGBM";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Obtém a lista de material.
 * @param {number} number - O número da página.
 * @param {number} size - O tamanho da página.
 * @returns {Promise<Array>} Uma promessa que é resolvida com a lista de material.
 */
async function getMaterials(number, size) {
  try {
    const response = await materialsAPI.get("/material", {
      params: {
        number,
        size,
      },
    });

    console.log(response.data);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Erro ao obter os materiais:", response.statusText);
      throw new Error("Erro ao obter os materiais");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw{
        error: {
          success: false,
          message: "Token de autenticação inválido ou não enviado.",
        },
      };
    } else if (error.response && error.response.status === 403) {
      throw { error: { success: false, message: "Usuário sem acesso!" } };
    } else {
      throw { error: { success: false, message: "Erro no servidor." } };
    }
  }
}
export {
  getMaterials,
};
