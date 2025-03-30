document.addEventListener('DOMContentLoaded', function() {
    // 密码显示/隐藏切换
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // 添加实时表单验证
    setupFormValidation();
    
    // 表单提交验证
    const form = document.getElementById('login-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 清除所有错误提示
        clearAllErrors();
        
        let isValid = true;
        
        // 验证邮箱
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            showError('email', '请输入有效的电子邮箱地址');
            isValid = false;
        }
        
        // 验证密码
        const password = document.getElementById('password').value;
        if (!password) {
            showError('password', '请输入密码');
            isValid = false;
        }
        
        // 如果验证通过，提交表单
        if (isValid) {
            // 构建请求数据
            const requestData = {
                email: email,
                password: password
            };
            
            // 显示加载状态
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
            
            // 发送登录请求
            fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(data => {
                // 恢复按钮状态
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                if (data.code === 200) {
                    // 登录成功
                    window.location.href = '/'; // 跳转到首页
                } else {
                    // 登录失败
                    showError('password', data.message || '登录失败，请检查邮箱和密码');
                }
            })
            .catch(error => {
                // 恢复按钮状态
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                console.error('登录请求出错:', error);
                alert('登录请求出错，请稍后再试');
            });
        }
    });
});

// 设置实时表单验证
function setupFormValidation() {
    // 邮箱验证
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        // 清除该字段的错误提示
        clearFieldError('email');
        
        const email = this.value.trim();
        if (!email) {
            showError('email', '请输入电子邮箱');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('email', '请输入有效的电子邮箱地址');
            return;
        }
        
        // 验证通过，添加成功样式
        emailInput.classList.add('valid');
    });
    
    // 密码验证
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('blur', function() {
        // 清除该字段的错误提示
        clearFieldError('password');
        
        const password = this.value;
        if (!password) {
            showError('password', '请输入密码');
            return;
        }
        
        // 验证通过，添加成功样式
        passwordInput.classList.add('valid');
    });
}

// 验证邮箱格式
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示错误信息
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group') || field.closest('.form-options');
    
    // 添加错误样式
    field.classList.add('error');
    field.classList.remove('valid');
    
    // 创建错误消息元素
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // 添加到表单组
    formGroup.appendChild(errorElement);
}

// 清除特定字段的错误提示
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group') || field.closest('.form-options');
    
    // 移除错误样式
    field.classList.remove('error');
    
    // 移除错误消息
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// 清除所有错误提示
function clearAllErrors() {
    // 移除所有错误消息
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // 移除所有错误样式
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
} 