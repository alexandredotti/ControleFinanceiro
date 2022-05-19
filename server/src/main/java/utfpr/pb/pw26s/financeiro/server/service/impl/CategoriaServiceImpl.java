package utfpr.pb.pw26s.financeiro.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import utfpr.pb.pw26s.financeiro.server.model.Categoria;
import utfpr.pb.pw26s.financeiro.server.repository.CategoriaRepository;
import utfpr.pb.pw26s.financeiro.server.service.CategoriaService;

@Service
public class CategoriaServiceImpl extends CrudServiceImpl<Categoria, Long>
        implements CategoriaService {

    private CategoriaRepository categoriaRepository;
    public CategoriaServiceImpl(CategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    protected JpaRepository<Categoria, Long> getRepository() {
        return this.categoriaRepository;
    }
}