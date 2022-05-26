package utfpr.pb.pw26s.financeiro.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import utfpr.pb.pw26s.financeiro.server.model.Conta;
import utfpr.pb.pw26s.financeiro.server.model.Usuario;
import utfpr.pb.pw26s.financeiro.server.repository.ContaRepository;
import utfpr.pb.pw26s.financeiro.server.repository.UsuarioRepository;
import utfpr.pb.pw26s.financeiro.server.service.ContaService;

@Service
public class ContaServiceImpl extends CrudServiceImpl<Conta, Long> implements ContaService {

    private ContaRepository contaRepository;
    private UsuarioRepository usuarioRepository;


    public ContaServiceImpl(ContaRepository contaRepository, UsuarioRepository usuarioRepository){
        this.contaRepository = contaRepository;
        this.usuarioRepository = usuarioRepository;

    }
    @Override
    protected JpaRepository<Conta, Long> getRepository() {
        return this.contaRepository;
    }

    @Override
    public Conta save(Conta entity) {

        //pegar usuario autenticado
        entity.setUsuario(usuarioRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()));
        return super.save(entity);
    }
}
