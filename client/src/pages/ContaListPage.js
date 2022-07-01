import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContaService from '../services/ContaService';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from "@chakra-ui/react";
import {
    BsThreeDotsVertical,
    BsPencilSquare,
    BsTrash,
    BsPlusCircle,
} from "react-icons/bs";

export const ContaListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();

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

    const onEdit = (url) => {
        navigate(url);
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
            <h1 className="fs-2 mb-4 text-center">Lista de Contas</h1>
            <div className="text-center">
                <Link className="btn btn-success btn-icon col-md-2 mb-2" to="/conta/novo" title="Nova Conta">
                    <BsPlusCircle /> <span style={{ marginLeft: 10 }}>Nova Conta</span>
                </Link>
            </div>
            <TableContainer>
                <Table>
                    <TableCaption>Lista de Contas</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Código</Th>
                            <Th>Número</Th>
                            <Th>Agência</Th>
                            <Th isNumeric>Banco</Th>
                            <Th>Tipo da Conta</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((conta) => (
                            <Tr
                                key={conta.id}
                                _hover={{ cursor: "pointer", background: "#eee" }}
                            >
                                <Td>{conta.id}</Td>
                                <Td>{conta.numero}</Td>
                                <Td>{conta.agencia}</Td>
                                <Td isNumeric>{conta.banco}</Td>
                                <Td>{conta.tipoConta}</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={IconButton}
                                            aria-label="Actions"
                                            icon={<BsThreeDotsVertical size={20} />}
                                            variant="ghost"
                                            width="10"
                                        />
                                        <MenuList>
                                            <MenuItem
                                                icon={<BsPencilSquare />}
                                                onClick={() => onEdit(`/conta/${conta.id}`)}
                                            >
                                                Editar
                                            </MenuItem>
                                            <MenuItem
                                                icon={<BsTrash />}
                                                onClick={() => onRemove(conta.id)}
                                            >
                                                Remover
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>

                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Código</Th>
                            <Th>Número</Th>
                            <Th>Agência</Th>
                            <Th isNumeric>Banco</Th>
                            <Th>Tipo da Conta</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
        </div>
    );
};

export default ContaListPage;