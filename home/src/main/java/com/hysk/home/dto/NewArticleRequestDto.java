package com.hysk.home.dto;

import java.util.List;

import lombok.Data;

@Data
public class NewArticleRequestDto {
    String createdBy;
    String title;
    List<String> keywords;
    List<String> categories;
    String preview;
    String contentRaw;
    String contentHtml;
    String contentMarkdown;
    String status;
}
