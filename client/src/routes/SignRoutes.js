import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Cadastro from '../pages/Cadastro';

const SignRoutes = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='*' element={<LoginPage />} />
            </Routes>
        </div>
    );
};

export default SignRoutes;