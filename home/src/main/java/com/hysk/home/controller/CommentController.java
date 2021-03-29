package com.hysk.home.controller;

import com.hysk.home.dto.CommentDto;
import com.hysk.home.dto.NewCommentResponseDto;
import com.hysk.home.service.CommentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/")
public class CommentController {
    public final CommentService service;

    CommentController(final CommentService service) {
        this.service = service;
    }

    @PostMapping(value = "comments/new")
    public ResponseEntity<NewCommentResponseDto> newComment(@RequestBody CommentDto request) {
        var commentId = this.service.newComment(request);
        var resp = NewCommentResponseDto.builder().commentId(commentId).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }
    
}
