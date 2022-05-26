import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContaService from '../services/ContaService';

export const ContaListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        ContaService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar a lista de contas');
            });
    };

    const onRemove = (id) => {
        ContaService.remove(id).then((response) => {
            loadData();
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao remover a conta');
        });
    };

    return (
        <div className="container">
            <h1 className="text-center">Lista de Contas</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/conta/novo">Nova Conta</Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Número</th>
                        <th>Agência</th>
                        <th>Banco</th>
                        <th>Tipo da Conta</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((conta) => (
                        <tr>
                            <td>{conta.id}</td>
                            <td>{conta.numero}</td>
                            <td>{conta.agencia}</td>
                            <td>{conta.banco}</td>
                            <td>{conta.tipoConta}</td>
                            <td>
                                <Link className="btn btn-primary"
                                    to={`/conta/${conta.id}`}>Editar</Link>

                                <button className="btn btn-danger"
                                    onClick={() => onRemove(conta.id)}>
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
        </div>
    );
}

export default ContaListPage;