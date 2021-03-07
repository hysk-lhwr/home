package com.hysk.home.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetArticleResponseDto {
    String title;
    Date createdDate;
    Date editedDate;
    String contentRaw;
    String contentMarkdown;
    String contentHtml;
    Integer views;
    Integer likes;
}