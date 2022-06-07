const URL = 'http://localhost:3004/posts';

export const getPosts = async(params = '') => {
  try {
    const linkToFetch = `${URL}${params ? '?' + params : ''}`;
    const response = await fetch(linkToFetch);
    
    return await response.json();

  } catch(error) {
    console.error(error);
  }
}

export const addPost = async (newPost) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...newPost, date: new Date()}),
    });
  
    return await response.json();

  } catch(error) {
    console.error(error);
  }
};