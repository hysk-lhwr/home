package com.hysk.home.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Feedback {
    String ip;
    String id;
    Integer score;
}
