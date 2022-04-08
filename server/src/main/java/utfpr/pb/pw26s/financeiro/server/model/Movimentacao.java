package utfpr.pb.pw26s.financeiro.server.model;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
public class Movimentacao {

    @Id
    @GeneratedValue
    private long id;

    @OneToMany()
    @JoinColumn(name="conta_id", referencedColumnName = "id")
    private Conta conta;

    @NotNull
    private BigDecimal valor;

    private LocalDate dataVenc;

    @NotNull
    private BigDecimal valorPago;

    private LocalDate dataPagamento;

    @NotNull
    private String descrição;





}
