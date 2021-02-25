import com.hysk.home.service.ArticleService;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Validated
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(final ArticleService articleService) {
        this.articleService =articleService;
    }

    @RequestMapping(value = "article", method = RequestMethod.GET)
    public void getAllArticles() {
        // placeholder

        var articles = this.articleService.getAllArticles();
    }
}