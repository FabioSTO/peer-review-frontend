import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/reviews"; // http://localhost:3001/reviews/{reviewID}/comments

export async function getComments( reviewID ) {
  let requestUrl = `${endpointUrl}/${reviewID}/comments`;
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const response = await fetch(requestUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      return null; 
    } else {
      throw new Error('Error al obtener los comments: ' + response.message);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}