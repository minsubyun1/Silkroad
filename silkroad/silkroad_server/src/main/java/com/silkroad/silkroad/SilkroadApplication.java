package com.silkroad.silkroad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SilkroadApplication {

	public static void main(String[] args) {
		SpringApplication.run(SilkroadApplication.class, args);
	}

}
