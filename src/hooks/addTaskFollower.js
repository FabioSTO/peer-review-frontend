import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/tasks"; // http://localhost:3001/tasks/{taskID}/gitmembers

export async function addTaskFollower(taskID, member) {
  let requestUrl = `${endpointUrl}/${taskID}/gitmembers`;
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ member })
    })

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error('Error al asignar a los miembros: ' + error.message);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message)
    throw error;
  }
}