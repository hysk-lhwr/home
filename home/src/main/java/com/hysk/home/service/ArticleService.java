package com.hysk.home.service;

import java.util.stream.Collectors;

import com.hysk.home.dto.GetAllArticlesResponseDto;
import com.hysk.home.dto.ShortenedArticle;
import com.hysk.home.repository.ArticleRepository;

import org.springframework.stereotype.Service;

@Service
public class ArticleService {
    public final ArticleRepository articleRepository;

    public ArticleService(final ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public GetAllArticlesResponseDto getAllArticles() {
        var articles = this.articleRepository.findAll();
        var shortenedArticles = articles.stream().map(
                entity -> ShortenedArticle.builder()
                    .articleId(entity.articleId)
                    .articleTitle(entity.title)
                    .preview(entity.preview)
                    .keywords(entity.keywords)
                    .categories(entity.categories).build()
            ).collect(Collectors.toList());

        return GetAllArticlesResponseDto.builder().articles(shortenedArticles).build();
    }
    
}
