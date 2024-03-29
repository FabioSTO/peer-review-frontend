import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/users"; // http://localhost:3001/users/{userID}/invitations

export async function getInvitations(userID) {
  let requestUrl = `${endpointUrl}/${userID}/invitations`;
  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    }else if (response.status === 404) {
      return null; 
    } else {
      throw new Error('Error al obtener las invitaciones: ' + response.message);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}