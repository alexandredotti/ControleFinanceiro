package utfpr.pb.pw26s.financeiro.server.security;

import lombok.Data;
import lombok.NoArgsConstructor;
import utfpr.pb.pw26s.financeiro.server.model.Usuario;

@Data
@NoArgsConstructor
public class UsuarioDTO {

    private long id;
    private String nome;
    private String email;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
    }
}
