import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/users/gitmembers"; // http://localhost:3001/users/gitmembers


const githubAddAccount = async (code, userID) => {

  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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