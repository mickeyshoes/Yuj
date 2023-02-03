package com.yuj.exception.controller;

import com.yuj.exception.CAuthenticationEntryPointException;
import com.yuj.response.CommonResult;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"3. Exception"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/exception")
public class ExceptionController {
    @GetMapping("/entryPoint")
    public CommonResult entryPointException() {
        throw new CAuthenticationEntryPointException();
    }

    @GetMapping("/accessDenied")
    public CommonResult accessDeniedException() {
        System.out.println("AccessDeniedException!!!!!!!!!");
        throw new AccessDeniedException("");
    }
}