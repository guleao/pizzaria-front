package br.com.uniamerica.pizzaria.pizarria.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table (name = "estoque_produtos", schema = "public")
@Getter @Setter
public class EstoqueProdutos {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name = "id" , nullable = false, unique = true)
    private Long id;

    @Column (name = "preco_produto")
    private float precoProd;

    @Column (name = "nome_produto", nullable = false, length = 150)
    private String nomeProd;

    public EstoqueProdutos (){}

    public EstoqueProdutos(Long id, float precoProd, String nomeProd) {
        this.id = id;
        this.precoProd = precoProd;
        this.nomeProd = nomeProd;
    }

    public EstoqueProdutos(EstoqueProdutos estoqueProdutos) {
        this.id = estoqueProdutos.getId();
        this.precoProd = estoqueProdutos.getPrecoProd();
        this.nomeProd = estoqueProdutos.getNomeProd();
    }

    public EstoqueProdutos(Long id, String nomeProd) {
        this.id = id;
        this.nomeProd = nomeProd;
    }
}
