import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/projects"; // http://localhost:3001/projects/{proName}/gitmembers

export async function getProjectMembers(proName) {
  let requestUrl = `${endpointUrl}/${proName}/gitmembers`;
  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      return null; 
    } else {
      throw new Error('Error al obtener los miembros: ' + response.message);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}