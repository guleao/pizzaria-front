package br.com.uniamerica.pizzaria.pizarria.controller;


import br.com.uniamerica.pizzaria.pizarria.dto.ProdutosDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.ProdutosEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.ProdutosRepository;
import br.com.uniamerica.pizzaria.pizarria.service.ProdutosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/produto")
@CrossOrigin
public class ProdutosController {

    @Autowired
    private ProdutosRepository produtoRepository;

    @Autowired
    private ProdutosService produtoService;

    @GetMapping("/{id}")
    public ResponseEntity<ProdutosEntity> findByIdPath(@PathVariable("id") final Long id) {
        final ProdutosEntity produto = this.produtoRepository.findById(id).orElse(null);
        return ResponseEntity.ok(produto);
    }

    @GetMapping
    public ResponseEntity<List <ProdutosEntity>> listaCompleta() {
        return ResponseEntity.ok(this.produtoRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<HttpStatus> cadastrar(@Validated @RequestBody final ProdutosDTO produto) {
        try {
            this.produtoService.validarProduto(produto);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping ("/{id}")
    public ResponseEntity<HttpStatus> editar(@PathVariable("id") final Long id, @Validated @RequestBody final ProdutosDTO produtoDTO) {
        try {
            this.produtoService.editarProduto(id, produtoDTO);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity <> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> delete(@RequestParam("id") final Long id) {
        try {
            this.produtoService.deletarProduto(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    // private String getErrorMessage(Exception e) {
    //     return "Error: " + e.getMessage();
    // }
}
