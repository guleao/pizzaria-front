// package br.com.uniamerica.pizzaria.pizarria.controller;

// import br.com.uniamerica.pizzaria.pizarria.dto.*;
// //import br.com.uniamerica.pizzaria.pizarria.service.TokenService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.*;

// @RestController
// //@RequestMapping(value = "/api/login")
// @RequestMapping(value = "/api/login")
// @CrossOrigin(origins = "http://localhost:4200")
// public class LoginController {

//     @Autowired
//     private LoginService loginService;


//     // @PostMapping
//     // public ResponseEntity<UsuarioDTO> logar(@RequestBody LoginDTO loginDTO) {
//     //     try {
//     //         return ResponseEntity.ok(loginService.logar(loginDTO));
//     //     }catch(AuthenticationException ex) {
//     //         return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//     //     }catch (Exception e) {
//     //         return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//     //     }
//     // }

//     @PostMapping
//     public ResponseEntity<UsuarioDTO> logar(@RequestBody LoginDTO loginDTO) {
//         try {
//             return ResponseEntity.ok(loginService.logar(loginDTO));
//         }catch(AuthenticationException ex) {
//             return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//         }catch (Exception e) {
//             return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//         }
//     }


//     @GetMapping("deslogar")
//     public ResponseEntity<HttpStatus> logout() {

//         SecurityContextHolder.clearContext();
//         return new ResponseEntity<>(null, HttpStatus.OK);

//     }


// //    @PostMapping
// //    public ResponseEntity <LoginMessage> loginPost (@Validated @RequestBody LoginDTO loginDTO){
// //        LoginMessage loginMessage = loginService.validaLogin (loginDTO);
// //        return ResponseEntity.ok(loginMessage);
// //    }


// //    @Autowired
// //    private TokenService tokenService;

// //    @PostMapping ("/login")
// //    public ResponseEntity login (@RequestBody @Valid AuthenticationDTO data){
// //        var userNamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
// //        var auth = this.authenticationManager.authenticate(userNamePassword);
// //
// //        var token = tokenService.generateToken((UsuarioEntity) auth.getPrincipal());
// //
// //        return ResponseEntity.ok(new LoginResponseDTO(token));
// //    }

// //    @PostMapping ("/register")
// //    public ResponseEntity register (@RequestBody @Valid RegisterDTO data){
// //        if (this.usuarioRepository.findByEmail(data.email())!= null) return ResponseEntity.badRequest().build();
// //
// //        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
// //        UsuarioEntity newUser = new UsuarioEntity(data.nomeUsuario(), data.telefone(), data.enderecos(), data.email(), encryptedPassword, data.role());
// //
// //        this.usuarioRepository.save(newUser);
// //
// //        return ResponseEntity.ok().build();
// //    }

// }
