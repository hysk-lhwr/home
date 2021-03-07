package com.hysk.home.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LogInResponseDto {
    Boolean valid;
    String username;
    String email;
    String role;
}
