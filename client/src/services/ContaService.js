import axios from 'axios';

const save = (conta) => {
    return axios.post('/conta', conta, {headers: getAuthHeader()});
}

const findAll = () => {
    return axios.get('/conta', {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/conta/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/conta/${id}`, {headers: getAuthHeader()});
}

const ContaService = {
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

export default ContaService;