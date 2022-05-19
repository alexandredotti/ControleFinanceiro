package utfpr.pb.pw26s.financeiro.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Categoria {


    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(length = 50, nullable = false)
    private String nome;
}
