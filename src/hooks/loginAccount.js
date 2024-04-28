import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/users/loginAccount"; // http://localhost:3001/users/loginAccount


const loginAccount = async (email, password) => {

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const result = await response.json();
      document.cookie = `token=${result.token}; path=/; HttpOnly, secure`;
      return { userID: result.userID, username: result.username, email: result.email, 
        userTags: result.userTags}
        
    } else {

      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
}

export default loginAccount;