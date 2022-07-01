package utfpr.pb.pw26s.financeiro.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import utfpr.pb.pw26s.financeiro.server.model.Movimentacao;

import java.util.List;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

    @Query(value = "SELECT SUM(valor_Pago), tipo_Movimentacao FROM Movimentacao GROUP BY tipo_Movimentacao", nativeQuery = true)
    List<Object[]> findByvalorPago();
}