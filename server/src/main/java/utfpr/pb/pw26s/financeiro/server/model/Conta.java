package utfpr.pb.pw26s.financeiro.server.model;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Conta {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne()
    @JoinColumn(name="usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    @NotNull
    private Integer numero;

    @NotNull
    private Integer agencia;

    @NotNull
    private Integer banco;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TipoConta tipoConta;
}
