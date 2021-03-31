package com.hysk.home.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BinaryFeedbackRequestDto {
    String username; 
    String ip;
    Integer score;
}
