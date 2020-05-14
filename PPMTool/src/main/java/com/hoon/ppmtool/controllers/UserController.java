package com.hoon.ppmtool.controllers;

import com.hoon.ppmtool.domain.User;
import com.hoon.ppmtool.services.MapValidationErrorService;
import com.hoon.ppmtool.services.UserService;
import com.hoon.ppmtool.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.validateResult(result);
        if (errorMap != null) return errorMap;

        User newUser =userService.saveUser(user);
        newUser.setConfirmpassword("");

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
}