package br.com.uniamerica.pizzaria.pizarria.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table (name = "pedidos", schema = "public")
@Getter @Setter
public class PedidoEntity {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name = "id" , nullable = false, unique = true)
    private Long id;

    // @ManyToOne(fetch = FetchType.EAGER)
    // @JoinColumn(name = "funcionario")
    // private FuncionarioEntity funcionario;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioEntity usuario;

    @Column (name = "observacao")
    private String obs;


    @Column (name = "pedido_preco")
    private float pedidoPreco;

    @Enumerated(EnumType.STRING)
    @Column (name = "status")
    private Status status;

    @Column (name = "delivery")
    private boolean delivery;

    @Column (name = "entregue")
    private boolean entregue;


    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "pedido_id")
    private List<PizzaEntity> pizzas;

    @Column (name = "pagameto_cartao")
    private boolean pagamentoCartao;

    @Column (name = "dinheiro")
    private boolean pagamentoDinheiro;


    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "produtos")
    private List<ProdutosEntity> produtos;

    @Column (name = "dataPedido")
    private LocalDateTime dataPedido;

    @Column (name = "preco")
    private float preco;

    @Column (name = "cancelado")
    private boolean cancelado;

    @Column(name = "data_cadastro")
    private LocalDateTime cadastro;

    @Column (name = "entrega")
    private boolean entrega;

    public PedidoEntity (){}

    @SuppressWarnings("java:S107")
    public PedidoEntity(Long id, UsuarioEntity usuario, String obs, float pedidoPreco, Status status, boolean delivery, List<PizzaEntity> pizzas, boolean pagamentoCartao, boolean pagamentoDinheiro, List<ProdutosEntity> produtos, LocalDateTime dataPedido) {
        this.id = id;
        // this.funcionario = funcionario;
        this.usuario = usuario;
        this.obs = obs;
        this.pedidoPreco = pedidoPreco;
        this.status = status;
        this.delivery = delivery;
        this.pizzas = pizzas;
        this.pagamentoCartao = pagamentoCartao;
        this.pagamentoDinheiro = pagamentoDinheiro;
        this.produtos = produtos;
        this.dataPedido = dataPedido;
    }

    public PedidoEntity(String obs, UsuarioEntity cliente, float preco, Status status, List<PizzaEntity> pizzas, List<ProdutosEntity> produtos, boolean entrega, boolean delivery, boolean cancelado, boolean pagamentoCartao, LocalDateTime cadastro) {
        this.obs = obs;
        this.usuario = cliente;
        this.pedidoPreco = preco;
        this.status = status;
        this.pizzas = pizzas;
        this.produtos = produtos;
        this.entrega = entrega;
        this.delivery = delivery;
        this.cancelado = cancelado;
        this.pagamentoCartao = pagamentoCartao;
        this.cadastro = cadastro;
        // this.funcionario = funcionario;
    }

    public PedidoEntity(Long id,String obs, UsuarioEntity cliente, float preco, Status status, List<PizzaEntity> pizzas, List<ProdutosEntity> produtos, boolean entrega, boolean delivery, boolean cancelado, boolean pagamentoCartao, LocalDateTime cadastro) {
        this.id = id;
        this.obs = obs;
        this.usuario = cliente;
        this.preco= preco;
        this.status = status;
        this.pizzas = pizzas;
        this.produtos = produtos;
        this.entregue = entrega;
        this.delivery = delivery;
        this.cancelado = cancelado;
        this.pagamentoCartao = pagamentoCartao;
        this.cadastro = cadastro;
        // this.funcionario = funcionario;
    }
    @PrePersist
    private void prePersist(){
        this.dataPedido = LocalDateTime.now();
    }
}
