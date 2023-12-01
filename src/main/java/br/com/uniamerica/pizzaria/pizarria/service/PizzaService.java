package br.com.uniamerica.pizzaria.pizarria.service;

import br.com.uniamerica.pizzaria.pizarria.dto.PizzaDTO;
import br.com.uniamerica.pizzaria.pizarria.entity.PizzaEntity;
import br.com.uniamerica.pizzaria.pizarria.entity.Tamanho;
import br.com.uniamerica.pizzaria.pizarria.repository.PizzaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@Service
public class PizzaService {
    @Autowired
    private PizzaRepository pizzaRepository;

    @Transactional(rollbackFor = Exception.class)
    public PizzaDTO validaPizza (final PizzaDTO pizzaDTO){
        var pizza = new PizzaEntity();
        BeanUtils.copyProperties(pizzaDTO,pizza);

        if(pizza.getTamanho() == Tamanho.P){
            Assert.isTrue(pizza.getSabores().size() == 1, "Pizzas do tamanho P não podem conter mais de um sabor");
            pizza.setPrecoPizza(15);
        }else if (pizza.getTamanho() == Tamanho.M) {
            Assert.isTrue(pizza.getSabores().size() >= 1 && pizza.getSabores().size() <=2, "Pizzas do tamanho M não podem conter mais de 02 sabores");
            pizza.setPrecoPizza(25);
        }else if (pizza.getTamanho() == Tamanho.G)
        {
            Assert.isTrue(pizza.getSabores().size() >= 1 && pizza.getSabores().size() <=3, "Pizzas do tamanho G não podem conter mais de 03 sabores");
            pizza.setPrecoPizza(30);
        }else {
            Assert.isTrue(pizza.getSabores().size() >= 1 && pizza.getSabores().size() <=4, "Pizzas do tamanho GG não podem conter mais de 04 sabores");
            pizza.setPrecoPizza(45);
        }

        Assert.isTrue(pizza.getQuantPizza() != 0, "Quantidade não pode ser nula");

        float total;

        total = pizza.getPrecoPizza() * pizza.getQuantPizza();
        pizza.setPrecoPizza(total);

        PizzaEntity pizzaSalva = this.pizzaRepository.save(pizza);
        PizzaDTO pizzaDTO2 = new PizzaDTO();
        BeanUtils.copyProperties(pizzaSalva,pizzaDTO2);
        return pizzaDTO2;
    }


    @Transactional(rollbackFor = Exception.class)
    public void editaPizza (final Long id, PizzaDTO pizzaDTO) {

        final PizzaEntity pizza1 = this.pizzaRepository.findById(id).orElse(null);

        if (pizza1 == null || !pizza1.getId().equals(id)) {
            throw new RegistroNaoEncontradoException("Nao foi possivel indentificar o registro informado");
        }

        BeanUtils.copyProperties(pizzaDTO, pizza1);

        if(pizzaDTO.getTamanho() == Tamanho.P){
            Assert.isTrue(pizzaDTO.getSabores().size() == 1, "Pizzas do tamanho P não podem conter mais de um sabor");
            pizzaDTO.setPrecoPizza(15);
        }else if (pizzaDTO.getTamanho() == Tamanho.M) {
            Assert.isTrue(pizzaDTO.getSabores().size() >= 1 && pizzaDTO.getSabores().size() <=2, "Pizzas do tamanho M não podem conter mais de 02 sabores");
            pizzaDTO.setPrecoPizza(25);
        }else if (pizzaDTO.getTamanho() == Tamanho.G)
        {
            Assert.isTrue(pizzaDTO.getSabores().size() >= 1 && pizzaDTO.getSabores().size() <=3, "Pizzas do tamanho G não podem conter mais de 03 sabores");
            pizzaDTO.setPrecoPizza(30);
        }else {
            Assert.isTrue(pizzaDTO.getSabores().size() >= 1 && pizzaDTO.getSabores().size() <=4, "Pizzas do tamanho GG não podem conter mais de 04 sabores");
            pizzaDTO.setPrecoPizza(45);
        }

        Assert.isTrue(pizzaDTO.getQuantPizza() != 0, "Quantidade não pode ser nula");

        float total;

        total = pizzaDTO.getPrecoPizza() * pizzaDTO.getQuantPizza();
        pizzaDTO.setPrecoPizza(total);

        this.pizzaRepository.save(pizza1);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deletaPizza (final Long id){

        final PizzaEntity pizza1 = this.pizzaRepository.findById(id).orElse(null);

        if (pizza1 == null || !pizza1.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possivel encontrar a pizza.");
        }
        this.pizzaRepository.delete(pizza1);
    }

    public static class RegistroNaoEncontradoException extends RuntimeException {
        public RegistroNaoEncontradoException(String message) {
            super(message);
        }
    }
}
