import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cadastro from './pages/Cadastro';
import * as apiCalls from './api/apiCalls';

const actions = {
  postUsuario: apiCalls.postUsuario,
  //postConta: apiCalls.postConta,
  //postCategoria: apiCalls.postCategoria,
  //postMovimentacao: apiCalls.postMovimentacao,
}

ReactDOM.render(
  <React.StrictMode>
    <Cadastro actions={actions} />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
