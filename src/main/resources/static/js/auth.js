// 登录和注册页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化密码显示/隐藏功能
    initPasswordToggle();
    
    // 初始化表单验证
    initFormValidation();
    
    // 初始化验证码刷新
    initCaptchaRefresh();
});

// 初始化密码显示/隐藏功能
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取当前按钮所在的input-with-icon容器
            const container = this.parentElement;
            // 在容器中查找密码输入框
            const input = container.querySelector('input[type="password"], input[type="text"]');
            
            if (input) {
                // 切换密码显示/隐藏
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            }
        });
    });
}

// 初始化表单验证
function initFormValidation() {
    const authForm = document.querySelector('.auth-form');
    
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // 验证表单数据
            if (validateForm(formValues)) {
                // 模拟表单提交
                console.log('表单数据:', formValues);
                
                // 显示加载状态
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
                
                // 模拟API请求延迟
                setTimeout(() => {
                    // 根据页面类型执行不同的操作
                    if (window.location.pathname.includes('login')) {
                        // 登录成功后跳转到首页
                        window.location.href = 'index.html';
                    } else if (window.location.pathname.includes('register')) {
                        // 注册成功后跳转到登录页
                        window.location.href = 'login.html';
                    }
                }, 1500);
            }
        });
    }
}

// 表单验证
function validateForm(values) {
    let isValid = true;
    const errors = {};
    
    // 清除所有错误提示
    clearErrors();
    
    // 验证用户名
    if (values.username) {
        if (values.username.length < 3) {
            errors.username = '用户名长度不能少于3个字符';
            isValid = false;
        }
    } else {
        errors.username = '请输入用户名';
        isValid = false;
    }
    
    // 验证邮箱（如果存在）
    if (values.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email)) {
            errors.email = '请输入有效的电子邮箱地址';
            isValid = false;
        }
    }
    
    // 验证密码
    if (values.password) {
        if (values.password.length < 6) {
            errors.password = '密码长度不能少于6个字符';
            isValid = false;
        }
    } else {
        errors.password = '请输入密码';
        isValid = false;
    }
    
    // 如果是注册页面，验证确认密码
    if (values.confirmPassword !== undefined) {
        if (values.confirmPassword !== values.password) {
            errors.confirmPassword = '两次输入的密码不一致';
            isValid = false;
        }
    }
    
    // 如果是注册页面，验证是否同意条款
    if (values.agree !== undefined && !values.agree) {
        errors.agree = '请阅读并同意服务条款和隐私政策';
        isValid = false;
    }
    
    // 显示错误信息
    if (!isValid) {
        showErrors(errors);
    }
    
    return isValid;
}

// 显示错误信息
function showErrors(errors) {
    for (const field in errors) {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
            // 创建错误提示元素
            const errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.textContent = errors[field];
            
            // 添加到表单组
            const formGroup = input.closest('.form-group');
            formGroup.appendChild(errorEl);
            
            // 添加错误样式
            input.classList.add('error');
        }
    }
}

// 清除所有错误提示
function clearErrors() {
    // 移除所有错误提示
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
    
    // 移除所有错误样式
    const inputs = document.querySelectorAll('.auth-form input');
    inputs.forEach(input => input.classList.remove('error'));
}

// 初始化验证码刷新
function initCaptchaRefresh() {
    const captchaImg = document.querySelector('.captcha-img');
    
    if (captchaImg) {
        captchaImg.addEventListener('click', function() {
            // 模拟刷新验证码
            this.src = 'images/captcha.jpg?' + new Date().getTime();
        });
    }
}