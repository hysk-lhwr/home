package com.hysk.home.service;

import java.util.Date;

import com.hysk.home.dto.CommentDto;
import com.hysk.home.model.Comment;
import com.hysk.home.repository.CommentRepository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    public final MongoTemplate mongoTemplate;
    public final CommentRepository commentRepository;

    CommentService(final MongoTemplate template, final CommentRepository commentRepository) {
        this.mongoTemplate = template;
        this.commentRepository = commentRepository;
    }

    public String newComment(CommentDto request) {
        var currentDateTime = new Date();
        var comment = Comment.builder()
            .targetId(request.getTargetId())
            .content(request.getContent())
            .commentedBy(request.getCommentedBy())
            .timeEdited(currentDateTime)
            .ipAddress(request.getIpAddress())
            .build();
        comment = this.commentRepository.save(comment);
        return comment.getCommentId();
    }
}
