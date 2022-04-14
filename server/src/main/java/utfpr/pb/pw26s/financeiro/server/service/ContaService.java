package utfpr.pb.pw26s.financeiro.server.service;

import org.springframework.stereotype.Service;
import utfpr.pb.pw26s.financeiro.server.model.Conta;
import utfpr.pb.pw26s.financeiro.server.repository.ContaRepository;

@Service
public class ContaService {

    ContaRepository contaRepository;

    public ContaService(ContaRepository contaRepository){
        this.contaRepository = contaRepository;
    }

    public Conta save(Conta conta){
        return contaRepository.save(conta);
    }
}
