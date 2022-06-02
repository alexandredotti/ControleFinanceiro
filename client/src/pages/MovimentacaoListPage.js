import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovimentacaoService from '../services/MovimentacaoService';

export const MovimentacaoListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        MovimentacaoService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar a lista de movimentações');
            });
    };

    const onRemove = (id) => {
        MovimentacaoService.remove(id).then((response) => {
            loadData();
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao remover a movimentação');
        });
    };

    return (
        <div className="container">
            <h1 className="text-center">Lista de Movimentação</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/movimentacao/novo">Nova Movimentação</Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Conta</th>
                        <th>Valor</th>
                        <th>Valor Pago</th>
                        <th>Data Vencimento</th>
                        <th>Data Pagamento</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Tipo da Movimentação</th>
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

export default MovimentacaoListPage;