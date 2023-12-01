// package br.com.uniamerica.pizzaria.pizarria.service;

// import br.com.uniamerica.pizzaria.pizarria.config.JwtServiceGenerator;
// import br.com.uniamerica.pizzaria.pizarria.dto.LoginDTO;
// import br.com.uniamerica.pizzaria.pizarria.dto.UsuarioDTO;
// import br.com.uniamerica.pizzaria.pizarria.entity.UsuarioEntity;
// import br.com.uniamerica.pizzaria.pizarria.repository.UsuarioRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.stereotype.Service;

// @Service
// public class LoginService {
//     @Autowired
//     private UsuarioRepository repository;
//     @Autowired
//     private JwtServiceGenerator jwtService;
//     @Autowired
//     private AuthenticationManager authenticationManager;

//     public UsuarioDTO logar(LoginDTO loginDTO) {
//         authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(
//                         loginDTO.getUsername(),
//                         loginDTO.getSenha()));
//         UsuarioEntity user = repository.findByUsername(loginDTO.getUsername()).orElseThrow();
//         var jwtToken = jwtService.generateToken(user);

//         return toUserDTO(user, jwtToken);
//     }

//     private UsuarioDTO toUserDTO(UsuarioEntity user, String token) {
//         UsuarioDTO userDTO = new UsuarioDTO();
//         userDTO.setId(user.getId());
//         userDTO.setRole(user.getRole());
//         userDTO.setToken(token);
//         userDTO.setUsername(user.getUsername());
//         return userDTO;
//     }

// }
