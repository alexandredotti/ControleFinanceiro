import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import AuthService from '../services/auth.service';

export const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [apiError, setApiError] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() =>{
    setApiError();
  }, [email, senha]);

  const onClickLogin = () => {
    setPendingApiCall(true);

    const body = {
        username:email,
        password:senha
    };
    AuthService.login(body).then((response) => {
      setPendingApiCall(false);
      window.location.reload();
      
    }).catch((error) => {
      setPendingApiCall(false);
      setApiError('Login failed');
    });
  }


  let disableSubmit = false;
  if (email === '') {
    disableSubmit = true;
  }
  if (senha === '') {
    disableSubmit = true;
  }

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="col-12 mb-3">
        <Input
          label="Informe o seu email"
          className="form-control"
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Informe a sua senha"
          className="form-control"
          type="password"
          placeholder="Your password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
      </div>

      <div className="text-center">
        <ButtonWithProgress
          onClick={onClickLogin}
          disabled={pendingApiCall || disableSubmit}
          text="Login"
          pendingApiCall={pendingApiCall}
        />
      </div>
      {apiError && (
        <div className="col-12 mb-3">
          <div className="alert alert-danger">{apiError}</div>
        </div>
      )}
      <div className="text-center">
        não possui cadastro? <Link to="/cadastro">Cadastrar-se</Link>
      </div>
    </div>
  )
}

LoginPage.defaultProps = {};

export default LoginPage;