package com.hysk.home.repository;

import com.hysk.home.model.Article;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArticleRepository extends MongoRepository<Article, String>{}
