package com.hysk.home.model;

import java.util.Date;
import java.util.List;
import java.util.Collections;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document
public class Article {
    @Id
    public String articleId;

    public String createdBy;

    @Builder.Default
    public Date createdDate = null;

    @Builder.Default
    public Date editedDate = null;

    @Builder.Default
    public Date deletedDate = null;

    @Builder.Default
    public String title = "new article";
    
    @Builder.Default
    public List<String> keywords = Collections.emptyList();
    
    @Builder.Default
    public List<String> categories = Collections.emptyList();

    @Builder.Default
    public String preview = "no preview";

    @Builder.Default
    public String contentRaw = "";

    @Builder.Default
    public String contentHtml = "";

    @Builder.Default
    public String contentMarkdown = "Start writing!";

    @Builder.Default
    public Integer views = 0;

    @Builder.Default
    public Status status = Status.DRAFT;

    @Builder.Default
    public List<Feedback> feedbacks = Collections.emptyList();
  }