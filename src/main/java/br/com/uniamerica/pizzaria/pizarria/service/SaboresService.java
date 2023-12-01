package br.com.uniamerica.pizzaria.pizarria.service;

import br.com.uniamerica.pizzaria.pizarria.dto.SaboresDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.SaboresEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.SaboresRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@Service
public class SaboresService {

    @Autowired
    private SaboresRepository saboresRepository;

    @Transactional(rollbackFor = Exception.class)
    public void validaSabor (final SaboresDTO saboresDTO){
        var sabores = new SaboresEntity();
        BeanUtils.copyProperties(saboresDTO,sabores);

        SaboresEntity sabores1 = saboresRepository.findByNomeSabor(sabores.getNomeSabor());

        // Assert.isTrue(sabores1 == null || sabores1.equals(sabores.getNomeSabor()), "Sabor já existente");

        Assert.isTrue(sabores1 == null || sabores1.getNomeSabor().equals(sabores.getNomeSabor()), "Sabor já existente");

        this.saboresRepository.save(sabores);
    }

    @Transactional(rollbackFor = Exception.class)
    public void editaSabor (final Long id, final SaboresDTO saboresDTO){

        final SaboresEntity sabores1 = this.saboresRepository.findById(id).orElse(null);

        if (sabores1 == null || !sabores1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel identificar o registro informado.");
        }

        BeanUtils.copyProperties(saboresDTO, sabores1);

        this.saboresRepository.save(sabores1);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deletaSabor (final Long id){
        final SaboresEntity sabores1 = this.saboresRepository.findById(id).orElse(null);

        if (sabores1 == null || !sabores1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel encontrar o sabor selecionado.");
        }

        this.saboresRepository.delete(sabores1);
    }

    public static class RegistroNaoEncontradoException extends RuntimeException {
        public RegistroNaoEncontradoException(String message) {
            super(message);
        }
    }
}
