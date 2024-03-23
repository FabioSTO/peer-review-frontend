import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/users/githubAddAccount"; // http://localhost:3001/users/githubAddAccount


const githubAddAccount = async (code, userID) => {

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, userID })
    })


    const result = await response.json();
    if (response.ok) {
      return { githubUser: result.member_account};
    } else {
      return { message: result.message , githubUser: result.member_account }
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
}

export default githubAddAccount;