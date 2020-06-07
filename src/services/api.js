import axios from 'axios';

const api = axios.create(
    {
        baseURL:'https://guula-backend.herokuapp.com/',
        //baseURL:'http://192.168.0.113:3333',
    }
);


export default api;

