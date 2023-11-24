export const makeRequest = async (endpoint, method , body = null) => {
  const url = `http://localhost:8800/api/${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // You can add other headers if needed
    },
    credentials: 'include', // This is equivalent to withCredentials: true in axios
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      // Handle error, you can throw an error or handle it as needed
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
};
