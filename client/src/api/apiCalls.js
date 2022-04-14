import axios from 'axios'

export const postUsuario = (usuario) => {
    return axios.post('/usuarios', usuario);
}

export const postConta = (conta) => {
    return axios.post('/conta', conta);
}

export const postCategoria = (categoria) => {
    return axios.post('/categoria', categoria);
}

export const postMovimentacao = (movimentacao) => {
    return axios.post('/movimentacoes', movimentacao);
}

