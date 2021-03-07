package com.hysk.home.dto;

import java.util.List;

import com.hysk.home.model.Status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
