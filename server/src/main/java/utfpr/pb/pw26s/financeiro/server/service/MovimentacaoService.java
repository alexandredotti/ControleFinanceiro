package utfpr.pb.pw26s.financeiro.server.service;

import utfpr.pb.pw26s.financeiro.server.model.DashDTO;
import utfpr.pb.pw26s.financeiro.server.model.Movimentacao;

public interface MovimentacaoService extends CrudService<Movimentacao, Long>{

    DashDTO findByvalorPago();

}
