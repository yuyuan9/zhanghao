// 账号详情页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化图片切换功能
    initImageGallery();
    
    // 初始化标签页切换
    initTabs();
    
    // 初始化购买按钮和协议勾选
    initPurchase();
    
    // 初始化相关推荐账号卡片
    initRelatedAccounts();
    
    // 初始化弹窗
    initModals();
    
    // 初始化未登录购买功能
    initGuestPurchase();
    
    // 初始化购买数量功能
    initQuantitySelector();
});

// 图片切换功能
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.getElementById('main-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // 移除所有缩略图的active类
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // 为当前点击的缩略图添加active类
            this.classList.add('active');
            
            // 更新主图片
            mainImage.src = this.src.replace('w=150&h=100', 'w=800&h=600');
            
            // 添加淡入效果
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 50);
        });
    });
}

// 标签页切换功能
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 移除所有内容面板的活动状态
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 添加当前按钮的活动状态
            this.classList.add('active');
            
            // 获取目标标签页ID
            const tabId = this.getAttribute('data-tab');
            
            // 激活对应的内容面板
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
}

// 购买按钮和协议勾选功能
function initPurchase() {
    const agreementCheckbox = document.getElementById('agreement-checkbox');
    const buyButton = document.getElementById('buy-now-btn');
    const termsLink = document.querySelector('a[href="terms.html"]');
    const afterSalesLink = document.querySelector('a[href="after-sales.html"]');
    
    // 检查协议勾选状态并更新按钮状态
    function updateButtonState() {
        if (agreementCheckbox.checked) {
            buyButton.removeAttribute('disabled');
            buyButton.classList.remove('btn-disabled');
            buyButton.classList.add('btn-primary');
        } else {
            buyButton.setAttribute('disabled', 'disabled');
            buyButton.classList.remove('btn-primary');
            buyButton.classList.add('btn-disabled');
        }
    }
    
    // 初始状态下更新按钮
    updateButtonState();
    
    // 监听复选框变化
    agreementCheckbox.addEventListener('change', updateButtonState);
    
    // 购买按钮点击事件
    buyButton.addEventListener('click', function() {
        if (!agreementCheckbox.checked) {
            alert('请先阅读并同意服务协议和售后协议');
            return;
        }
        
        // 这里可以添加购买逻辑，例如跳转到支付页面
        window.location.href = 'payment.html?id=1';
    });
    
    // 服务协议点击事件
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('terms-modal');
        });
    }
    
    // 售后协议点击事件
    if (afterSalesLink) {
        afterSalesLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('after-sales-modal');
        });
    }
}

// 初始化相关推荐账号卡片
function initRelatedAccounts() {
    const accountCards = document.querySelectorAll('.account-card');
    
    accountCards.forEach(card => {
        // 添加鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // 添加点击效果
        card.addEventListener('click', function(e) {
            // 如果是已售罄状态或点击的是按钮，不执行跳转
            if (this.classList.contains('sold-out') || e.target.closest('.btn')) {
                return;
            }
            
            // 否则跳转到详情页
            const link = this.querySelector('a.btn').getAttribute('href');
            window.location.href = link;
        });
        
        // 处理库存显示
        const stockEl = card.querySelector('.account-stock');
        if (stockEl) {
            const stockNum = parseInt(stockEl.textContent.match(/\d+/)[0]);
            
            // 根据库存数量添加不同的类名
            if (stockNum <= 5 && stockNum > 0) {
                stockEl.classList.add('stock-low');
            } else if (stockNum === 0) {
                stockEl.classList.add('stock-critical');
                card.classList.add('sold-out');
                
                // 修改按钮文本
                const btn = card.querySelector('.btn');
                if (btn) {
                    btn.textContent = '已售罄';
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-disabled');
                    btn.setAttribute('disabled', 'disabled');
                }
            }
        }
    });
}

