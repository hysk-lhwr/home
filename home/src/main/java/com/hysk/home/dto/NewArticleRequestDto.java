package com.hysk.home.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewArticleRequestDto {
    String createdBy;
}
