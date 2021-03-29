package com.hysk.home.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Document
@Data
@Builder
public class Comment {
    @Id
    String commentId;

    String targetId;

    @TextIndexed
    String content;

    String commentedBy;
    
    String ipAddress;

    Date timeEdited;

    Date timeDeleted;

    List<Comment> replies;
}
