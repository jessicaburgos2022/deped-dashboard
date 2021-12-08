import axios from 'axios';

const envUrl = process.env.REACT_APP_BACKEND_URL;
const clientId = process.env.REACT_APP_CLIENT_ID;

export default axios.create({
  headers:{
    'x-client-id': clientId,
    Authorization: 'Bearer ' + localStorage.getItem("token")
  },
  baseURL: envUrl,
});
