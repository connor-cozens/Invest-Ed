import axios from 'axios';

const host = 'localhost';
const port = 4000;
//const host = 'invested.cijqdfchkkjd.us-east-2.rds.amazonaws.com';
//const port = 3306;
export default axios.create({
  baseURL: `http://${host}:${port}`
});
