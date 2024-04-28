import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/users"; // http://localhost:3001/users/{userID}/gitmembers

export async function getMemberData(userID) {
  let requestUrl = `${endpointUrl}/${userID}/gitmembers`;
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
      throw new Error('Error al obtener los member_accounts: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}