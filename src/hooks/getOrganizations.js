import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/organizations"; // http://localhost:3001/organizations/{userID}

export async function getOrganizations(userID) {
  let requestUrl = `${endpointUrl}/${userID}`;
  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      return null; 
    } else {
      throw new Error('Error al obtener las organizaciones: ' + response.message);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}