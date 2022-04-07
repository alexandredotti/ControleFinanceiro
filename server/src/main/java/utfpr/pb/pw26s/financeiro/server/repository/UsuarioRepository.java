package utfpr.pb.pw26s.financeiro.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utfpr.pb.pw26s.financeiro.server.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}