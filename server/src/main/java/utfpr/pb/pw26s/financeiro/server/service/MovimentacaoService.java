package utfpr.pb.pw26s.financeiro.server.service;

import org.springframework.stereotype.Service;
import utfpr.pb.pw26s.financeiro.server.model.Movimentacao;
import utfpr.pb.pw26s.financeiro.server.repository.MovimentacaoRepository;

@Service
public class MovimentacaoService {

    MovimentacaoRepository movimentacaoRepository;

    public MovimentacaoService(MovimentacaoRepository movimentacaoRepository){
        this.movimentacaoRepository = movimentacaoRepository;
    }

    public Movimentacao save(Movimentacao movimentacao){

        return movimentacaoRepository.save(movimentacao);
    }



}
