package utfpr.pb.pw26s.financeiro.server.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Conta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(length = 50, nullable = false)
    private String numero;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(length = 50, nullable = false)
    private String agencia;

    @NotNull
    @Column(nullable = false)
    private Integer banco;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TipoConta tipoConta;
}
