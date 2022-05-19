import axios from 'axios'

export const postSignup = (usuario) => {
    return axios.post('/usuarios', usuario);
};

export const login = (usuario) => {
    return axios.post('/login', usuario);
};