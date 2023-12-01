package br.com.uniamerica.pizzaria.pizarria.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name = "sabores", schema = "public")
@Getter @Setter
public class SaboresEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name = "id" , unique = true)
    private Long id;

    @Column (name = "nome_sabor", nullable = false, length = 150)
    private String nomeSabor;

    @Column (name = "ingredientes", nullable = false, length = 150)
    private String ingredientes;

    public SaboresEntity(){}

    public SaboresEntity(Long id, String nomeSabor) {
        this.id = id;
        this.nomeSabor = nomeSabor;
    }

    public SaboresEntity(SaboresEntity sabor) {
        this.id = sabor.getId();
        this.nomeSabor = sabor.getNomeSabor();
    }
}