// 图片切换函数 - 用于HTML中的onclick调用
function changeImage(src) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = src.replace('w=150&h=100', 'w=800&h=600');
    
    // 更新缩略图active状态
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    thumbnails.forEach(thumb => {
        if (thumb.src === src) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// 添加弹窗相关函数
function initModals() {
    // 获取弹框元素
    const termsModal = document.getElementById('terms-modal');
    const afterSalesModal = document.getElementById('after-sales-modal');
    
    // 获取链接元素
    const termsLink = document.getElementById('terms-link');
    const afterSalesLink = document.getElementById('after-sales-link');
    
    // 获取关闭按钮
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // 点击服务协议链接显示服务协议弹框
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 点击售后协议链接显示售后协议弹框
    afterSalesLink.addEventListener('click', function(e) {
        e.preventDefault();
        afterSalesModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 点击关闭按钮关闭弹框
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            termsModal.style.display = 'none';
            afterSalesModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢复背景滚动
        });
    });
    
    // 点击弹框外部关闭弹框
    window.addEventListener('click', function(event) {
        if (event.target === termsModal) {
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === afterSalesModal) {
            afterSalesModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 打开弹窗
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }
}

// 关闭弹窗
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

// 添加未登录购买功能
function initGuestPurchase() {
    const buyButton = document.getElementById('buy-now-btn');
    const guestPurchaseModal = document.getElementById('guest-purchase-modal');
    const continueAsGuestBtn = document.getElementById('continue-as-guest');
    const backToOptionsBtn = document.getElementById('back-to-options');
    const proceedToPaymentBtn = document.getElementById('proceed-to-payment');
    const guestPurchaseOptions = document.querySelector('.guest-purchase-options');
    const guestPurchaseForm = document.querySelector('.guest-purchase-form');
    const guestEmail = document.getElementById('guest-email');
    const guestPhone = document.getElementById('guest-phone');
    
    // 检查用户是否已登录
    function isUserLoggedIn() {
        // 这里应该检查用户是否已登录
        // 为了演示，我们假设用户未登录
        return false;
    }
    
    // 购买按钮点击事件
    buyButton.addEventListener('click', function() {
        const agreementCheckbox = document.getElementById('agreement-checkbox');
        
        if (!agreementCheckbox.checked) {
            alert('请先阅读并同意服务协议和售后协议');
            return;
        }
        
        if (!isUserLoggedIn()) {
            // 如果用户未登录，显示未登录购买弹窗
            openModal('guest-purchase-modal');
            // 重置表单
            guestPurchaseOptions.style.display = 'flex';
            guestPurchaseForm.style.display = 'none';
            guestEmail.value = '';
            guestPhone.value = '';
        } else {
            // 如果用户已登录，直接跳转到支付页面
            window.location.href = 'payment.html?id=1';
        }
    });
    
    // 直接购买按钮点击事件
    continueAsGuestBtn.addEventListener('click', function() {
        guestPurchaseOptions.style.display = 'none';
        guestPurchaseForm.style.display = 'block';
    });
    
    // 返回按钮点击事件
    backToOptionsBtn.addEventListener('click', function() {
        guestPurchaseOptions.style.display = 'flex';
        guestPurchaseForm.style.display = 'none';
    });
    
    // 确认并支付按钮点击事件
    proceedToPaymentBtn.addEventListener('click', function() {
        // 验证表单
        if (!guestEmail.value) {
            alert('请输入邮箱地址');
            guestEmail.focus();
            return;
        }
        
        if (!validateEmail(guestEmail.value)) {
            alert('请输入有效的邮箱地址');
            guestEmail.focus();
            return;
        }
        
        if (!guestPhone.value) {
            alert('请输入手机号码');
            guestPhone.focus();
            return;
        }
        
        if (!validatePhone(guestPhone.value)) {
            alert('请输入有效的手机号码');
            guestPhone.focus();
            return;
        }
        
        // 保存游客信息到本地存储
        localStorage.setItem('guestEmail', guestEmail.value);
        localStorage.setItem('guestPhone', guestPhone.value);
        
        // 跳转到支付页面
        window.location.href = 'payment.html?id=1&guest=true';
    });
    
    // 验证邮箱格式
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // 验证手机号格式
    function validatePhone(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    }
}

// 修改initQuantitySelector函数，更新库存显示逻辑
function initQuantitySelector() {
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity-input');
    const buyButton = document.getElementById('buy-now-btn');
    const priceElement = document.querySelector('.price-current');
    
    // 获取单价
    const unitPrice = parseFloat(priceElement.textContent.replace('¥', ''));
    
    // 获取最大库存
    const maxStock = parseInt(quantityInput.getAttribute('max'));
    
    // 更新价格显示
    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value);
        const totalPrice = (unitPrice * quantity).toFixed(0);
        priceElement.textContent = `¥${totalPrice}`;
    }
    
    // 减少数量
    decreaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updateTotalPrice();
        }
    });
    
    // 增加数量
    increaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < maxStock) {
            quantityInput.value = currentValue + 1;
            updateTotalPrice();
        }
    });
    
    // 直接输入数量
    quantityInput.addEventListener('change', function() {
        let currentValue = parseInt(this.value);
        
        // 确保数量在有效范围内
        if (isNaN(currentValue) || currentValue < 1) {
            this.value = 1;
        } else if (currentValue > maxStock) {
            this.value = maxStock;
        }
        
        updateTotalPrice();
    });
    
    // 修改购买按钮点击事件，传递购买数量
    buyButton.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        
        // 检查协议是否勾选
        const agreementCheckbox = document.getElementById('agreement-checkbox');
        if (!agreementCheckbox.checked) {
            alert('请先阅读并同意服务协议和售后协议');
            return;
        }
        
        // 检查是否登录
        if (!isUserLoggedIn()) {
            // 如果用户未登录，显示未登录购买弹窗
            openModal('guest-purchase-modal');
            
            // 修改未登录购买流程中的确认按钮，传递数量
            const proceedToPaymentBtn = document.getElementById('proceed-to-payment');
            if (proceedToPaymentBtn) {
                proceedToPaymentBtn.onclick = function() {
                    const guestEmail = document.getElementById('guest-email');
                    const guestPhone = document.getElementById('guest-phone');
                    
                    // 验证表单
                    if (!guestEmail.value) {
                        alert('请输入邮箱地址');
                        guestEmail.focus();
                        return;
                    }
                    
                    if (!validateEmail(guestEmail.value)) {
                        alert('请输入有效的邮箱地址');
                        guestEmail.focus();
                        return;
                    }
                    
                    if (!guestPhone.value) {
                        alert('请输入手机号码');
                        guestPhone.focus();
                        return;
                    }
                    
                    if (!validatePhone(guestPhone.value)) {
                        alert('请输入有效的手机号码');
                        guestPhone.focus();
                        return;
                    }
                    
                    // 保存游客信息到本地存储
                    localStorage.setItem('guestEmail', guestEmail.value);
                    localStorage.setItem('guestPhone', guestPhone.value);
                    
                    // 跳转到支付页面，并传递购买数量
                    window.location.href = `payment.html?id=1&guest=true&quantity=${quantity}`;
                };
            }
        } else {
            // 如果用户已登录，直接跳转到支付页面，并传递购买数量
            window.location.href = `payment.html?id=1&quantity=${quantity}`;
        }
    });
}

// 检查用户是否已登录
function isUserLoggedIn() {
    // 这里应该检查用户是否已登录
    // 为了演示，我们假设用户未登录
    return false;
}

// 验证邮箱格式
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// 验证手机号格式
function validatePhone(phone) {
    const re = /^1[3-9]\d{9}$/;
    return re.test(phone);
} 