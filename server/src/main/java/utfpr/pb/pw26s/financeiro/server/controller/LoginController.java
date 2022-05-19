package utfpr.pb.pw26s.financeiro.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utfpr.pb.pw26s.financeiro.server.model.Usuario;
import utfpr.pb.pw26s.financeiro.server.security.AuthUsuarioService;
import utfpr.pb.pw26s.financeiro.server.security.UsuarioDTO;

import java.security.Principal;

@RestController
@RequestMapping("login")
public class LoginController {

    @Autowired
    private AuthUsuarioService authUsuarioService;

    @GetMapping("user-info")
    public UsuarioDTO getUserInfo(Principal principal) {
        return new UsuarioDTO( (Usuario)
                authUsuarioService.loadUserByUsername(principal.getName()));
    }
}
