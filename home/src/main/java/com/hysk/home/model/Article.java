package com.hysk.home.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Article {
    @Id
    public String articleId;
    public String createdBy;
    public Date createdDate;
    public Date editedDate;
    public Date expirationDate;
    public String title;
    public List<String> keywords;
    public List<String> categories;
    public String preview;
    public String contentRaw;
    public String contentHtml;
    public String contentMarkdown;
    public Integer views;
    public Status status;
    public List<FeedBack> feedbacks;

    @Data
    public class FeedBack {
        String ip;
        String id;
        public Integer score;
    }
  }