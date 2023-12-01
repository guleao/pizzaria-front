package br.com.uniamerica.pizzaria.pizarria.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class EstoqueProdutoDTO {
    private Long id;

    @NotNull (message = "Preço do produto não pode ser nulo")
    private float precoProd;

    @NotNull(message = "Nome do produto não pode ser nulo")
    @Size(max = 150)
    private String nomeProd;

    public EstoqueProdutoDTO (){}

    public EstoqueProdutoDTO(Long id, float precoProd, String nomeProd) {
        this.id = id;
        this.precoProd = precoProd;
        this.nomeProd = nomeProd;
    }

    public EstoqueProdutoDTO(Long id, String nomeProd) {
        this.id = id;
        this.nomeProd = nomeProd;
    }
}
