import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/tasks"; // http://localhost:3001/tasks/{taskID}/updates

export async function sendTaskUpdate(memberAccount, taskUpdate, taskID) {
  let requestUrl = `${endpointUrl}/${taskID}/updates`;
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ memberAccount, taskUpdate })
    })

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error('Error al crear el aupdate: ' + error.message);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message)
    throw error;
  }
}