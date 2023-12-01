package br.com.uniamerica.pizzaria.pizarria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "br.com.uniamerica.pizzaria.pizarria.entity")
public class PizarriaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PizarriaApplication.class, args);
	}

}
