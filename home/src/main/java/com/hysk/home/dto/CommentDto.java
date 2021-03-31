package com.hysk.home.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    @NotBlank
    String targetId;
    @NotBlank
    String content;
    String commentedBy;
    String ipAddress;
}
