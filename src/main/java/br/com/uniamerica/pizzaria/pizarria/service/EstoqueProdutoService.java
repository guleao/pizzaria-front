package br.com.uniamerica.pizzaria.pizarria.service;

import br.com.uniamerica.pizzaria.pizarria.dto.EstoqueProdutoDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.EstoqueProdutos;
import br.com.uniamerica.pizzaria.pizarria.repository.EstoqueProdutoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class EstoqueProdutoService {
    @Autowired
    private EstoqueProdutoRepository estoqueProdutoRepository;


    @Transactional(rollbackFor = Exception.class)
    public void validaEstoque (final EstoqueProdutoDTO estoqueProdutoDTO){

        var estoqueProduto = new EstoqueProdutos();
        BeanUtils.copyProperties(estoqueProdutoDTO,estoqueProduto);

        this.estoqueProdutoRepository.save(estoqueProduto);

    }

    public void editaEstoque (final Long id, EstoqueProdutoDTO estoqueProdutoDTO){

        final EstoqueProdutos estoque1 = this.estoqueProdutoRepository.findById(id).orElse(null);

        if (estoque1 == null || !estoque1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel encontrar o ID do estoque informado");
        }


        BeanUtils.copyProperties(estoqueProdutoDTO, estoque1);

        this.estoqueProdutoRepository.save(estoque1);

    }

    @Transactional(rollbackFor = Exception.class)
    public void deletarProduto (final Long id){

        final EstoqueProdutos estoque1 = this.estoqueProdutoRepository.findById(id).orElse(null);

        if (estoque1 == null || !estoque1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel encontrar o ID do estoque informado");
        }
        this.estoqueProdutoRepository.delete(estoque1);

    }

    public static class RegistroNaoEncontradoException extends RuntimeException {
        public RegistroNaoEncontradoException(String message) {
            super(message);
        }
    }
}
