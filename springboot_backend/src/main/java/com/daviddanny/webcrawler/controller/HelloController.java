package com.daviddanny.webcrawler.controller;

import com.daviddanny.webcrawler.service.WebCrawlerFetch;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class HelloController {

    private final WebCrawlerFetch crawlerService;

    public HelloController(WebCrawlerFetch crawlerService) {
        this.crawlerService = crawlerService;
    }

    @PostMapping("/crawl")
    public ResponseEntity<?> crawl(@RequestBody Map<String, String> payload) {
        String url = payload.get("url");

        try {
            Set<String> links = crawlerService.crawlLinks(url);
            return ResponseEntity.ok(links);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to fetch: " + e.getMessage());
        }
    }

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
