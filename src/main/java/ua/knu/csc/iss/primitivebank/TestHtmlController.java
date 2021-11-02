package ua.knu.csc.iss.primitivebank;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class TestHtmlController {
    @GetMapping("/test-html/{message}")
    public String mainWithParam(Model model, @PathVariable String message) {
        model.addAttribute("message", message);
        return "login";
    }
}
