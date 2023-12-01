package br.com.uniamerica.pizzaria.pizarria.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table (name = "tb_usuario", schema = "public")
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UsuarioEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name = "id" , unique = true)
    private Long id;

    @Column (name = "nome_usuario", nullable = false, length = 150)
    private String username;

    @Column (name = "telefone_usuario", nullable = false, length = 12)
    private String telefone;

    @Column (name = "email_usuario")
    private String email;

    @Column (name = "senha_usuario")
    private String senha;

    private String role;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
    private List<Endereco> enderecos;


    public UsuarioEntity (){}

    public UsuarioEntity (String nomeUsuario, String telefone, List <Endereco> enderecos, String email, String senha, String role){
        this.username = nomeUsuario;
        this.telefone = telefone;
        this.enderecos = enderecos;
        this.email = email;
        this.senha = senha;
        this.role = role;
    }

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        if (this.role == UsuarioRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
//        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(this.role));
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.senha = password;
    }

//    public UsuarioEntity(Long id, String nomeUsuario, String telefone, List<Endereco> enderecos) {
//        this.id = id;
//        this.nomeUsuario = nomeUsuario;
//        this.telefone = telefone;
//        this.enderecos = enderecos;
//    }
//
//    public UsuarioEntity(Long id, String nomeUsuario) {
//        this.id = id;
//        this.nomeUsuario = nomeUsuario;
//    }


}


