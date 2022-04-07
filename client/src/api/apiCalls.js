import axios from 'axios'

export const postSignup = (usuario) => {
    return axios.post('/usuarios', usuario);
}