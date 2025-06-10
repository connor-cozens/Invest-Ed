import axios from 'axios';

const host = 'localhost';
const port = 5050;

export default axios.create({
  baseURL: `http://${host}:${port}`
});
