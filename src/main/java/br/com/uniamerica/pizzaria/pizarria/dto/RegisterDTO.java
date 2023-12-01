package br.com.uniamerica.pizzaria.pizarria.dto;

import br.com.uniamerica.pizzaria.pizarria.entity.Endereco;

import java.util.List;

public record RegisterDTO(String nomeUsuario, String telefone, List <Endereco> enderecos, String email, String senha, String role) {
}
