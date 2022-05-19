package utfpr.pb.pw26s.financeiro.server.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import utfpr.pb.pw26s.financeiro.server.model.Usuario;
import utfpr.pb.pw26s.financeiro.server.repository.UsuarioRepository;

@Service
public class AuthUsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return usuario;
    }
}
