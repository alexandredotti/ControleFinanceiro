package utfpr.pb.pw26s.financeiro.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import utfpr.pb.pw26s.financeiro.server.model.Movimentacao;
import utfpr.pb.pw26s.financeiro.server.repository.MovimentacaoRepository;
import utfpr.pb.pw26s.financeiro.server.service.MovimentacaoService;

@Service
public class MovimentacaoServiceImpl extends CrudServiceImpl<Movimentacao, Long> implements MovimentacaoService {

    private MovimentacaoRepository movimentacaoRepository;

    public MovimentacaoServiceImpl(MovimentacaoRepository movimentacaoRepository){
        this.movimentacaoRepository = movimentacaoRepository;
    }
    @Override
    protected JpaRepository<Movimentacao, Long> getRepository() {
        return this.movimentacaoRepository;
    }
}
