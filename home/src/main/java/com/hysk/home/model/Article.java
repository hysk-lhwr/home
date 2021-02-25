package com.hysk.home.model;

import java.sql.Date;
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
    public String status;
    public List<FeedBack> feedbacks;

    public class FeedBack {
        String ip;
        String id;
        Integer score;
    }
  }