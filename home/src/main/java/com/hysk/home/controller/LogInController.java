package com.hysk.home.controller;

import com.hysk.home.dto.LogInRequestDto;
import com.hysk.home.dto.LogInResponseDto;
import com.hysk.home.service.LogInService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/")
public class LogInController {

    final LogInService logInService;

    LogInController(final LogInService logInService) {
        this.logInService = logInService;
    }

    @GetMapping(value = "login")
    public ResponseEntity<LogInResponseDto> getAllArticles(@RequestBody LogInRequestDto request) {
        var response = this.logInService.validateUser(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    
}
