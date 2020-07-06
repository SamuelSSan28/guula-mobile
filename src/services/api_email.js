import axios from 'axios';

const api_email = axios.create(
    {
        baseURL:'https://guula-backend-email.herokuapp.com/',
       // baseURL:'http://192.168.0.113:3333',
    }
);


export default api_email;

