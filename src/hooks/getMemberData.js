import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/users/gitMemberData"; // http://localhost:3001/users/gitMemberEntries

export async function getMemberData(userID) {
  let requestUrl = endpointUrl + "/" + userID
  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al obtener los member_accounts: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Error en la solicitud: ' + error.message);
  }
}