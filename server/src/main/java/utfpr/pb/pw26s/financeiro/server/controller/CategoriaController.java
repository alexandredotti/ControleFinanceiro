package utfpr.pb.pw26s.financeiro.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utfpr.pb.pw26s.financeiro.server.model.Categoria;
import utfpr.pb.pw26s.financeiro.server.service.CategoriaService;
import utfpr.pb.pw26s.financeiro.server.shared.GenericResponse;

import javax.validation.Valid;

@RestController
@RequestMapping("categoria")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;

    @PostMapping
    GenericResponse novaCategoria(@Valid @RequestBody Categoria categoria){
        categoriaService.save(categoria);
        return new GenericResponse("Registro salvo");
    }
}
