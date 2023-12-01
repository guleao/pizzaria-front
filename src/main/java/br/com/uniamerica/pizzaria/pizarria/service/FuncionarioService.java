package br.com.uniamerica.pizzaria.pizarria.service;

import br.com.uniamerica.pizzaria.pizarria.dto.FuncionarioDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.FuncionarioEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.FuncionarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

   
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(rollbackFor = Exception.class)
    public void validaFuncionario (final FuncionarioDTO funcionarioDTO){
        var funcionario = new FuncionarioEntity();
        BeanUtils.copyProperties(funcionarioDTO,funcionario);

        String senhaCodificada = this.passwordEncoder.encode(funcionario.getSenha());
        funcionario.setSenha(senhaCodificada);

        this.funcionarioRepository.save(funcionario);
    }

    @Transactional(rollbackFor = Exception.class)
    public void editaFuncionario (final Long id, final FuncionarioDTO funcionarioDTO){

        final FuncionarioEntity funcionario1 = this.funcionarioRepository.findById(id).orElse(null);

        if (funcionario1 == null || !funcionario1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel identificar o registro informado.");
        }

        BeanUtils.copyProperties(funcionarioDTO, funcionario1);

        this.funcionarioRepository.save(funcionario1);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deletarFuncionario (final Long id){

        final FuncionarioEntity funcionario1 = this.funcionarioRepository.findById(id).orElse(null);

        if (funcionario1 == null || !funcionario1.getId().equals(id)){
            throw new RegistroNaoEncontradoException ("Não foi possivel encontrar o funcionário.");
        }

        this.funcionarioRepository.delete(funcionario1);
    }

    public static class RegistroNaoEncontradoException extends RuntimeException {
        public RegistroNaoEncontradoException(String message) {
            super(message);
        }
    }
}
