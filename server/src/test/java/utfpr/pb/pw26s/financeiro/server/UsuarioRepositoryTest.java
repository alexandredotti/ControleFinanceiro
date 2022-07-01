package utfpr.pb.pw26s.financeiro.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import utfpr.pb.pw26s.financeiro.server.model.Usuario;
import utfpr.pb.pw26s.financeiro.server.repository.UsuarioRepository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class UsuarioRepositoryTest {
    @Autowired
    TestEntityManager testEntityManager;
    @Autowired
    UsuarioRepository usuarioRepository;

    @Test
    public void findByUsername_whenUserExists_returnsUser() {
        Usuario usuario = new Usuario();
        usuario.setNome("test-nome");
        usuario.setEmail("test-email");
        usuario.setSenha("P4ssword");
        testEntityManager.persist(usuario);

        Usuario usuarioDB = usuarioRepository.findByEmail("test-email");
        assertThat(usuarioDB).isNotNull();
    }

    @Test
    public void findByUsername_whenUserExists_returnsNull() {
        Usuario usuarioDB = usuarioRepository.findByEmail("test-email");
        assertThat(usuarioDB).isNull();
    }

}
