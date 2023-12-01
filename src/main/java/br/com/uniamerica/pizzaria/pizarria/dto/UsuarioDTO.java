package br.com.uniamerica.pizzaria.pizarria.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class UsuarioDTO {
    private Long id;

    @NotNull (message = "Nome não pode ser nulo")
    @Size(max = 150, message = "Limite máximo de caracters atingidos para nome")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]*$", message = "Nome não pode conter caracteres especiais")
    @NotBlank (message = "Nome não pode estar em branco")
    private String username;

    @NotNull (message = "Telefone não pode ser nulo")
    @Size (max = 12, message = "Limite máximo de caracters atingidos para telefone")
    private String telefone;

    @NotNull (message = "E-mail não pode ser nulo")
    @Size (max = 150, message = "Limite máximo de caracters atingidos para e-mail")
    private String email;

    @NotNull (message = "Senha não pode ser nula")
    @Size (max = 150, message = "Limite máximo de caracters atingidos para senha")
    private String senha;

    private String token;

    private String role;

    private List<EnderecoDTO> enderecos;


    public UsuarioDTO (){}

    public UsuarioDTO(String nomeUsuario) {
        this.username = nomeUsuario;
    }

    public UsuarioDTO(Long id , String nomeUsuario) {
        this.id = id;
        this.username = nomeUsuario;
    }

}
