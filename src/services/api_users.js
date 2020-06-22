import axios from 'axios';

const api_users = axios.create(
    {
        baseURL:'https://guula-backend-users.herokuapp.com',
       // baseURL:'http://192.168.0.113:3333',
    }
);


export default api_users;

