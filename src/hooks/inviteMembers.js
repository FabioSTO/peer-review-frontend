import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/organizations"; // http://localhost:3001/organizations/{orgName}/invitations

export async function inviteMembers(userID, orgName, members) {
  let requestUrl = `${endpointUrl}/${orgName}/invitations`;
  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID, members })
    })

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error('Error al invitar a los miembros: ' + error.message);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message)
    throw error;
  }
}