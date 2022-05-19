package utfpr.pb.pw26s.financeiro.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utfpr.pb.pw26s.financeiro.server.model.Movimentacao;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
}