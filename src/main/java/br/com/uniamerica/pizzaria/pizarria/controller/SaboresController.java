package br.com.uniamerica.pizzaria.pizarria.controller;


import br.com.uniamerica.pizzaria.pizarria.dto.SaboresDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.SaboresEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.SaboresRepository;
import br.com.uniamerica.pizzaria.pizarria.service.SaboresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/sabores")
@CrossOrigin
public class SaboresController {

    @Autowired
    private SaboresRepository saboresRepository;

    @Autowired
    private SaboresService saboresService;

    @GetMapping("/{id}")
    public ResponseEntity<SaboresEntity> findByIdPath(@PathVariable("id") final Long id) {
        final SaboresEntity sabores = this.saboresRepository.findById(id).orElse(null);
        return ResponseEntity.ok(sabores);
    }

    @GetMapping
    public ResponseEntity<List <SaboresEntity>> listaCompleta() {
        return ResponseEntity.ok(this.saboresRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<HttpStatus> cadastrar(@Validated @RequestBody final SaboresDTO sabores) {
        try {
            saboresService.validaSabor(sabores);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null,  HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> editar(@PathVariable("id") final Long id, @Validated @RequestBody final SaboresDTO saboresDTO) {
        try {
            this.saboresService.editaSabor(id, saboresDTO);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> delete(@RequestParam("id") final Long id) {
        try {
            this.saboresService.deletaSabor(id);
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

