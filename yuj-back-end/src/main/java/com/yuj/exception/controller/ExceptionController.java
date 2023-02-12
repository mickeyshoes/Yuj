package com.yuj.exception.controller;

import com.yuj.exception.CAuthenticationEntryPointException;
import com.yuj.response.CommonResult;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
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
        log.info("AccessDeniedException!!!!!!!!!");
        throw new AccessDeniedException("");
    }
}