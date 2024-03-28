import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/users/addOrganization"; // http://localhost:3001/users/addOrganization

export async function addOrganization(orgName, orgDesc, memberAccount) {
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orgName, orgDesc, memberAccount })
    })

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Error al crear la nueva organización: ' + response.statusText);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error)
    throw error;
  }
}