package com.zhanghao.config;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * 全局异常处理器
 * 捕获应用中的异常并重定向到统一的错误页面
 */
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * 处理所有未捕获的异常
     * @param ex 异常
     * @param model 模型
     * @return 错误页面
     */
    @ExceptionHandler(Exception.class)
    public String handleAllExceptions(Exception ex, Model model) {
        // 记录异常信息到日志
        logger.error("应用发生异常: ", ex);
        
        // 设置错误信息到模型中，用于在错误页面显示
        String errorMessage = ex.getMessage();
        if (errorMessage == null || errorMessage.isEmpty()) {
            errorMessage = "服务器发生未知错误，请稍后再试或联系客服";
        }
        model.addAttribute("message", errorMessage);
        
        // 返回错误页面
        return "pages/error";
    }
    
    /**
     * 处理运行时异常
     * @param ex 运行时异常
     * @param model 模型
     * @return 错误页面
     */
    @ExceptionHandler(RuntimeException.class)
    public String handleRuntimeException(RuntimeException ex, Model model) {
        // 记录运行时异常信息到日志
        logger.error("应用发生运行时异常: ", ex);
        
        // 设置错误信息到模型中
        String errorMessage = ex.getMessage();
        if (errorMessage == null || errorMessage.isEmpty()) {
            errorMessage = "操作失败，请稍后再试或联系客服";
        }
        model.addAttribute("message", errorMessage);
        
        // 返回错误页面
        return "pages/error";
    }
}