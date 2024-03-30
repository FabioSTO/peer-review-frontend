import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/projects"; // http://localhost:3001/projects

export async function addProject(orgName, proName, proDesc, adminMember) {
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orgName, proName, proDesc, adminMember })
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