import axios from 'axios';

const api = axios.create(
    {
        baseURL:'https://guula-backend.herokuapp.com/',
        //baseURL:'localhost:3333/',
    }
);


export default api;

