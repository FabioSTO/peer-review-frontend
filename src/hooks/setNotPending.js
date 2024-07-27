import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/reviews"; // http://localhost:3001/reviews/{reviewID}/gitmembers/{memberAccount}

export async function setNotPending(reviewID, member_account, pending) {
  let requestUrl = `${endpointUrl}/${reviewID}/gitmembers/${member_account}`;
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const response = await fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ pending })
    })

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error('Error al cambiar el pending: ' + error.message);   
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message)
    throw error;
  }
}