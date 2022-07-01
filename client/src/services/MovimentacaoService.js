import axios from 'axios';

const save = (movimentacao) => {
    return axios.post('/movimentacao', movimentacao, {headers: getAuthHeader()});
}

const findAll = () => {
    return axios.get('/movimentacao', {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/movimentacao/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/movimentacao/${id}`, {headers: getAuthHeader()});
}

const findDTO = () => {
    return axios.get('/movimentacao/dash', {headers: getAuthHeader()});
}

const MovimentacaoService = {
    save,
    findAll,
    findOne,
    remove,
    findDTO
}

const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`}; //'Bearer ' + token
    } else {
        return {}
    }
}

export default MovimentacaoService;