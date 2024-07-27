import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/tasks"; // http://localhost:3001/tasks/{taskID}

export async function editTask(task_ID, taskName, taskDesc, taskState) {
  let requestUrl = `${endpointUrl}/${task_ID}`;
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const response = await fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ taskName, taskDesc, taskState })
    })

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error('Error al editar tarea: ' + error.message);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message)
    throw error;
  }
}