package br.com.uniamerica.pizzaria.pizarria.controller;


import br.com.uniamerica.pizzaria.pizarria.dto.LoginDTO;
import br.com.uniamerica.pizzaria.pizarria.dto.UsuarioDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.UsuarioEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.UsuarioRepository;
import br.com.uniamerica.pizzaria.pizarria.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.security.sasl.AuthenticationException;

@RestController
@RequestMapping(value = "/api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioEntity> findByIdPath(@PathVariable("id") final Long id) {
        final UsuarioEntity usuario = this.usuarioRepository.findById(id).orElse(null);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping public ResponseEntity<List<UsuarioEntity>> listaCompleta() {
        return ResponseEntity.ok(this.usuarioRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<HttpStatus> cadastrarUsuario (@Validated @RequestBody  final UsuarioDTO usuario) {
        try {
            this.usuarioService.validaUsuario(usuario);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null,  HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping ("/logar")
    public ResponseEntity<UsuarioDTO> logar(@RequestBody LoginDTO loginDTO) {
        try {
            return ResponseEntity.ok(usuarioService.logar(loginDTO));
        // }catch(AuthenticationException ex) {
        //     return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }








//    @PostMapping (path = "/login")
//    public ResponseEntity <LoginMessage> loginUsuario (@RequestBody LoginDTO loginDTO){
//        LoginMessage loginMessage = usuarioService.loginUsuario (loginDTO);
//        return ResponseEntity.ok(loginMessage);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> editarUsuario (@PathVariable("id") final Long id, @Validated @RequestBody final UsuarioDTO usuarioDTO) {
        try {
            this.usuarioService.editaUsuario(id, usuarioDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> delete(@RequestParam("id") final Long id) {
        try {
            this.usuarioService.deletaUsuario(id);
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