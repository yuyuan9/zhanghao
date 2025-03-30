// 支付说明页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化FAQ折叠面板
    initFaqAccordion();
    
    // 初始化网络选择
    initNetworkSelection();
});

// 初始化FAQ折叠面板
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.payment-faq .faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 切换当前项的激活状态
            item.classList.toggle('active');
        });
    });
}

// 初始化网络选择
function initNetworkSelection() {
    const networkItems = document.querySelectorAll('.network-item');
    
    networkItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有激活状态
            networkItems.forEach(i => i.classList.remove('active'));
            
            // 设置当前项为激活状态
            this.classList.add('active');
            
            // 获取网络类型
            const network = this.getAttribute('data-network');
            
            // 更新网络说明（这里可以根据实际需求实现）
            console.log('选择网络:', network);
        });
    });
    
    // 默认选中第一个网络
    if (networkItems.length > 0) {
        networkItems[0].classList.add('active');
    }
} 