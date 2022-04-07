import React from "react";
import Input from '../components/input';

export class Cadastro extends React.Component {
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeat: '',
        pendingApiCall: false,
        errors: {},
    }

    onChangeNome = (event) => {
        const value = event.target.value;
        this.setState({ nome: value });
    }
    onChangeEmail = (event) => {
        const value = event.target.value;
        this.setState({ email: value });
    }
    onChangeSenha = (event) => {
        const value = event.target.value;
        this.setState({ senha: value });
    }
    onChangeSenhaRepeat = (event) => {
        const value = event.target.value;
        this.setState({ senhaRepeat: value });
    }

    onClickCadastro = () => {
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        this.setState({ pendingApiCall: true });
        this.props.actions.postSignup(usuario).then(response => {
            this.setState({ pendingApiCall: false });
        })
            .catch(apiError => {
                let errors = { ...this.state.errors };
                if (apiError.response.data && apiError.response.data.validationErrors) {
                    errors = { ...apiError.response.data.validationErrors }
                    console.log(errors);
                }
                this.setState({ pendingApiCall: false, errors });
            });
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Cadastro</h1>
                <div className="col-12 mb-3">
                    <Input
                        label="Informe o seu nome"
                        className="form-control"
                        type="text" 
                        placeholder="Informe o seu nome"
                        onChange={this.onChangeNome}
                        value={this.state.nome}
                        hasError={this.state.errors.nome && true}
                        error={this.state.errors.nome}
                    />

                </div>
                <div className="col-12 mb-3">
                    <label>Informe o email</label>
                    <input className="form-control"
                        type="text" placeholder="Informe o email"
                        onChange={this.onChangeEmail}
                        value={this.state.email} />
                </div>
                <div className="col-12 mb-3">
                    <label>Informe a sua senha</label>
                    <input className="form-control"
                        type="password" placeholder="Informe a sua senha"
                        onChange={this.onChangeSenha}
                        value={this.state.senha} />
                </div>
                <div className="col-12 mb-3">
                    <label>Confirme sua senha</label>
                    <input className="form-control"
                        type="password" placeholder="Confirme sua senha"
                        onChange={this.onChangeSenhaRepeat}
                        value={this.state.senhaRepeat} />
                </div>
                <div className="text-center">
                    <button disabled={this.state.pendingApiCall}
                        className="btn btn-primary" onClick={this.onClickCadastro}
                    >
                        {this.state.pendingApiCall && (
                            <div className="spinner-border text-light-spinner spinner-border-sm mr-sm-1"
                                role="status">
                                <span className="visually-hidden">Aguarde...</span>
                            </div>
                        )}
                        Cadastrar
                    </button>
                </div>
            </div>
        );


    }
}
Cadastro.defaultProps = {
    actions: {
        postSignup: () =>
            new Promise((resolve, reject) => {
                resolve({});
            })
    }
}
export default Cadastro;