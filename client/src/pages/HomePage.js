import React, { useState, useEffect } from 'react';
import MovimentacaoService from '../services/MovimentacaoService';
import {
    Container,
    Heading
} from "@chakra-ui/react";
import {
    FaRegArrowAltCircleUp,
    FaRegArrowAltCircleDown,
    FaDollarSign,
} from "react-icons/fa";

const HomePage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();
    useEffect(() => {
        MovimentacaoService.findDTO().then((response) => {
            setData(response.data);
            setApiError();
        });
    }, []);

    return (
        <div className="container">
            <h1 className="fs-2 mb-4 text-center">Controle Financeiro</h1>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card text-white bg-success mb-3 dash" >
                        <div className="card-header">Entradas
                            <FaRegArrowAltCircleUp style={{ display: 'inline-block' , margin:'5px'}} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{data.totalEntradas}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card text-white bg-danger mb-3 dash">
                        <div className="card-header">Saídas
                            <FaRegArrowAltCircleDown style={{ display: 'inline-block', margin:'5px'}} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{data.totalSaidas}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card text-white bg-dark mb-3 dash">
                        <div className="card-header">Total
                            <FaDollarSign style={{ display: 'inline-block', margin:'5px' }} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{data.totalEntradas - data.totalSaidas}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;