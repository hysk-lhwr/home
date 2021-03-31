package com.hysk.home.service;

import java.util.Date;
import java.util.List;

import com.hysk.home.dto.CommentDto;
import com.hysk.home.model.Comment;
import com.hysk.home.repository.CommentRepository;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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

    public List<Comment> getCommentsForId(String targetId) {
        Query query = new Query();
        Sort sort = Sort.by(Sort.Direction.DESC, "timeEdited");
        query.addCriteria(Criteria.where("targetId").is(targetId));
        query.addCriteria(Criteria.where("timeDeleted").exists(false));
        query.with(sort);
        return this.mongoTemplate.find(query, Comment.class);
    }
}
