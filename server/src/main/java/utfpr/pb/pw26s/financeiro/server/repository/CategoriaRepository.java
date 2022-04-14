package utfpr.pb.pw26s.financeiro.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utfpr.pb.pw26s.financeiro.server.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
}
