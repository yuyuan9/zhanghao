package com.zhanghao.controller;

import com.zhanghao.entity.Account;
import com.zhanghao.entity.Article;
import com.zhanghao.service.AccountService;
import com.zhanghao.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * 文章控制器
 * 处理文章列表和详情页面的请求
 */
@Controller
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    
    @Autowired
    private AccountService accountService;

    /**
     * 文章列表页面
     */
    @GetMapping
    public String articleList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword,
            Model model) {
        
        Page<Article> articles;
        
        if (keyword != null && !keyword.trim().isEmpty()) {
            // 搜索文章
            articles = articleService.searchArticles(keyword, page, size);
            model.addAttribute("searchKeyword", keyword);
        } else if (category != null && !category.trim().isEmpty()) {
            // 按分类查询
            articles = articleService.getArticlesByCategory(category, page, size);
            model.addAttribute("currentCategory", category);
        } else {
            // 获取所有文章
            articles = articleService.getAllPublishedArticles(page, size);
        }
        
        // 获取热门文章
        List<Article> hotArticles = articleService.getHotArticles();
        
        model.addAttribute("articles", articles);
        model.addAttribute("hotArticles", hotArticles);
        model.addAttribute("title", "Google账号使用教程 - 账号易购");
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", articles.getTotalPages());
        
        return "pages/article-list";
    }

    /**
     * 文章详情页面
     */
    @GetMapping("/{slug}")
    public String articleDetail(@PathVariable String slug, Model model) {
        Article article = articleService.getArticleBySlug(slug);
        
        // 增加浏览量
        articleService.incrementViewCount(article.getId());
        
        // 获取推荐账号
        List<Account> recommendedAccounts = accountService.findHotAccountsByCategory("social", 3);
        
        model.addAttribute("article", article);
        model.addAttribute("recommendedAccounts", recommendedAccounts);
        
        // 设置SEO信息
        if (article.getSeoTitle() != null && !article.getSeoTitle().isEmpty()) {
            model.addAttribute("title", article.getSeoTitle());
        } else {
            model.addAttribute("title", article.getTitle() + " - 账号易购");
        }
        
        if (article.getSeoDescription() != null && !article.getSeoDescription().isEmpty()) {
            model.addAttribute("metaDescription", article.getSeoDescription());
        } else {
            model.addAttribute("metaDescription", article.getSummary());
        }
        
        if (article.getSeoKeywords() != null && !article.getSeoKeywords().isEmpty()) {
            model.addAttribute("metaKeywords", article.getSeoKeywords());
        }
        
        return "pages/article-detail";
    }
}