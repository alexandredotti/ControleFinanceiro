import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import CategoriaService from '../services/CategoriaService';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
} from "@chakra-ui/react";

export const CategoriaFormPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [entity, setEntity] = useState({
        id: null,
        nome: "",
    });
    useEffect(() => {
        if (id) {
            CategoriaService.findOne(id).then((response) => {
                if (response.data) {
                    setEntity({
                        id: response.data.id,
                        nome: response.data.nome
                    }); // ...response.data
                    setApiError();
                } else {
                    setApiError('Falha ao carregar a categoria');
                }
            }).catch((erro) => {
                setApiError('Falha ao carregar a categoria');
            });
        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                };
            });
        }
    }, [id]);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const onSubmit = (data) => {
        const categoria = {
            ...data,
            id: entity.id,
        };
        CategoriaService.save(categoria).then((response) => {
            navigate('/categorias');
            /*setForm((previousForm) => {
                return {
                    ...previousForm,
                    id: response.data.id,
                };
            }); */
        }).catch((error) => {
            setApiError('Falha ao salvar categoria.');
        });
    };

    return (
        <div className="container">
            <h1 className="fs-2 text-center">Cadastro de Categoria</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.nome}>
                    <FormLabel htmlFor="nome">Nome</FormLabel>
                    <Input
                        id="nome"
                        placeholder="Nome do produto"
                        {...register("nome", {
                            required: "O campo nome é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.nome && errors.nome.message}
                    </FormErrorMessage>
                </FormControl>
                <div className="text-center">
                    <Button
                        mt={4}
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Salvar
                    </Button>
                </div>
            </form>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
            <div className="text-center">
                <Link to="/categorias">Voltar</Link>
            </div>
        </div>
    );
}

export default CategoriaFormPage;