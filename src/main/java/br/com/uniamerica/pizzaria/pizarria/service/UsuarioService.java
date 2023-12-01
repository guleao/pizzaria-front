package br.com.uniamerica.pizzaria.pizarria.service;

import br.com.uniamerica.pizzaria.pizarria.config.JwtServiceGenerator;
import br.com.uniamerica.pizzaria.pizarria.dto.EnderecoDTO;
import br.com.uniamerica.pizzaria.pizarria.dto.LoginDTO;
import br.com.uniamerica.pizzaria.pizarria.dto.UsuarioDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.Endereco;
import br.com.uniamerica.pizzaria.pizarria.entity.UsuarioEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.UsuarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtServiceGenerator jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional(rollbackFor = Exception.class)
    public void validaUsuario (final UsuarioDTO usuarioDTO){

        var usuario = new UsuarioEntity();
        BeanUtils.copyProperties(usuarioDTO,usuario);

        List<EnderecoDTO> enderecoDTOs = usuarioDTO.getEnderecos();
        List<Endereco> enderecos = new ArrayList<>();

        for (EnderecoDTO enderecoDTO : enderecoDTOs) {
            Endereco enderecoEntity = new Endereco();
            enderecoEntity.setCep(enderecoDTO.getCep());
            enderecoEntity.setRua(enderecoDTO.getRua());
            enderecoEntity.setBairro(enderecoDTO.getBairro());
            enderecoEntity.setNumCasa (enderecoDTO.getNumCasa());

            enderecoEntity.setUsuario(usuario);
            enderecos.add(enderecoEntity);
        }


//        UsuarioEntity usuario1 = usuarioRepository.findByEmail(usuario.getEmail());
//        Assert.isTrue(usuario1 == null || usuario1.equals(usuario1.getEmail()), "E-mail Já existente");

//        String senhaEncriptada = passwordEncoder.encode(usuario.getSenha());
//        usuario.setSenha(senhaEncriptada);

        usuario.setEnderecos(enderecos);
        this.usuarioRepository.save(usuario);
    }

    @Transactional(rollbackFor = Exception.class)
    public void editaUsuario (final Long id, final UsuarioDTO usuarioDTO){

        Assert.isTrue(!usuarioDTO.getUsername().equals(""), "Nome de usuário não pode ser nulo");
        Assert.isTrue(usuarioDTO.getUsername().length() <= 100, "Nome de usuário acima do limite de caracteres");

        Assert.isTrue(!usuarioDTO.getTelefone().equals(""), "CPF não pode ser nulo");

        final UsuarioEntity usuario1 = this.usuarioRepository.findById(id).orElse(null);

        if (usuario1 == null || !usuario1.getId().equals(id)) {
            throw new RegistroNaoEncontradoException("Nao foi possivel indentificar o registro informado");
        }

        BeanUtils.copyProperties(usuarioDTO, usuario1);


        List<Endereco> enderecos = usuario1.getEnderecos();

        for (EnderecoDTO enderecoDTO : usuarioDTO.getEnderecos()) {
            if (enderecoDTO.getId() != null) {
                Optional<Endereco> enderecoExistente = enderecos.stream()
                        .filter(endereco -> endereco.getId().equals(enderecoDTO.getId()))
                        .findFirst();
                usuario1.setEnderecos(enderecos);
            } else {
                Endereco novoEndereco = new Endereco();
                BeanUtils.copyProperties(enderecoDTO, novoEndereco);
                novoEndereco.setUsuario(usuario1);
                enderecos.add(novoEndereco);
            }
        }

        String senhaEncriptada = passwordEncoder.encode(usuario1.getSenha());

        usuario1.setSenha(senhaEncriptada);

        this.usuarioRepository.save(usuario1);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deletaUsuario (final Long id){

        final UsuarioEntity usuario1 = this.usuarioRepository.findById(id).orElse(null);

        if (usuario1 == null || !usuario1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel encontrar o usuário.");
        }

        this.usuarioRepository.delete(usuario1);
    }

    public static class RegistroNaoEncontradoException extends RuntimeException {
        public RegistroNaoEncontradoException(String message) {
            super(message);
        }
    }


     public UsuarioDTO logar(LoginDTO loginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getSenha()
                )
        );
        UsuarioEntity user = usuarioRepository.findByUsername(loginDTO.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return toUserDTO(user, jwtToken);
    }


    private UsuarioDTO toUserDTO(UsuarioEntity user, String token) {
        UsuarioDTO userDTO = new UsuarioDTO();
        userDTO.setId(user.getId());
        userDTO.setRole(user.getRole());
        userDTO.setToken(token);
        userDTO.setUsername(user.getUsername());
        return userDTO;
    }


}
