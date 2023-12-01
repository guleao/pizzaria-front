package br.com.uniamerica.pizzaria.pizarria.dto;

import br.com.uniamerica.pizzaria.pizarria.entity.EstoqueProdutos;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProdutosDTO {


    private Long id;

//    @Size (min = 1, message = "Quantidade não pode ser nula")
    private int quantidade;

    @NotNull(message = "Nome não pode ser nulo")
    @Size(max = 150, message = "Limite máximo de caracters atingidos para nome do produto")
    private String nome;

    private float valor;

    private EstoqueProdutos estoque;

    private float totalProduto;

    public ProdutosDTO (){}

    public ProdutosDTO(Long id, int quantidade, EstoqueProdutos estoque, float totalProduto) {
        this.id = id;
        this.quantidade = quantidade;
        this.estoque = estoque;
        this.totalProduto = totalProduto;
    }
}
