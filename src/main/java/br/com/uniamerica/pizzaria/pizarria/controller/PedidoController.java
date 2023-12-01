package br.com.uniamerica.pizzaria.pizarria.controller;

import br.com.uniamerica.pizzaria.pizarria.dto.PedidoDTO;
import br.com.uniamerica.pizzaria.pizarria.dto.RelatorioDiaDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.PedidoEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.PedidoRepository;
import br.com.uniamerica.pizzaria.pizarria.service.PedidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/pedido")
@CrossOrigin
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidosService pedidoService;

    public PedidoController(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }


    @GetMapping("/{id}")
    public ResponseEntity<PedidoEntity> findByIdPath(@PathVariable("id") final Long id) {
        final PedidoEntity pedido = this.pedidoRepository.findById(id).orElse(null);
        return ResponseEntity.ok(pedido);
    }

    @GetMapping
    public ResponseEntity<List<PedidoEntity>> listaCompleta() {
        return ResponseEntity.ok(this.pedidoRepository.findAll());
    }

    @GetMapping("/totaldia")
    public RelatorioDiaDTO getTotalPedidosPorData(@RequestParam("data") LocalDate data) {
        Long totalPedidos = pedidoService.totalPedidosPorData(data);
        Long totalPedidosCartao = pedidoService.totalPagamentoCartao(data);
        Long totalPedidosDinheiro = pedidoService.totalPagamentoDinheiro(data);
        Long totalPedidosDelivery = pedidoService.totalPedidosDelivery(data);
        Long totalPedidosBalcao = pedidoService.totalPedidosBalcao(data);
        Long totalPedidosPagos = pedidoService.totalPagos(data);
        Long totalPedidosCancelados = pedidoService.totalCancelados(data);

        RelatorioDiaDTO relatorioDiaDTO = new RelatorioDiaDTO();
        relatorioDiaDTO.setTotalPedidos(totalPedidos);
        relatorioDiaDTO.setTotalPedidosCartao(totalPedidosCartao);
        relatorioDiaDTO.setTotalPedidosDinheiro(totalPedidosDinheiro);
        relatorioDiaDTO.setTotalPedidosDelivery(totalPedidosDelivery);
        relatorioDiaDTO.setTotalPedidosBalcao(totalPedidosBalcao);
        relatorioDiaDTO.setTotalPedidosPagos(totalPedidosPagos);
        relatorioDiaDTO.setTotalPedidosCancelados(totalPedidosCancelados);


        return relatorioDiaDTO;
    }


    @GetMapping ("/comandaentregue/{id}")
    public ResponseEntity <String> comandaEntrega (@PathVariable ("id") Long id){
        try {
            PedidoEntity pedido = pedidoService.findPedidoById(id);
            pedidoService.gerarComandaFinalizado(pedido);
            return ResponseEntity.ok("comanda gerada com sucesso");
        }catch (Exception e){
            String errorMessage = getErrorMessage(e);
            return ResponseEntity.internalServerError().body(errorMessage);
        }
    }

    @PostMapping
    public ResponseEntity<HttpStatus> cadastrarPedido (@Validated @RequestBody final PedidoDTO pedido) {
        try {
            this.pedidoService.validaPedido(pedido);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> editarPedido (@PathVariable("id") final Long id, @Validated @RequestBody final PedidoDTO pedidoDTO) {
        try {
            this.pedidoService.editaPedido(id, pedidoDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/finalizapedido/{id}")
    public ResponseEntity<String> finalizaPedido(@PathVariable ("id") final Long id, @RequestBody final PedidoEntity pedido){
        try {
            final PedidoEntity pedido1 = this.pedidoRepository.findById(id).orElse(null);

            if (pedido1 == null || !pedido1.getId().equals(pedido.getId())){
                return ResponseEntity.internalServerError().body("Nao foi posivel identificar o pedido informado");
            }
            this.pedidoService.finalizaPedido(pedido);
            return ResponseEntity.ok("Pedido finalizado");
        }
        catch (DataIntegrityViolationException e){
            String errorMessage = getErrorMessage(e);
            return ResponseEntity.internalServerError().body(errorMessage);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deletarPedido (@RequestParam("id") final Long id) {
        try {
            this.pedidoService.deletarPedido(id);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    private String getErrorMessage(Exception e) {
        return "Error: " + e.getMessage();
    }
}
