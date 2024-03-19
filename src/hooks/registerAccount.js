import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/users/registerAccount"; // http://localhost:3001/users/registerAccount


const registerAccount = async (name, email, password, tags) => {

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, tags })
    })

    if (response.ok) {
      const result = await response.json();
      const userID = result.userID;
      return userID;
    } else if (response.status === 500) { 
      const errorMessage = await response.json()
      if (errorMessage.message === "ER_DUP_ENTRY") {
        throw new Error("YA EXISTE UN USUARIO CON ESE NOMBRE."); 
      } else {
        throw new Error(errorMessage.message);
      }
      
    }
    else { console.error('Error al registrar el usuario'); }

  } catch (error) {
    console.error('Error en la solicitud', error)
    throw error;
  }
}

export default registerAccount;