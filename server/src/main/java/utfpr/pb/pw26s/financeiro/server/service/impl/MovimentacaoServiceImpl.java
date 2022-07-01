package utfpr.pb.pw26s.financeiro.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import utfpr.pb.pw26s.financeiro.server.model.DashDTO;
import utfpr.pb.pw26s.financeiro.server.model.Movimentacao;
import utfpr.pb.pw26s.financeiro.server.model.TipoMovimentacao;
import utfpr.pb.pw26s.financeiro.server.repository.MovimentacaoRepository;
import utfpr.pb.pw26s.financeiro.server.service.MovimentacaoService;

import java.util.List;

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

    @Override
    public DashDTO findByvalorPago() {
        DashDTO dashDTO = new DashDTO();
        for(Object obj[] : movimentacaoRepository.findByvalorPago()) {
            if (((String)obj[1]).equals(TipoMovimentacao.RECEITA.toString())) {
                dashDTO.setTotalEntradas((Double)obj[0]);
            }else {
                dashDTO.setTotalSaidas((Double)obj[0]);
            }
        }
        return dashDTO;
    }
}
