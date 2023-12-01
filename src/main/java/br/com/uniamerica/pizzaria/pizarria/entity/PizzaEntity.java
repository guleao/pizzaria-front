package br.com.uniamerica.pizzaria.pizarria.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table (name = "pizza", schema = "public")
@Getter @Setter
public class PizzaEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name = "id" , unique = true)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "pizza_sabor",
            uniqueConstraints = @UniqueConstraint(
                    columnNames = {
                            "pizza_id",
                            "sabor_id"
                    }
            ),
            joinColumns = @JoinColumn(
                    name = "pizza_id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "sabor_id"
            )
    )
    private List<SaboresEntity> sabores;

    @Column (name = "preco_pizza", nullable = false)
    private float precoPizza;

    @Column (name = "quant_pizza", nullable = false)
    private int quantPizza;

    @Enumerated(EnumType.STRING)
    @Column (name = "tamanho")
    private Tamanho tamanho;

    public PizzaEntity (){}

    public PizzaEntity(Long id, List<SaboresEntity> sabores, float precoPizza, int quantPizza, Tamanho tamanho) {
        this.id = id;
        this.sabores = sabores;
        this.precoPizza = precoPizza;
        this.quantPizza = quantPizza;
        this.tamanho = tamanho;
    }


}
