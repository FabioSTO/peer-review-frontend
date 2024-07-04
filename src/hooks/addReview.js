import { apiUrl } from "../development";

const endpointUrl = apiUrl + "/tasks"; // http://localhost:3001/tasks/{taskID}/reviews

export async function addReview(taskID, title, desc, scope, tags, image, reviewContent, contentType, member) {
  let requestUrl = `${endpointUrl}/${taskID}/reviews`;
  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('scope', scope);
    formData.append('tags', JSON.stringify(tags));
    formData.append('reviewContent', reviewContent);
    formData.append('contentType', contentType);
    formData.append('member', JSON.stringify(member));

    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error('Error al crear la nueva review: ' + error.message);
    }

  } catch (error) {
    console.error('Error en la solicitud', error.message);
    throw error;
  }
}