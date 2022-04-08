package utfpr.pb.pw26s.financeiro.server.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Categoria {

    @Id
    @GeneratedValue
    private long id;

    @NotNull
    private String nome;
}
