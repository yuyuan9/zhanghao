// 支付成功页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面数据
    initPageData();
    
    // 初始化按钮事件
    initButtons();
});

// 初始化页面数据
function initPageData() {
    // 从URL参数获取订单信息
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id') || 'ORD20230615001';
    const amount = urlParams.get('amount') || '299.00';
    
    // 设置订单信息
    document.getElementById('order-id').textContent = orderId;
    document.getElementById('payment-amount').textContent = `¥${amount}`;
    
    // 设置当前时间为支付时间
    const now = new Date();
    const paymentTime = `${now.getFullYear()}-${padZero(now.getMonth() + 1)}-${padZero(now.getDate())} ${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;
    document.getElementById('payment-time').textContent = paymentTime;
    
    // 更新订单查询链接
    const orderLink = document.querySelector('.access-options .btn-primary');
    orderLink.href = `orders.html?order_id=${orderId}`;
}

// 初始化按钮事件
function initButtons() {
    // 发送到邮箱按钮
    const sendEmailBtn = document.getElementById('send-email-btn');
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取用户邮箱（从本地存储或URL参数）
            const userEmail = localStorage.getItem('guestEmail') || 'your@email.com';
            
            // 显示发送中状态
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            this.disabled = true;
            
            // 模拟发送过程
            setTimeout(() => {
                // 恢复按钮状态
                this.innerHTML = '<i class="fas fa-check"></i> 已发送';
                this.style.backgroundColor = '#28a745';
                this.style.borderColor = '#28a745';
                
                // 显示成功提示
                alert(`账号信息已发送至您的邮箱: ${userEmail}`);
                
                // 一段时间后恢复原始状态
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.disabled = false;
                    this.style.backgroundColor = '';
                    this.style.borderColor = '';
                }, 3000);
            }, 1500);
        });
    }
}

// 数字补零
function padZero(num) {
    return num < 10 ? `0${num}` : num;
} 