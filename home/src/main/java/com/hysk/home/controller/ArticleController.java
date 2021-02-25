package com.hysk.home.controller;

import com.hysk.home.dto.GetAllArticlesResponseDto;
import com.hysk.home.service.ArticleService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(final ArticleService articleService) {
        this.articleService =articleService;
    }

    @GetMapping(value = "articles")
    
    public ResponseEntity<GetAllArticlesResponseDto> getAllArticles() {
        var response = this.articleService.getAllArticles();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}