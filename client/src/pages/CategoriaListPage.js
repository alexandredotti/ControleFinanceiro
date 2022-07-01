import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoriaService from '../services/CategoriaService';
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

export const CategoriaListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();

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

    const onEdit = (url) => {
        navigate(url);
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
            <h1 className="fs-2 mb-4 text-center">Lista de Categorias</h1>
            <div className="text-center">
                <Link className="btn btn-success btn-icon col-md-2 mb-2" to="/categorias/novo" title="Nova Categoria">
                    <BsPlusCircle /> <span style={{ marginLeft: 10 }}>Nova Categoria</span>
                </Link>
            </div>
            <TableContainer>
                <Table>
                    <TableCaption>Lista de Categorias</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Código</Th>
                            <Th>Nome</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((categoria) => (
                            <Tr key={categoria.id}
                                _hover={{ cursor: "pointer", background: "#eee" }}>
                                <Td>{categoria.id}</Td>
                                <Td>{categoria.nome}</Td>
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
                                                onClick={() => onEdit(`/categorias/${categoria.id}`)}
                                            >
                                                Editar
                                            </MenuItem>
                                            <MenuItem
                                                icon={<BsTrash />}
                                                onClick={() => onRemove(categoria.id)}
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
                            <Th>Nome</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
        </div>
    );
};

export default CategoriaListPage;