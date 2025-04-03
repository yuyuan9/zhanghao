document.addEventListener('DOMContentLoaded', function() {
    // 复制地址功能
    const copyBtn = document.getElementById('copy-address');
    const walletAddress = document.getElementById('wallet-address');
    
    if (copyBtn && walletAddress) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(walletAddress.textContent)
                .then(() => {
                    // 提示复制成功 (可选)
                    const originalIcon = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    copyBtn.title = '已复制!';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalIcon;
                        copyBtn.title = '复制地址';
                    }, 2000);
                })
                .catch(err => {
                    console.error('复制失败:', err);
                    // 可以添加一个备用复制方法或提示用户手动复制
                    alert('复制失败，请手动复制地址。');
                });
        });
    }

    // 倒计时功能
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // 从服务器获取或设置一个初始时间（例如15分钟）
        let timeLeft = 15 * 60; // 假设15分钟，单位秒

        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                countdownElement.textContent = '已超时';
                // 这里可以添加订单超时的处理逻辑，例如禁用按钮
                document.getElementById('payment-complete').disabled = true;
                document.getElementById('payment-complete').textContent = '订单已超时';
                document.getElementById('payment-complete').classList.add('btn-disabled');
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                countdownElement.textContent = `${minutes}分${seconds < 10 ? '0' : ''}${seconds}秒`;
                timeLeft--;
            }
        }, 1000);
    }

    // "我已完成支付"按钮点击事件
    const paymentCompleteBtn = document.getElementById('payment-complete');
    if (paymentCompleteBtn) {
        paymentCompleteBtn.addEventListener('click', function() {
            // 获取订单ID
            const oid = document.getElementById('oid').value
            // 显示检查中状态
            const originalText = paymentCompleteBtn.innerHTML;
            paymentCompleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在检查支付状态...';
            paymentCompleteBtn.disabled = true;
            
            // 调用检查支付状态接口
            fetch('/buy/checkPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 如果使用Spring Security，需要添加CSRF令牌
                    'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]')?.getAttribute('content') || ''
                },
                body: 'oid=' + oid
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 支付成功
                    paymentCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i> 支付成功!';
                    paymentCompleteBtn.classList.remove('btn-primary');
                    paymentCompleteBtn.classList.add('btn-success');
                    // 2秒后跳转到订单页面
                    setTimeout(() => {
                        window.location.href = data.redirectUrl || '/orders';
                    }, 200);

                } else {
                  // 未检测到支付
                    paymentCompleteBtn.innerHTML = originalText;
                    paymentCompleteBtn.disabled = false;
                    alert('暂未检测到支付，请确认转账是否成功，或稍后再试');
//                    // 检查失败
//                    paymentCompleteBtn.innerHTML = originalText;
//                    paymentCompleteBtn.disabled = false;
//                    alert('检查支付状态失败，请稍后再试');
                }
            })
            .catch(error => {
                console.error('检查支付状态出错:', error);
                paymentCompleteBtn.innerHTML = originalText;
                paymentCompleteBtn.disabled = false;
                alert('检查支付状态出错，请稍后再试');
            });
        });
    }

    // "联系客服"按钮点击事件
    const contactSupportBtn = document.getElementById('contact-support');
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', function() {
            // 跳转到客服页面或弹出客服联系方式
            // 例如: window.location.href = '/contact';
            alert('请联系客服：@duotena'); // 示例
        });
    }

}); 