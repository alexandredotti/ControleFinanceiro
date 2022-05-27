package utfpr.pb.pw26s.financeiro.server.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Movimentacao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="conta_id", referencedColumnName = "id")
    private Conta conta;

    @NotNull
    @Column(nullable = false)
    private Double valor;

    @Column(nullable = false)
    private LocalDate dataVenc;

    @NotNull
    private Double valorPago;

    @Column(nullable = false)
    private LocalDate dataPagamento;

    @ManyToOne
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    private Categoria categoria;

    @NotNull
    @Size(min = 2, max = 1024)
    @Column(length = 1024, nullable = false)
    private String descrição;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TipoMovimentacao tipoMovimentacao;

}
