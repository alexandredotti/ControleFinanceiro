import axios from 'axios';

const save = (categoria) => {
    return axios.post('/categoria', categoria, {headers: getAuthHeader()});
}

const findAll = () => {
    return axios.get('/categoria', {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/categoria/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/categoria/${id}`, {headers: getAuthHeader()});
}

const CategoriaService = {
    save,
    findAll,
    findOne,
    remove
}

const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`}; //'Bearer ' + token
    } else {
        return {}
    }
}

export default CategoriaService;