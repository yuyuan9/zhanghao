package com.zhanghao.config;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

/**
 * 自定义错误控制器
 * 处理HTTP错误（如404、500等）并重定向到统一的错误页面
 */
@Controller
public class CustomErrorController implements ErrorController {

    /**
     * 处理所有错误请求
     * @param request HTTP请求
     * @param model 模型
     * @return 错误页面
     */
    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        // 获取错误状态码
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        String errorMessage = "服务器发生错误，请稍后再试或联系客服";
        
        if (status != null) {
            int statusCode = Integer.parseInt(status.toString());
            
            // 根据不同的状态码设置不同的错误信息
            if (statusCode == HttpStatus.NOT_FOUND.value()) {
                errorMessage = "页面不存在，请检查URL是否正确";
            } else if (statusCode == HttpStatus.FORBIDDEN.value()) {
                errorMessage = "您没有权限访问此页面";
            } else if (statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                errorMessage = "服务器内部错误，请稍后再试或联系客服";
            }
        }
        
        // 设置错误信息到模型中
        model.addAttribute("message", errorMessage);
        
        // 返回错误页面
        return "pages/error";
    }
}