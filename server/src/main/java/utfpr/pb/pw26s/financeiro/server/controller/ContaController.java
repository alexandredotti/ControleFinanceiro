package utfpr.pb.pw26s.financeiro.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utfpr.pb.pw26s.financeiro.server.model.Conta;
import utfpr.pb.pw26s.financeiro.server.service.ContaService;
import utfpr.pb.pw26s.financeiro.server.service.CrudService;

import javax.validation.Valid;

@RestController
@RequestMapping("conta")
public class ContaController extends CrudController<Conta, Long>{

    @Autowired
    private ContaService contaService;

    @Override
    protected CrudService<Conta, Long> getService() {
        return this.contaService;
    }
}
