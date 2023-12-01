package br.com.uniamerica.pizzaria.pizarria.service;

import br.com.uniamerica.pizzaria.pizarria.dto.ProdutosDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.ProdutosEntity;
import br.com.uniamerica.pizzaria.pizarria.repository.EstoqueProdutoRepository;
import br.com.uniamerica.pizzaria.pizarria.repository.ProdutosRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ProdutosService {
    @Autowired
    ProdutosRepository produtosRepository;

    @Autowired
    EstoqueProdutoRepository estoqueProdutoRepository;

    @Transactional(rollbackFor = Exception.class)
    public void validarProduto (final ProdutosDTO produtosDTO){

        var produtos = new ProdutosEntity();
        BeanUtils.copyProperties(produtosDTO,produtos);


//        EstoqueProdutos estoque = produtos.getEstoque();
//        float total = 0;mas
//
//        Optional <EstoqueProdutos> estoqueTemp = estoqueProdutoRepository.findById(estoque.getId());
//        total += estoqueTemp.get().getPrecoProd() * produtos.getQuantidade();
//
//        produtos.setTotalProduto(total);


        // float total;
        produtos.setQuantidade(1);


        produtos.setTotalProduto(produtos.getQuantidade() * produtos.getValor());


        this.produtosRepository.save(produtos);
    }

    @Transactional(rollbackFor = Exception.class)
    public void editarProduto(final Long id, ProdutosDTO produtosDTO) {

        final ProdutosEntity produtosBanco = this.produtosRepository.findById(id).orElse(null);

        if (produtosBanco == null || !produtosBanco.getId().equals(id)) {
            throw new RegistroNaoEncontradoException("Não foi possível identificar o registro informado");
        }

        BeanUtils.copyProperties(produtosDTO, produtosBanco);

        this.produtosRepository.save(produtosBanco);
    }
    @Transactional(rollbackFor = Exception.class)
    public void deletarProduto(final Long id){

        final ProdutosEntity produto1 = this.produtosRepository.findById(id).orElse(null);

        if (produto1 == null || !produto1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel identificar o produto informado.");
        }
        this.produtosRepository.delete(produto1);
    }

    public static class RegistroNaoEncontradoException extends RuntimeException {
        public RegistroNaoEncontradoException(String message) {
            super(message);
        }
    }
}
