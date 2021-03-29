package com.hysk.home.dto;

import java.util.List;

import com.hysk.home.model.Comment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetCommentsResponse {
    List<Comment> comments;
}
