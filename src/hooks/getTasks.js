import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/gitmembers"; // http://localhost:3001/gitmembers/{memberAccount}/tasks

export async function getTasks(memberAccount) {
  let requestUrl = `${endpointUrl}/${memberAccount}/tasks`;
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
      throw new Error('Error al obtener las tareas: ' + response.message);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}