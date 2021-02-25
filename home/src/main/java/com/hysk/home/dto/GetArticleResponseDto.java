package com.hysk.home.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetArticleResponseDto {
    Date createdDate;
    Date editedDate;
    String contentRaw;
    String contentMarkdown;
    String contentHtml;
    Integer views;
    Integer likes;
}