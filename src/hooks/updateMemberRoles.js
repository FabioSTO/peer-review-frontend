import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/gitmembers"; // http://localhost:3001/gitmembers/{memberAccount}/*/{*}/roles

export async function updateMemberRoles(memberAccount, entityName, isOrg, isAdmin, isRevOrSuperRev) {
  let entityType = "organizations";
  if (!isOrg) {
    entityType = "projects";
  } 
  let requestUrl = `${endpointUrl}/${memberAccount}/${entityType}/${entityName}/roles`;
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isAdmin, isRevOrSuperRev })
    })

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error('Error al actualizar roles: ' + error.message);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message)
    throw error;
  }
}