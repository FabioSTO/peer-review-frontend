import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/organizations"; // http://localhost:3001/organizations

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
      const error = await response.json();
      throw new Error('Error al crear la nueva organización: ' + error.message);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message)
    throw error;
  }
}