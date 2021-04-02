package com.hysk.home;

import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class HomeApplication {

	@Value("${app.security.cors.allowedOrigins}")
	private String[] allowedOrigins;

	@Value("${app.security.cors.allowedMethods}")
	private String[] allowedMethods;

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer(){
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
				.addMapping("/api/v1/**")
				.allowedOrigins(allowedOrigins)
				.allowedMethods(allowedMethods);
			}
		};
	}

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(HomeApplication.class, args);
	}

}
