package com.hysk.home.dto;

import java.util.List;

import com.hysk.home.model.Status;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateArticleRequestDto {
    String articleId;
    String udpatedBy;
    String title;
    List<String> keywords;
    List<String> categories;
    String preview;
    String contentRaw;
    String contentHtml;
    String contentMarkdown;
    Status status;
}
