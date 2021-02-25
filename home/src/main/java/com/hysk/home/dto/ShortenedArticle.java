package com.hysk.home.dto;

import java.util.List;

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
}