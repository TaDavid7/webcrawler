package com.daviddanny.webcrawler.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "hello";
    }

    @PostMapping("/echo")
    public String echo(@RequestBody String input){
        System.out.println("POST /echo hit");  // Confirm method is invoked
        System.out.println("Received input: " + input);  // Log input value
        return "You said: " + input;
    }
}
