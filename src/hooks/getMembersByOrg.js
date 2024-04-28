import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/organizations"; // http://localhost:3001/organizations/{orgName}/gitmembers

export async function getMembersByOrg(orgName) {
  let requestUrl = `${endpointUrl}/${orgName}/gitmembers`;
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
      throw new Error('Error al obtener los miembros: ' + response.message);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}