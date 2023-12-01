package br.com.uniamerica.pizzaria.pizarria.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class FuncionarioDTO {
    private Long id;
    @NotNull(message = "Nome não pode ser nulo")
    @Size(max = 150, message = "Limite máximo de caracters atingidos para nome")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]*$", message = "Nome não pode conter caracteres especiais")
    @NotBlank(message = "Nome não pode estar em branco")
    private String nomeFuncionario;

    @NotNull (message = "E-mail não pode ser nulo")
    @Size (max = 150, message = "Limite máximo de caracters atingidos para e-mail")
    private String email;

    @NotNull (message = "Senha não pode ser nula")
    @Size (max = 150, message = "Limite máximo de caracters atingidos para senha")
    private String senha;

    public FuncionarioDTO (){}

    public FuncionarioDTO(Long id, String nomeFuncionario) {
        this.id = id;
        this.nomeFuncionario = nomeFuncionario;
    }
}
