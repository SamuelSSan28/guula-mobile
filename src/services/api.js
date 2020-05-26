import axios from 'axios';

const api = axios.create(
    {
        baseURL:'https://guula-backend.herokuapp.com/',
    }
);


export default api;

