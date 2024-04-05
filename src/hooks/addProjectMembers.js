import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/projects"; // http://localhost:3001/projects/{proName}/gitmembers

export async function addProjectMembers(proName, members) {
  let requestUrl = `${endpointUrl}/${proName}/gitmembers`;
  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ members })
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