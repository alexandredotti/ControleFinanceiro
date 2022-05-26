import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoriaService from '../services/CategoriaService';

export const CategoriaListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        CategoriaService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar a lista de categorias');
            });
    };

    const onRemove = (id) => {
        CategoriaService.remove(id).then((response) => {
            loadData();
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao remover a categoria');
        });
    }

    return (
        <div className="container">
            <h1 className="text-center">Lista de Categorias</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/categorias/novo">Nova Categoria</Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nome}</td>
                            <td>
                                <Link className="btn btn-primary"
                                    to={`/categorias/${categoria.id}`}>Editar</Link>

                                <button className="btn btn-danger"
                                    onClick={() => onRemove(categoria.id)}>
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

export default CategoriaListPage;