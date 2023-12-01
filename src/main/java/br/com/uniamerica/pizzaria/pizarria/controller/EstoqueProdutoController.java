package br.com.uniamerica.pizzaria.pizarria.controller;

import br.com.uniamerica.pizzaria.pizarria.dto.EstoqueProdutoDTO;

import br.com.uniamerica.pizzaria.pizarria.entity.EstoqueProdutos;
import br.com.uniamerica.pizzaria.pizarria.repository.EstoqueProdutoRepository;
import br.com.uniamerica.pizzaria.pizarria.service.EstoqueProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/estoqueproduto")
@CrossOrigin
public class EstoqueProdutoController {

    @Autowired
    private EstoqueProdutoRepository estoqueProdutoRepository;

    @Autowired
    private EstoqueProdutoService estoqueProdutoService;

    @GetMapping("/{id}")
    public ResponseEntity<EstoqueProdutos> findByIdPath(@PathVariable("id") final Long id) {
        final EstoqueProdutos estoqueProduto = this.estoqueProdutoRepository.findById(id).orElse(null);
        return ResponseEntity.ok(estoqueProduto);
    }

    @GetMapping
    public ResponseEntity<List <EstoqueProdutos>> listaCompleta() {
        return ResponseEntity.ok(this.estoqueProdutoRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<HttpStatus> cadastrar(@Validated @RequestBody final EstoqueProdutoDTO estoqueProduto) {
        try {
            this.estoqueProdutoService.validaEstoque(estoqueProduto);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null,  HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> editar(@PathVariable("id") final Long id, @Validated @RequestBody final EstoqueProdutoDTO estoqueProdutoDTO) {
        try {
            this.estoqueProdutoService.editaEstoque(id, estoqueProdutoDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> delete(@RequestParam("id") final Long id
    ) {
        try {
            this.estoqueProdutoService.deletarProduto(id);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    // private String getErrorMessage(Exception e) {
    //     return "Error: " + e.getMessage();
    // }

}
