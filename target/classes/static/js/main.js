// 主要JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏
    initNavigation();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 初始化通用组件
    initCommonComponents();
});

// 初始化导航栏
function initNavigation() {
    // 获取当前页面URL
    const currentUrl = window.location.pathname;
    
    // 设置当前页面的导航项为激活状态
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
    
    // 移动端菜单切换
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header .container');
    header.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// 初始化滚动效果
function initScrollEffects() {
    // 滚动时显示/隐藏返回顶部按钮
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初始化通用组件
function initCommonComponents() {
    // 初始化FAQ折叠面板
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        });
    }
} 