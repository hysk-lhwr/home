package com.hysk.home.dto;

import java.util.List;

import com.hysk.home.model.Status;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShortenedArticle {
    String articleId;
    String articleTitle;
    String preview;
    List<String> keywords;
    List<String> categories;
    Status status;
}