import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default myAxios;
