import axios from 'axios';

const api_email = axios.create(
    {
        baseURL:'http://192.168.18.19:5000/',
       // baseURL:'http://192.168.0.113:3333',
    }
);


export default api_email;

