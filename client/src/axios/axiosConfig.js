import axios from 'axios';

const host = 'localhost';
const port = 4001;

export default axios.create({
  baseURL: `http://${host}:${port}`
});
