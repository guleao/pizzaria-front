package br.com.uniamerica.pizzaria.pizarria.controller;

import br.com.uniamerica.pizzaria.pizarria.dto.FuncionarioDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.FuncionarioEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.FuncionarioRepository;
import br.com.uniamerica.pizzaria.pizarria.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/funcionario")
@CrossOrigin
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioEntity> findByIdPath(@PathVariable("id") final Long id) {
        final FuncionarioEntity funcionario = this.funcionarioRepository.findById(id).orElse(null);
        return ResponseEntity.ok(funcionario);
    }

    @GetMapping
    public ResponseEntity<List <FuncionarioEntity>> listaCompleta() {
        return ResponseEntity.ok(this.funcionarioRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<HttpStatus> cadastrarFuncionario (@Validated @RequestBody final FuncionarioDTO funcionarioDTO) {
        try {
            this.funcionarioService.validaFuncionario(funcionarioDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> editarFuncionario (@PathVariable("id") final Long id, @Validated @RequestBody final FuncionarioDTO funcionarioDTO) {
        try {
            this.funcionarioService.editaFuncionario(id, funcionarioDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deletarFuncionario (@RequestParam("id") final Long id) {
        try {
            this.funcionarioService.deletarFuncionario(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    // private String getErrorMessage(Exception e) {
    //     return "Error: " + e.getMessage();
    // }
}