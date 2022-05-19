package utfpr.pb.pw26s.financeiro.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import utfpr.pb.pw26s.financeiro.server.model.Conta;
import utfpr.pb.pw26s.financeiro.server.repository.ContaRepository;
import utfpr.pb.pw26s.financeiro.server.service.ContaService;

public class ContaServiceImpl extends CrudServiceImpl<Conta, Long> implements ContaService {

    private ContaRepository contaRepository;

    public ContaServiceImpl(ContaRepository contaRepository){
        this.contaRepository = contaRepository;

    }
    @Override
    protected JpaRepository<Conta, Long> getRepository() {
        return this.contaRepository;
    }
}
