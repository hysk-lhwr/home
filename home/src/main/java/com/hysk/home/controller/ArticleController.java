package com.hysk.home.controller;

import com.hysk.home.dto.BinaryFeedbackRequestDto;
import com.hysk.home.dto.BinaryResponseDto;
import com.hysk.home.dto.GetAllArticlesResponseDto;
import com.hysk.home.dto.GetArticleResponseDto;
import com.hysk.home.dto.NewArticleRequestDto;
import com.hysk.home.dto.NewArticleResponseDto;
import com.hysk.home.dto.UpdateArticleRequestDto;
import com.hysk.home.service.ArticleService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(final ArticleService articleService) {
        this.articleService =articleService;
    }

    @GetMapping(value = "articles")
    public ResponseEntity<GetAllArticlesResponseDto> getAllArticles(
        @RequestParam(value = "category", required = false, defaultValue = "") String category, 
        @RequestParam(value = "username", required = false, defaultValue = "") String username, 
        @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        var response = this.articleService.getAllArticles(category, username, keyword);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "searchArticles")
    public ResponseEntity<GetAllArticlesResponseDto> searchArticles(
        @RequestParam(value = "searchText", required = false, defaultValue = "") String searchText,
        @RequestParam(value = "username", required = false, defaultValue = "") String username) {
        var response = this.articleService.searchText(searchText, username);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "articles/{articleId}")
    public ResponseEntity<GetArticleResponseDto> getArticleById(@PathVariable("articleId") String articleId) {
        try {
            var response = this.articleService.getArticleById(articleId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping(value = "articles/{articleId}")
    public ResponseEntity<BinaryResponseDto> feedbackForArticleWithId(
        @PathVariable("articleId") String articleId, @RequestBody BinaryFeedbackRequestDto request) {
        try {
            this.articleService.addNewFeedback(articleId, request);
            return ResponseEntity.status(HttpStatus.OK).body(
                BinaryResponseDto.builder().success(true).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                BinaryResponseDto.builder().success(false).build());
        }
    }

    @DeleteMapping(value = "articles/{articleId}")
    public ResponseEntity<BinaryResponseDto> deleteArticleById(@PathVariable("articleId") String articleId) {
        try {
            this.articleService.deleteArticle(articleId);
            return ResponseEntity.status(HttpStatus.OK).body(BinaryResponseDto.builder().success(true).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BinaryResponseDto.builder().success(false).build());
        }
    }

    @PostMapping(value = "articles/new")
    public ResponseEntity<NewArticleResponseDto> newArticle(@RequestBody NewArticleRequestDto newArticleDto) {
        try {
            var response = this.articleService.newArticle(newArticleDto);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping(value = "articles/edit")
    public ResponseEntity<BinaryResponseDto> editArticle(@RequestBody UpdateArticleRequestDto requestDto) {
        try {
            this.articleService.editArticle(requestDto);
            return ResponseEntity.status(HttpStatus.OK).body(BinaryResponseDto.builder().success(true).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BinaryResponseDto.builder().success(false).build());
        }
    }
}