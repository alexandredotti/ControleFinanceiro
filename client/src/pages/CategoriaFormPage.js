import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import CategoriaService from '../services/CategoriaService';

export const CategoriaFormPage = () => {
    const [form, setForm] = useState({
        id: null,
        nome: ''
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            CategoriaService.findOne(id).then( (response) => {
                if (response.data) {
                    setForm({
                        id: response.data.id,
                        nome: response.data.nome}); // ...response.data
                    setApiError();
                } else {
                    setApiError('Falha ao carregar a categoria');
                }
            }).catch((erro) => {
                setApiError('Falha ao carregar a categoria');
            });
        }
    }, [id]);


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

    const onSubmit = () => {
        const categoria = {
            id: form.id,
            nome: form.nome
        };
        setPendingApiCall(true);
        CategoriaService.save(categoria).then( (response) => {
            setPendingApiCall(false);
            navigate('/categorias');
            /*setForm((previousForm) => {
                return {
                    ...previousForm,
                    id: response.data.id,
                };
            }); */
        }).catch( (error) => {
            if (error.response.data && error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            } else {
                setApiError('Falha ao salvar categoria.');
            }
            setPendingApiCall(false);
        });
        
    };

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Categoria</h1>
            <div className="col-12 mb-3">
                <Input
                    name="nome"
                    label="Nome"
                    placeholder="Informe o nome"
                    value={form.nome}
                    onChange={onChange}
                    hasError={errors.nome && true}
                    error={errors.nome}
                />
            </div>
            <div className="text-center">
                <ButtonWithProgress
                    onClick={onSubmit}
                    disabled={pendingApiCall ? true : false}
                    pendingApiCall={pendingApiCall}
                    text="Salvar"
                />
            </div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
            <div className="text-center">
                <Link to="/categorias">Voltar</Link>
            </div>
        </div>
    );
}

export default CategoriaFormPage;