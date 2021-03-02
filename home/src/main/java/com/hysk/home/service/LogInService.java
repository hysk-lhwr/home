package com.hysk.home.service;

import java.util.List;
import java.util.stream.Collectors;

import com.hysk.home.dto.LogInRequestDto;
import com.hysk.home.dto.LogInResponseDto;
import com.hysk.home.model.User;
import com.hysk.home.repository.UserRepository;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class LogInService {

    final UserRepository userRepository;
    final MongoTemplate mongoTemplate;

    LogInService(final UserRepository userRepository, final MongoTemplate mongoTemplate) {
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public LogInResponseDto validateUser(LogInRequestDto requestDto) {
        var users = this.findUserByName("screenName", requestDto.getUsername());
        var validUsers = users.stream().filter(user -> user.getPassword().equals(requestDto.getPassword()) && user.getEndDate() == null).collect(Collectors.toList());

        if(validUsers.isEmpty()) {
            return LogInResponseDto.builder().email(null).username(null).role(null).valid(false).build();
        } else {
            var user = validUsers.get(0);
            return LogInResponseDto.builder().email(user.getEmail()).username(user.getScreenName()).role(user.getRole()).valid(true).build();
        }
    }

    public List<User> findUserByName(String key, String value) {
        Document document = new Document(key, value);
        Query query = new BasicQuery(document.toJson());
        return this.mongoTemplate.find(query, User.class);
    }
}
