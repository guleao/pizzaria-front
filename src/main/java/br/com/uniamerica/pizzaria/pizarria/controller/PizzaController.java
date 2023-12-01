package br.com.uniamerica.pizzaria.pizarria.controller;

import br.com.uniamerica.pizzaria.pizarria.dto.PizzaDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.PizzaEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.PizzaRepository;
import br.com.uniamerica.pizzaria.pizarria.service.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/pizza")
@CrossOrigin
public class PizzaController {

    @Autowired
    private PizzaRepository pizzaRepository;

    @Autowired
    private PizzaService pizzaService;

    @GetMapping("/{id}")
    public ResponseEntity<PizzaEntity> findByIdPath(@PathVariable("id") final Long id) {
        final PizzaEntity pizza = this.pizzaRepository.findById(id).orElse(null);
        return ResponseEntity.ok(pizza);
    }

    @GetMapping
    public ResponseEntity<List<PizzaEntity>> listaCompleta() {
        return ResponseEntity.ok(this.pizzaRepository.findAll());
    }


    @PostMapping
    public PizzaDTO cadastrarPizza(@Validated @RequestBody final PizzaDTO pizza) {
        try {
            return this.pizzaService.validaPizza(pizza);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return null;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> editarPizza (@PathVariable("id") final Long id, @Validated @RequestBody final PizzaDTO pizzaDTO) {
        try {
            this.pizzaService.editaPizza(id, pizzaDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deletarPizza (@RequestParam("id") final Long id) {
        try {
            this.pizzaService.deletaPizza(id);
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
