import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ContaService from '../services/ContaService';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Textarea,
    Select,
    Button
} from "@chakra-ui/react";

export const ContaFormPage = () => {
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
        numero: "",
        agencia: "",
        banco: null,
        tipoConta: undefined,
    });

    useEffect(() => {
        if (id) {
            ContaService.findOne(id).then((response) => {
                if (response.data) {
                    console.log(response.data);
                    setEntity({
                        id: response.data.id,
                        numero: response.data.numero,
                        agencia: response.data.agencia,
                        banco: response.data.banco,
                        tipoConta: response.data.tipoConta
                    }); // ...response.data
                    setApiError();
                } else {
                    setApiError('Falha ao carregar a conta');
                }
            }).catch((erro) => {
                setApiError('Falha ao carregar a conta');
            });
        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                };
            });
        }
        setApiError();
    }, [id]);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const onSubmit = (data) => {
        const conta = {
            ...data,
            id: entity.id,
        };
        ContaService.save(conta).then((response) => {
            navigate('/conta');
        }).catch((error) => {
            setApiError('Falha ao salvar a conta.');
        });
    };

    return (
        <div className="container">
            <h1 className="fs-2 text-center">Cadastro de Conta</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.numero}>
                    <FormLabel htmlFor="numero">Número</FormLabel>
                    <Input
                        id="numero"
                        placeholder="Número da conta"
                        {...register("numero", {
                            required: "O campo número é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.numero && errors.numero.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.agencia}>
                    <FormLabel htmlFor="agencia">Agência</FormLabel>
                    <Input
                        id="agencia"
                        placeholder="Informe a agência"
                        {...register("agencia", {
                            required: "O campo agência é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.agencia && errors.agencia.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.banco}>
                    <FormLabel htmlFor="banco">Banco</FormLabel>
                    <Input
                        id="banco"
                        placeholder="0"
                        {...register("banco", {
                            required: "O campo banco é obrigatório",
                            min: { value: 1, message: "O banco deve ser maior que zero" },
                        })}
                        type="number"
                        step="any"
                    />
                    <FormErrorMessage>
                        {errors.banco && errors.banco.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.tipoConta}>
                    <FormLabel htmlFor="tipoConta">Tipo Conta</FormLabel>
                    <Select placeholder='Selecione o tipo de Conta'
                        {...register("tipoConta", {
                            required: "O campo tipo de conta é obrigatório",
                        })}
                        size="sm">
                        {/* <option value="">[Selecione]</option> */}
                        <option value='CC'>CC</option>
                        <option value='CP'>CP</option>
                        <option value='CARTAO'>CARTAO</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.tipoConta && errors.tipoConta.message}
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
                <Link to="/conta">Voltar</Link>
            </div>
        </div>
    );
};

export default ContaFormPage;
