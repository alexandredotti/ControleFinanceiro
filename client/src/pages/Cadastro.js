import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import AuthService from '../services/auth.service';

export const Cadastro = (props) => {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        senhaRepeat: '',
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const navigate = useNavigate();

    const onChange = (event) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                [name]: undefined,
            };
        });
    };

    const onClickCadastro = () => {
        const usuario = {
            nome: form.nome,
            email: form.email,
            senha: form.senha
        }
        setPendingApiCall(true);
        AuthService.signup(usuario).then(response => {
            setPendingApiCall(false);
            navigate('/');
        }).catch(apiError => {
            if (apiError.response.data && apiError.response.data.validationErrors) {
                setErrors(apiError.response.data.validationErrors);
            }
            setPendingApiCall(false);
        });
    };

    let senhaRepeatError;
    const { senha, senhaRepeat } = form;
    if (senha || senhaRepeat) {
        senhaRepeatError =
        senha === senhaRepeat ? '' : 'As senhas devem ser iguais';
    }

    return (
        <div className="container">
            <h1 className="text-center">Cadastro</h1>
            <div className="col-12 mb-3">
                <Input
                    name="nome"
                    label="Informe o seu nome"
                    className="form-control"
                    type="text" 
                    placeholder="Informe o seu nome"
                    onChange={onChange}
                    value={form.nome}
                    hasError={errors.nome && true}
                    error={errors.nome}
                 />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="email"
                    label="Informe o seu email"
                    className="form-control"
                    type="text" 
                    placeholder="Informe o seu email"
                    onChange={onChange}
                    value={form.email}
                    hasError={errors.email && true}
                    error={errors.email}
                 />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="senha"
                    label="Informe a sua senha"
                    className="form-control"
                    type="password"
                    placeholder="Informe sua senha"
                    onChange={onChange}
                    value={form.senha}
                    hasError={errors.senha && true}
                    error={errors.senha}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="senhaRepeat"
                    label="Confirme sua senha"
                    className="form-control"
                    type="password"
                    placeholder="Confirme sua senha"
                    onChange={onChange}
                    value={form.senhaRepeat}
                    hasError={senhaRepeatError && true}
                    error={senhaRepeatError}
                />
            </div>
            <div className="text-center">
                <ButtonWithProgress
                    onClick={onClickCadastro}
                    disabled={pendingApiCall || senhaRepeatError ? true : false}
                    text="Cadastrar"
                    pendingApiCall={pendingApiCall}
                />
            </div>
            <div className="text-center">
                já possui cadastro? <Link to="/">Login</Link>
            </div>
        </div>
    );
};
Cadastro.defaultProps = {
    actions: {
        postUsuario: () =>
            new Promise((resolve, reject) => {
                resolve({});
            })
    }
}
export default Cadastro;