package com.carma.hanppopen.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index.html";
    }

    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String redirect() {
        // Z_K https://stackoverflow.com/questions/40075024/react-nested-route-fails-to-load-on-refresh
        // Guts https://stackoverflow.com/questions/59289799/frontend-vs-backend-endpoints-spring-boot-and-vuejs/59290035#59290035
        // Forward to home page so that route is preserved.
        return "forward:/";
    }
}