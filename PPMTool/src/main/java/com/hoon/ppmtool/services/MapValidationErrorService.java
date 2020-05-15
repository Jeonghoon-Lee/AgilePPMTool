package com.hoon.ppmtool.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Service
public class MapValidationErrorService {

    private ResponseEntity<?> createValidationErrorResult(BindingResult result) {
        Map<String, String> errorMap = new HashMap<>();

        for (FieldError error : result.getFieldErrors()) {
            errorMap.put(error.getField(), error.getDefaultMessage());
        }
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> validateResult(BindingResult result) {
        if (result.hasErrors()) {
            return createValidationErrorResult(result);
        }
        return null;
    }

    public ResponseEntity<?> mapValidationErrorResult(BindingResult result) {
        return createValidationErrorResult(result);
    }
}
