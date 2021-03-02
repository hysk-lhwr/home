package com.hysk.home.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class User {
    @Id
    String userId;
    String password;
    String screenName;
    String email;
    String role;
    String status;
    Date activatedAt;
    Date createdAt;
    Date endDate;
}
