package utfpr.pb.pw26s.financeiro.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utfpr.pb.pw26s.financeiro.server.model.Movimentacao;
import utfpr.pb.pw26s.financeiro.server.service.MovimentacaoService;
import utfpr.pb.pw26s.financeiro.server.shared.GenericResponse;

import javax.validation.Valid;

@RestController
@RequestMapping("movimentacoes")
public class MovimentacaoController {

    @Autowired
    MovimentacaoService movimentacaoService;

    @PostMapping
    GenericResponse novaMovimentacao(@Valid @RequestBody Movimentacao movimentacao){
        movimentacaoService.save(movimentacao);
        return new GenericResponse("Registro salvo");
    }
}
