import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HomePage from '../pages/HomePage';

import CategoriaListPage from '../pages/CategoriaListPage';
import ContaListPage from '../pages/ContaListPage';
import CategoriaFormPage from '../pages/CategoriaFormPage';
import ContaFormPage from '../pages/ContaFormPage';
import MovimentacaoListPage from '../pages/MovimentacaoListPage';
import MovimentacaoFormPage from '../pages/MovimentacaoFormPage';

const AuthenticatedRoutes = () => {
    
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<HomePage />} />

                <Route path='/categorias' element={<CategoriaListPage />} />
                <Route path='/categorias/novo' element={<CategoriaFormPage />} />
                <Route path='/categorias/:id' element={<CategoriaFormPage />} />

                <Route path='/conta' element={<ContaListPage />} />
                <Route path='/conta/novo' element={<ContaFormPage />} />
                <Route path='/conta/:id' element={<ContaFormPage />} />

                <Route path='/movimentacao' element={<MovimentacaoListPage />} />
                <Route path='/movimentacao/novo' element={<MovimentacaoFormPage />} />
                <Route path='/movimentacao/:id' element={<MovimentacaoFormPage />} />

                <Route path='*' element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default AuthenticatedRoutes;