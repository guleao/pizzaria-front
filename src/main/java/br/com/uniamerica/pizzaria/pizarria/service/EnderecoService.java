package br.com.uniamerica.pizzaria.pizarria.service;

import br.com.uniamerica.pizzaria.pizarria.dto.EnderecoDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.Endereco;
import br.com.uniamerica.pizzaria.pizarria.repository.EnderecoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Transactional(rollbackFor = Exception.class)
    public void validaEndereco (EnderecoDTO enderecoDTO){

       var endereco = new Endereco();

        BeanUtils.copyProperties(enderecoDTO,endereco);

        this.enderecoRepository.save(endereco);
    }

    @Transactional(rollbackFor = Exception.class)

    public void editaEndereco (final Long id, final EnderecoDTO enderecoDTO){

        final Endereco endereco1 = this.enderecoRepository.findById(id).orElse(null);

        if (endereco1 == null || !endereco1.getId().equals(id)) {
            throw new RegistroNaoEncontradoException("Nao foi possivel indentificar o registro informado");
        }

        BeanUtils.copyProperties(enderecoDTO, endereco1);

        this.enderecoRepository.save(endereco1);
    }
    @Transactional(rollbackFor = Exception.class)

    public void deletaEndereco (final Long id){

        final Endereco endereco1 = this.enderecoRepository.findById(id).orElse(null);

        if (endereco1 == null || !endereco1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel encontrar o endereco informado.");
        }

        this.enderecoRepository.delete(endereco1);
    }

    public static class RegistroNaoEncontradoException extends RuntimeException {
        public RegistroNaoEncontradoException(String message) {
            super(message);
        }
    }
}
