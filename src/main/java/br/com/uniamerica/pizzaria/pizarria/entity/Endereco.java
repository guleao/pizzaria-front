package br.com.uniamerica.pizzaria.pizarria.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name = "endereco", schema = "public")
@Getter @Setter
public class Endereco {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name = "id" , nullable = false, unique = true)
    private Long id;

    @Column (name = "rua")
    private String rua;

    @Column (name = "bairro")
    private String bairro;

    @Column (name = "n_casa")
    private int numCasa;

    @Column (name = "cep")
    private String cep;
    @Column (name = "observ")
    private String observ;

//    @ManyToOne
//    @JoinColumn(name = "usuario_id")
    @JsonBackReference
    @ManyToOne
    private UsuarioEntity usuario;


    public Endereco (){}

//    public Endereco(Endereco endereco) {
//        this.id = endereco.getId();
//        this.rua = endereco.getRua();
//        this.bairro = endereco.getBairro();
//        this.numCasa = endereco.getNumCasa();
//        this.cep = endereco.getCep();
//        this.observ = endereco.getObserv();
//    }
//    public Endereco(Long id, String rua, String bairro, int numCasa, String cep, String observ) {
//        this.id = id;
//        this.rua = rua;
//        this.bairro = bairro;
//        this.numCasa = numCasa;
//        this.cep = cep;
//        this.observ = observ;
//    }

}
