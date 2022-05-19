package utfpr.pb.pw26s.financeiro.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utfpr.pb.pw26s.financeiro.server.model.Movimentacao;
import utfpr.pb.pw26s.financeiro.server.service.CrudService;
import utfpr.pb.pw26s.financeiro.server.service.MovimentacaoService;
import utfpr.pb.pw26s.financeiro.server.shared.GenericResponse;

import javax.validation.Valid;

@RestController
@RequestMapping("movimentacoes")
public class MovimentacaoController extends CrudController<Movimentacao, Long> {

    @Autowired
    private MovimentacaoService movimentacaoService;

    @Override
    protected CrudService<Movimentacao, Long> getService() {
        return this.movimentacaoService;
    }
}
