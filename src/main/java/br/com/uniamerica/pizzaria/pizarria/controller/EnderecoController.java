package br.com.uniamerica.pizzaria.pizarria.controller;

import br.com.uniamerica.pizzaria.pizarria.dto.EnderecoDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.Endereco;
import br.com.uniamerica.pizzaria.pizarria.repository.EnderecoRepository;
import br.com.uniamerica.pizzaria.pizarria.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/endereco")
@CrossOrigin
public class EnderecoController {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private EnderecoService enderecoService;

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> findByIdPath(@PathVariable("id") final Long id) {
        final Endereco endereco = this.enderecoRepository.findById(id).orElse(null);
        return ResponseEntity.ok(endereco);
    }

    @GetMapping("/lista")
    public ResponseEntity<List <Endereco>> listaCompleta() {
        return ResponseEntity.ok(this.enderecoRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<String> cadastraEndereco (@Validated @RequestBody final EnderecoDTO enderecoDTO) {
        try {
            this.enderecoService.validaEndereco(enderecoDTO);
            return ResponseEntity.ok("Endereco cadastrado com sucesso.");
        } catch (DataIntegrityViolationException e) {
            String errorMessage = "Error: " + e.getCause().getCause().getMessage();
            return ResponseEntity.internalServerError().body(errorMessage);
        } catch (Exception e) {
            String errorMessage = getErrorMessage(e);
            return ResponseEntity.internalServerError().body(errorMessage);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> editarEndereco (@PathVariable("id") final Long id, @Validated @RequestBody final EnderecoDTO enderecoDTO) {
        try {
            this.enderecoService.editaEndereco(id,enderecoDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deletaEndereco (@RequestParam("id") final Long id) {
        try {
            this.enderecoService.deletaEndereco(id);
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
