package utfpr.pb.pw26s.financeiro.server.shared;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GenericResponse {

    private String mensagem;

    public GenericResponse(String mensagem) {
        this.mensagem = mensagem;
    }
}
