// 账号详情页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
//    // 初始化分享功能
//    initShareFeature();
    
//    // 初始化图片轮播
//    initImageGallery();
    
    // 初始化标签页切换
    initTabs();
    
    // 初始化购买按钮和协议勾选
    initPurchase();
    
    // 初始化相关推荐账号卡片
    initRelatedAccounts();
    
    // 初始化弹窗
    initModals();
    
    // 初始化购买数量功能
    initQuantitySelector();
    //初始化用户登录状态检测
    isUserLoggedIn();
});

// 初始化分享功能
function initShareFeature() {
    const shareBtn = document.getElementById('share-btn');
    const shareModal = document.getElementById('share-modal');
    const closeBtn = shareModal.querySelector('.close');
    const shareLinkInput = document.getElementById('share-link-input');
    const copyLinkBtn = document.getElementById('copy-link-btn');

    // 如果没有分享按钮，直接返回
    if (!shareBtn) return;

    // 点击分享按钮
    shareBtn.addEventListener('click', function() {
        const accountId = this.getAttribute('data-id');

        // 调用后端接口获取分享链接
        fetch(`/accounts/${accountId}/share`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]').getAttribute('content')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 显示分享弹窗
                shareModal.style.display = 'block';

                // 设置分享链接
                const shareLink = window.location.origin + data.shareLink;
                shareLinkInput.value = shareLink;

                // 生成二维码
                generateQRCode(shareLink);

                // 设置社交媒体分享链接
                setupSocialSharing(shareLink);
            } else {
                alert(data.message || '分享失败');
            }
        })
        .catch(error => {
            console.error('分享出错:', error);
            alert('分享失败，请稍后再试');
        });
    });

    // 关闭弹窗
    closeBtn.addEventListener('click', function() {
        shareModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });

    // 复制链接
    copyLinkBtn.addEventListener('click', function() {
        shareLinkInput.select();
        document.execCommand('copy');
        alert('链接已复制到剪贴板');
    });
}

// 生成二维码
function generateQRCode(url) {
    const qrcodeContainer = document.getElementById('qrcode');
    
    // 清空容器
    qrcodeContainer.innerHTML = '';
    
    // 使用qrcode.js库生成二维码
    new QRCode(qrcodeContainer, {
        text: url,
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 设置社交媒体分享
function setupSocialSharing(url) {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]').getAttribute('content');
    
    // 微信分享（通常是显示二维码）
    document.getElementById('share-wechat').addEventListener('click', function(e) {
        e.preventDefault();
        alert('请使用微信扫描二维码分享');
    });
    
    // 微博分享
    document.getElementById('share-weibo').href = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    
    // QQ分享
    document.getElementById('share-qq').href = `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
    
    // 复制链接（已在上面的代码中处理）
}

// 初始化图片轮播
function initImageGallery() {
    const mainImage = document.querySelector('.account-gallery-main img');
    const thumbnails = document.querySelectorAll('.account-gallery-thumbs img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // 更新主图
            mainImage.src = this.getAttribute('data-large');
            
            // 移除所有缩略图的活动状态
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // 添加当前缩略图的活动状态
            this.classList.add('active');
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
// 初始化登录状态检测
function isUserLoggedIn() {
    // 从页面上的隐藏元素获取登录状态
    const loginStatusElement = document.getElementById('user-login-status');
    return loginStatusElement && loginStatusElement.value === 'true';
}

// 购买按钮和协议勾选功能
function initPurchase() {
    const buyButton = document.getElementById('buy-button');
    const agreeTerms = document.getElementById('agree-terms');
    
    if (buyButton && agreeTerms) {
        // 处理购买按钮点击
        buyButton.addEventListener('click', function() {
            // 检查是否同意协议
            if (!agreeTerms.checked) {
                alert('请先阅读并同意服务协议');
                return;
            }
            
            // 检查用户是否登录
            if (!isUserLoggedIn()) {
                // 显示登录提示弹窗
                openModal('login-modal');
                return;
            }
            
            // 获取账号ID
            const accountId = this.getAttribute('data-id');
            
            // 获取购买数量
            const quantity = document.getElementById('quantity-input') 
                ? parseInt(document.getElementById('quantity-input').value) 
                : 1;
            
            // 获取价格
            const priceElement = document.querySelector('.price-current') || document.querySelector('.account-price .price');
            const totalPrice = priceElement 
                ? parseFloat(priceElement.textContent.replace('¥', '').trim()) 
                : 0;
            
            // 创建表单提交
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/buy/createOrder';
            form.style.display = 'none';
            
            // 添加账号ID字段
            const accountIdField = document.createElement('input');
            accountIdField.type = 'hidden';
            accountIdField.name = 'accountId';
            accountIdField.value = accountId;
            form.appendChild(accountIdField);
            
            // 添加数量字段
            const quantityField = document.createElement('input');
            quantityField.type = 'hidden';
            quantityField.name = 'quantity';
            quantityField.value = quantity;
            form.appendChild(quantityField);
            
            // 添加总价字段
            const totalPriceField = document.createElement('input');
            totalPriceField.type = 'hidden';
            totalPriceField.name = 'totalPrice';
            totalPriceField.value = totalPrice;
            form.appendChild(totalPriceField);
            
            // 添加CSRF令牌（如果使用Spring Security）
            const csrfToken = document.querySelector('meta[name="_csrf"]');
            const csrfHeader = document.querySelector('meta[name="_csrf_header"]');
            
            if (csrfToken && csrfHeader) {
                const csrfField = document.createElement('input');
                csrfField.type = 'hidden';
                csrfField.name = csrfHeader.content.replace('X-', '');
                csrfField.value = csrfToken.content;
                form.appendChild(csrfField);
            }
            
            // 添加表单到文档并提交
            document.body.appendChild(form);
            form.submit();
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
    });
}


