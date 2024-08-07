import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/gitmembers"; // http://localhost:3001/gitmembers/{memberAccount}/*/{*}/roles

export async function getMemberRoles(memberAccount, entityName, isOrg) {
  let entityType = "organizations";
  if (!isOrg) {
    entityType = "projects";
  } 
  let requestUrl = `${endpointUrl}/${memberAccount}/${entityType}/${entityName}/roles`;
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
      throw new Error('Error al obtener los roles: ' + response.message);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}