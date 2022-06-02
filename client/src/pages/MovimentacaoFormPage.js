import React, { useEffect, useState } from 'react';
import MovimentacaoService from '../services/MovimentacaoService';
import ContaService from '../services/ContaService';
import CategoriaService from '../services/CategoriaService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Textarea,
    Select,
    Button
} from "@chakra-ui/react";

export const MovimentacaoFormPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm();
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [conta, setConta] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [entity, setEntity] = useState({
        id: null,
        conta: undefined,
        valor: 0,
        dataVenc: null,
        valorPago: 0,
        dataPagamento: null,
        categoria: undefined,
        descricao: "",
        tipoMovimentacao: null
    });

    useEffect(() => {
        CategoriaService.findAll().then((response) => {
            setCategoria(response.data);
        }).catch((erro) => {
            setApiError('Falha ao carregar a combo de categorias.');
        });
        ContaService.findAll().then((response) => {
            setConta(response.data);
            if (id) {
                MovimentacaoService.findOne(id).then((response) => {
                    if (response.data) {
                        console.log(response.data);
                        setEntity({
                            id: response.data.id,
                            conta: response.data.conta.id,
                            valor: response.data.valor,
                            dataVenc: response.data.dataVenc,
                            valorPago: response.data.valorPago,
                            dataPagamento: response.data.dataPagamento,
                            categoria: response.data.categoria.id,
                            descricao: response.data.descricao,
                            tipoMovimentacao: response.data.tipoMovimentacao
                        });
                        setApiError();
                    } else {
                        setApiError('Falha ao carregar a movimentação');
                    }
                }).catch((erro) => {
                    setApiError('Falha ao carregar a movimentação');
                });
            } else {
                setEntity((previousEntity) => {
                    return {
                        ...previousEntity,
                        conta: response.data[0]?.id,
                        categoria: response.data[0]?.id,
                    };
                });
            }
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao carregar a combo de contas.');
        });

    }, [id]);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const onSubmit = (data) => {
        const movimentacao = {
            ...data,
            id: entity.id,
            conta: { id: data.conta },
            categoria: { id: data.categoria },
        };
        MovimentacaoService.save(movimentacao).then((response) => {
            navigate('/movimentacao');
        }).catch((error) => {
            setApiError('Falha ao salvar a movimentação.');
        });
    };

    return (
        <div className="container">
            <h1 className="fs-2 text-center">Cadastro de Movimentação</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.conta}>
                    <FormLabel htmlFor="conta">Conta</FormLabel>
                    <Select
                        id="conta"
                        {...register("conta", {
                            required: "O campo conta é obrigatório",
                        })}
                        size="sm"
                    >
                        {conta.map((conta) => (
                            <option key={conta.id} value={conta.id}>
                                {conta.nome}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                        {errors.conta && errors.conta.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.valor}>
                    <FormLabel htmlFor="valor">Valor</FormLabel>
                    <Input
                        id="valor"
                        placeholder="0.0"
                        {...register("valor", {
                            required: "O campo valor é obrigatório",
                            min: { value: 0.01, message: "O valor deve ser maior que zero" },
                        })}
                        type="number"
                        step="any"
                    />
                    <FormErrorMessage>
                        {errors.valor && errors.valor.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.dataVenc}>
                    <Controller
                        control={control}
                        name='dataVenc'
                        render={({ field }) => (
                            <DatePicker
                                placeholderText='Selecione a Data de Vencimento.'
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                            />
                        )}
                    />
                </FormControl>
                <FormControl isInvalid={errors.valorPago}>
                    <FormLabel htmlFor="valorPago">Valor Pago</FormLabel>
                    <Input
                        id="valorPago"
                        placeholder="0.0"
                        {...register("valorPago", {
                            required: "O campo valor Pago é obrigatório",
                            min: { value: 0.01, message: "O valor Pago deve ser maior que zero" },
                        })}
                        type="number"
                        step="any"
                    />
                    <FormErrorMessage>
                        {errors.valorPago && errors.valorPago.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.dataPagamento}>
                    <Controller
                        control={control}
                        name='dataPagamento'
                        render={({ field }) => (
                            <DatePicker
                                placeholderText='Selecione a Data de Pagamento.'
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                            />
                        )}
                    />
                </FormControl>
                <FormControl isInvalid={errors.categoria}>
                    <FormLabel htmlFor="categoria">Categoria</FormLabel>
                    <Select
                        id="categoria"
                        {...register("categoria", {
                            required: "O campo categoria é obrigatório",
                        })}
                        size="sm"
                    >
                        {categoria.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                        {errors.categoria && errors.categoria.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.descricao}>
                    <FormLabel htmlFor="descricao">Descrição</FormLabel>
                    <Textarea
                        id="descricao"
                        placeholder="Descrição do produto"
                        {...register("descricao", {
                            required: "O campo descrição é obrigatório",
                            minLength: {
                                value: 2,
                                message: "O tamanho deve ser entre 2 e 1024 caracteres"
                            },
                            maxLength: {
                                value: 1024,
                                message: "O tamanho deve ser entre 2 e 1024 caracteres"
                            }
                        })}
                        size="sm"
                    />
                    <FormErrorMessage>
                        {errors.descricao && errors.descricao.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.tipoMovimentacao}>
                    <Select placeholder='Selecione o tipo de Movimentação'
                        {...register("tipoMovimentacao", {
                            required: "O campo tipo de movimentação é obrigatório",
                        })}
                        size="sm">
                        {/* <option value="">[Selecione]</option> */}
                        <option value='RECEITA'>RECEITA</option>
                        <option value='DESPESA'>DESPESA</option>
                        <option value='TRANSF_CONTAS'>TRANSF_CONTAS</option>
                    </Select>
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
                <Link to="/movimentacao">Voltar</Link>
            </div>
        </div>
    );
};

export default MovimentacaoFormPage;