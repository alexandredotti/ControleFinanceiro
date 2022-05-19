package utfpr.pb.pw26s.financeiro.server.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Conta implements Serializable {

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
