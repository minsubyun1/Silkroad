package com.silkroad.silkroad;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SilkroadApplication {

	public static void main(String[] args) {
		// .env 파일 로드
		Dotenv dotenv = Dotenv.load();
		
		// 환경 변수 설정
		System.setProperty("DATABASE_URL", dotenv.get("DATABASE_URL"));
		System.setProperty("DATABASE_USERNAME", dotenv.get("DATABASE_USERNAME"));
		System.setProperty("DATABASE_PASSWORD", dotenv.get("DATABASE_PASSWORD"));
		
		SpringApplication.run(SilkroadApplication.class, args);
	}

}
