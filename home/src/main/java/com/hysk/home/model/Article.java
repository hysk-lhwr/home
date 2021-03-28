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
    public Date expirationDate = null;

    @Builder.Default
    public String title = "new article";
    
    @Builder.Default
    public List<String> keywords = Collections.emptyList();
    
    @Builder.Default
    public List<String> categories = Collections.emptyList();

    @Builder.Default
    public String preview = "tbd";

    @Builder.Default
    public String contentRaw = "";

    @Builder.Default
    public String contentHtml = "";

    @Builder.Default
    public String contentMarkdown = "Start here!";

    @Builder.Default
    public Integer views = 0;

    @Builder.Default
    public Status status = Status.DRAFT;

    @Builder.Default
    public List<FeedBack> feedbacks = Collections.emptyList();

    @Data
    public class FeedBack {
        String ip;
        String id;
        public Integer score;
    }
  }