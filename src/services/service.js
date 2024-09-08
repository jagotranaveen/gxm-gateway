const apiService = async (url, method = 'GET', options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default apiService;