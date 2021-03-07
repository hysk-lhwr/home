package com.hysk.home.service;

import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;

import com.hysk.home.dto.GetAllArticlesResponseDto;
import com.hysk.home.dto.GetArticleResponseDto;
import com.hysk.home.dto.NewArticleRequestDto;
import com.hysk.home.dto.NewArticleResponseDto;
import com.hysk.home.dto.ShortenedArticle;
import com.hysk.home.dto.UpdateArticleRequestDto;
import com.hysk.home.model.Article;
import com.hysk.home.model.Status;
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

    public GetArticleResponseDto getArticleById(String articleId) throws Exception {
        Article article = this.articleRepository.findById(articleId).orElseThrow(() -> new Exception());
        var positiveFeedbacks = article.feedbacks.stream().filter(item -> item.score == 1).collect(Collectors.toList());
        return GetArticleResponseDto.builder()
            .createdDate(article.createdDate)
            .editedDate(article.editedDate)
            .contentRaw(article.contentRaw)
            .contentMarkdown(article.contentMarkdown)
            .contentHtml(article.contentHtml)
            .views(article.views)
            .likes(positiveFeedbacks.size())
            .build();
    }

    public NewArticleResponseDto newArticle(NewArticleRequestDto requestDto) {
        var article = new Article();
        article.setCreatedDate(new Date());
        article.setStatus(Status.DRAFT);
        article.setCreatedBy(requestDto.getCreatedBy());

        article = this.articleRepository.save(article);
        return NewArticleResponseDto.builder().articleId(article.articleId).build();
    }
    
    public void editArticle(UpdateArticleRequestDto requestDto) throws Exception{
        Article articleToUpdate = this.articleRepository.findById(requestDto.getArticleId()).orElseThrow(() -> new Exception());
        if (requestDto.getUdpatedBy().equals(articleToUpdate.createdBy)) {
            articleToUpdate.setEditedDate(new Date());
            articleToUpdate.setTitle(requestDto.getTitle());
            articleToUpdate.setKeywords(requestDto.getKeywords());
            articleToUpdate.setCategories(requestDto.getCategories());
            articleToUpdate.setContentMarkdown(requestDto.getContentMarkdown());
            articleToUpdate.setContentRaw(requestDto.getContentRaw());
            articleToUpdate.setContentHtml(requestDto.getContentHtml());
            articleToUpdate.setPreview(requestDto.getPreview());
            articleToUpdate.setStatus(requestDto.getStatus());
            this.articleRepository.save(articleToUpdate);
        } else {
            throw new Exception("Unable to udpate article");
        }
    }

    public void deleteArticle(String articleId) throws Exception {
        Article articleToDelete = this.articleRepository.findById(articleId).orElseThrow(() -> new Exception());
        var calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, 90);
        var futureDate = calendar.getTime();
        articleToDelete.setExpirationDate(futureDate);
        articleToDelete.setStatus(Status.DELETED);
        this.articleRepository.save(articleToDelete);
    }

    public void recoverArticle(String articleId) throws Exception {
        Article articleToRecover = this.articleRepository.findById(articleId).orElseThrow(() -> new Exception());
        articleToRecover.setExpirationDate(null);
        articleToRecover.setStatus(Status.DRAFT);
        this.articleRepository.save(articleToRecover);
    }
}
