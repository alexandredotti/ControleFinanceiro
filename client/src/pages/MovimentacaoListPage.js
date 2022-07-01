import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovimentacaoService from '../services/MovimentacaoService';
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

export const MovimentacaoListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();

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
                setApiError("Falha ao carregar a lista de movimentações.");
            });
    };

    const onEdit = (url) => {
        navigate(url);
    };

    const onRemove = (id) => {
        MovimentacaoService.remove(id)
            .then((response) => {
                loadData();
                setApiError();
            })
            .catch((error) => {
                setApiError("Falha ao remover a movimentacao.");
            });
    };

    return (
        <div className="container">
            <h1 className="fs-2 mb-4 text-center">Lista de Movimentações</h1>
            <div className="text-center">
                <Link
                    className="btn btn-success btn-icon col-md-2 mb-2"
                    to="/movimentacao/novo"
                    title="Nova Movimentação"
                >
                    <BsPlusCircle /> <span style={{ marginLeft: 10 }}>Nova Movimentação</span>
                </Link>
            </div>
            <TableContainer>
                <Table>
                    <TableCaption>Lista de Movimentações</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Conta</Th>
                            <Th isNumeric>Valor</Th>
                            <Th isNumeric>Valor Pago</Th>
                            <Th>Data Vencimento</Th>
                            <Th>Data Pagamento</Th>
                            <Th>Categoria</Th>
                            <Th>Tipo Movimentação</Th>
                            <Th>Descrição</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((movimentacao) => (
                            <Tr
                                key={movimentacao.id}
                                _hover={{ cursor: "pointer", background: "#eee" }}
                            >
                                <Td>{movimentacao.id}</Td>
                                <Td>{movimentacao.conta?.numero}</Td>
                                <Td isNumeric>{movimentacao.valor}</Td>
                                <Td isNumeric>{movimentacao.valorPago}</Td>
                                <Td>{movimentacao.dataVenc}</Td>
                                <Td>{movimentacao.dataPagamento}</Td>
                                <Td>{movimentacao.categoria?.nome}</Td>
                                <Td>{movimentacao.tipoMovimentacao}</Td>
                                <Td>{movimentacao.descricao}</Td>

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
                                                onClick={() => onEdit(`/movimentacao/${movimentacao.id}`)}
                                            >
                                                Editar
                                            </MenuItem>
                                            <MenuItem
                                                icon={<BsTrash />}
                                                onClick={() => onRemove(movimentacao.id)}
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
                            <Th>#</Th>
                            <Th>Conta</Th>
                            <Th isNumeric>Valor</Th>
                            <Th isNumeric>Valor Pago</Th>
                            <Th>Data Vencimento</Th>
                            <Th>Data Pagamento</Th>
                            <Th>Categoria</Th>
                            <Th>Tipo Movimentação</Th>
                            <Th>Descrição</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        </div>
    );
};
export default MovimentacaoListPage;
