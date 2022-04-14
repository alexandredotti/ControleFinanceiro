package utfpr.pb.pw26s.financeiro.server.service;

import org.springframework.stereotype.Service;
import utfpr.pb.pw26s.financeiro.server.model.Categoria;
import utfpr.pb.pw26s.financeiro.server.repository.CategoriaRepository;

@Service
public class CategoriaService {

    CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria save(Categoria categoria){
        return categoriaRepository.save(categoria);
    }
}
