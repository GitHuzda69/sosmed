export const makeRequest = async (endpoint, method , body) => {
  const url = `http://localhost:8800/api/${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data);
    }
    return data;
  } catch (error) {
    console.error('Ini Errornya :', error);
    throw error;
  }
};
