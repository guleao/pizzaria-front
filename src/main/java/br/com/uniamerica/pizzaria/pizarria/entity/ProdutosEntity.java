package br.com.uniamerica.pizzaria.pizarria.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name = "produtos", schema = "public")
@Getter @Setter
public class ProdutosEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name = "id" , unique = true)
    private Long id;

    @Column (name = "nome", nullable = false, length = 150)
    private String nome;

    @Column (name = "valor")
    private float valor;

    @Column (name = "quant_prod", nullable = false)
    private int quantidade;

    @ManyToOne
    @JoinColumn (name = "produto_id")
    private EstoqueProdutos estoque;

    @Column (name = "total_produto")
    private float totalProduto;

    public ProdutosEntity (){}

    public ProdutosEntity(Long id, int quantidade, EstoqueProdutos estoque, float totalProduto) {
        this.id = id;
        this.quantidade = quantidade;
        this.estoque = estoque;
        this.totalProduto = totalProduto;
    }

    public ProdutosEntity (ProdutosEntity produtos){
        this.id = produtos.getId();
        this.quantidade = produtos.getQuantidade();
        this.estoque = produtos.getEstoque();
        this.totalProduto = produtos.getTotalProduto();
    }
}
