document.addEventListener('DOMContentLoaded', function() {
    // 初始化验证码
    generateCaptcha();
    
    // 刷新验证码按钮点击事件
    document.getElementById('refresh-captcha').addEventListener('click', function(e) {
        e.preventDefault();
        generateCaptcha();
    });
    
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
    const form = document.getElementById('register-form');
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
        if (!validatePassword(password)) {
            showError('password', '密码必须至少包含8个字符，且包含字母和数字');
            isValid = false;
        }
        
        // 验证确认密码
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password !== confirmPassword) {
            showError('confirm-password', '两次输入的密码不一致');
            isValid = false;
        }
        
        // 验证验证码
        const captchaInput = document.getElementById('captcha').value;
        const captchaText = document.getElementById('captcha-text').textContent.replace(/\s/g, '');
        if (!captchaInput) {
            showError('captcha', '请输入验证码');
            isValid = false;
        } else if (captchaInput !== captchaText) {
            showError('captcha', '验证码不正确');
            generateCaptcha(); // 刷新验证码
            isValid = false;
        }
        
        // 验证协议勾选
        const agreeCheckbox = document.getElementById('agree');
        if (!agreeCheckbox.checked) {
            showError('agree', '请阅读并同意服务条款和隐私政策');
            isValid = false;
        }
        
        // 如果验证通过，提交表单
        if (isValid) {
            // 构建请求数据
            const requestData = {
                email: email,
                password: password,
                captcha: captchaInput
            };
            
            // 显示加载状态
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 注册中...';
            
            // 发送注册请求
            fetch('/api/user/register', {
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
                    // 注册成功
//                    setTimeout(() => {
//                        window.location.href = '/login';
//                    }, 1500);
                    //注册成功后跳转到登录页面
                    window.location.href = '/login';
                } else {
                    // 注册失败
                    alert('注册失败：' + data.message);
                    // 如果是验证码错误，刷新验证码
                    if (data.message.includes('验证码')) {
                        generateCaptcha();
                    }
                }
            })
            .catch(error => {
                // 恢复按钮状态
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                console.error('注册请求出错:', error);
                alert('注册请求出错，请稍后再试');
            });
        }
    });
    
    // 服务条款和隐私政策弹窗
    const termsModal = document.getElementById('terms-modal');
    const privacyModal = document.getElementById('privacy-modal');
    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            termsModal.style.display = 'none';
            privacyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === termsModal) {
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === privacyModal) {
            privacyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
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
        
        // 检查邮箱是否已存在
        fetch(`/api/user/check-email?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                if (data.code === 200 && data.data === true) {
                    showError('email', '该邮箱已被注册');
                } else {
                    // 验证通过，添加成功样式
                    emailInput.classList.add('valid');
                }
            })
            .catch(error => {
                console.error('检查邮箱请求出错:', error);
            });
    });
    
    // 密码验证
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('blur', function() {
        // 清除该字段的错误提示
        clearFieldError('password');
        
        const password = this.value;
        if (!password) {
            showError('password', '请设置密码');
            return;
        }
        
        if (!validatePassword(password)) {
            showError('password', '密码必须至少包含8个字符，且包含字母和数字');
            return;
        }
        
        // 验证通过，添加成功样式
        passwordInput.classList.add('valid');
        
        // 如果确认密码已填写，同时验证确认密码
        const confirmPasswordInput = document.getElementById('confirm-password');
        if (confirmPasswordInput.value) {
            confirmPasswordInput.dispatchEvent(new Event('blur'));
        }
    });
    
    // 确认密码验证
    const confirmPasswordInput = document.getElementById('confirm-password');
    confirmPasswordInput.addEventListener('blur', function() {
        // 清除该字段的错误提示
        clearFieldError('confirm-password');
        
        const confirmPassword = this.value;
        if (!confirmPassword) {
            showError('confirm-password', '请再次输入密码');
            return;
        }
        
        const password = document.getElementById('password').value;
        if (password !== confirmPassword) {
            showError('confirm-password', '两次输入的密码不一致');
            return;
        }
        
        // 验证通过，添加成功样式
        confirmPasswordInput.classList.add('valid');
    });
    
    // 验证码验证
    const captchaInput = document.getElementById('captcha');
    captchaInput.addEventListener('blur', function() {
        // 清除该字段的错误提示
        clearFieldError('captcha');
        
        const captcha = this.value;
        if (!captcha) {
            showError('captcha', '请输入验证码');
            return;
        }
        
        const captchaText = document.getElementById('captcha-text').textContent.replace(/\s/g, '');
        if (captcha !== captchaText) {
            showError('captcha', '验证码不正确');
            generateCaptcha(); // 刷新验证码
            return;
        }
        
        // 验证通过，添加成功样式
        captchaInput.classList.add('valid');
    });
    
    // 协议勾选验证
    const agreeCheckbox = document.getElementById('agree');
    agreeCheckbox.addEventListener('change', function() {
        // 清除该字段的错误提示
        clearFieldError('agree');
        
        if (!this.checked) {
            showError('agree', '请阅读并同意服务条款和隐私政策');
        }
    });
}

// 生成随机4位数验证码
function generateCaptcha() {
    const captchaText = document.getElementById('captcha-text');
    const captchaInput = document.getElementById('captcha');
    
    // 生成4位随机数字
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    captchaText.textContent = randomNum.toString();
    
    // 清空输入框
    if (captchaInput) {
        captchaInput.value = '';
        // 清除验证码的错误和成功样式
        captchaInput.classList.remove('error', 'valid');
        clearFieldError('captcha');
    }
    
    // 随机旋转验证码中的每个数字，增加辨识难度
    const digits = captchaText.textContent.split('');
    captchaText.innerHTML = '';
    
    digits.forEach(digit => {
        const span = document.createElement('span');
        span.textContent = digit;
        span.style.display = 'inline-block';
        span.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        captchaText.appendChild(span);
    });
}

// 验证邮箱格式
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 验证密码格式
function validatePassword(password) {
    // 密码必须至少8位，包含字母和数字
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
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