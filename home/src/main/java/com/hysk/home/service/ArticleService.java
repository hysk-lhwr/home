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
import com.hysk.home.model.Category;
import com.hysk.home.model.Status;
import com.hysk.home.repository.ArticleRepository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {
    public final ArticleRepository articleRepository;
    private final MongoTemplate template;

    public ArticleService(final ArticleRepository articleRepository, final MongoTemplate template) {
        this.articleRepository = articleRepository;
        this.template = template;
    }

    public GetAllArticlesResponseDto getAllArticles(String category, String keyword) {
        Query query = new Query();
        if (!category.isBlank()) {
            query.addCriteria(Criteria.where("categories").in(category));
        }
        if (!keyword.isBlank()) {
            query.addCriteria(Criteria.where("keywords").in(keyword));
        }
        var articles = this.template.find(query, Article.class);
        var shortenedArticles = articles.stream().map(
                entity -> ShortenedArticle.builder()
                    .articleId(entity.articleId)
                    .articleTitle(entity.title)
                    .preview(entity.preview)
                    .keywords(entity.keywords)
                    .status(entity.status)
                    .categories(entity.categories).build()
            ).collect(Collectors.toList());

        return GetAllArticlesResponseDto.builder().articles(shortenedArticles).build();
    }

    public GetAllArticlesResponseDto searchText(String searchText) {
        return null;
    }

    public GetArticleResponseDto getArticleById(String articleId) throws Exception {
        Article article = this.articleRepository.findById(articleId).orElseThrow(() -> new Exception());
        var positiveFeedbacks = article.feedbacks.stream().filter(item -> item.score == 1).collect(Collectors.toList());
        return GetArticleResponseDto.builder()
            .createdDate(article.createdDate)
            .editedDate(article.editedDate)
            .title(article.title)
            .contentRaw(article.contentRaw)
            .contentMarkdown(article.contentMarkdown)
            .contentHtml(article.contentHtml)
            .views(article.views)
            .likes(positiveFeedbacks.size())
            .categories(article.categories)
            .keywords(article.keywords)
            .preview(article.preview)
            .status(article.status)
            .build();
    }

    public NewArticleResponseDto newArticle(NewArticleRequestDto requestDto) {
        var article = Article.builder()
            .createdBy(requestDto.getCreatedBy())
            .createdDate(new Date())
            .build();
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
