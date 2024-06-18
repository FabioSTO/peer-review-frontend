import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/reviews"; // http://localhost:3001/reviews/{proName}/comments

export async function sendComment(memberAccount, comment, reviewID) {
  let requestUrl = `${endpointUrl}/${reviewID}/comments`;
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ memberAccount, comment })
    })

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error('Error al crear el nuevo comentario: ' + error.message);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message)
    throw error;
  }
}