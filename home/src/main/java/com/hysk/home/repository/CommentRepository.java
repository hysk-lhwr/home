package com.hysk.home.repository;

import com.hysk.home.model.Comment;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {}
