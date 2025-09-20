import axios from 'axios';

export const makeRequest = ({
  url = '',
  method = 'GET',
  authToken = true,
  headers = {},
  params = {},
  data = {},
  responseType = 'json',
  signal,
}) => {
  url = `${import.meta.env.VITE_API_URL + url}`;

  if (authToken) {
    const token = localStorage.getItem('accessToken');
    headers.Authorization = `Bearer ${token}`;
  }

  return axios
    .request({
      url,
      method,
      headers,
      params,
      data,
      responseType,
      signal,
    })
    .catch((error) => {
      return {
        message: error.response.data.message,
        timestamp: error.response.data.timestamp,
        status: error.response?.status || 0,
      };
    });
};
