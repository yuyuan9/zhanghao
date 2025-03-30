document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播图元素
    const slider = document.getElementById('banner-slider');
    if (!slider) return; // 如果页面上没有轮播图，则退出
    
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return; // 如果没有轮播图，则退出
    
    // 添加幻灯片点击事件
    slides.forEach(slide => {
        slide.addEventListener('click', function(e) {
            // 如果点击的是控制按钮或指示器，不执行跳转
            if (e.target.closest('.slider-btn') || e.target.closest('.slider-indicators')) {
                return;
            }
            
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
    
    // 预加载下一张图片
    function preloadImage(index) {
        if (index >= slides.length) index = 0;
        const nextSlide = slides[index];
        const img = nextSlide.querySelector('img');
        if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.dataset.src = '';
        }
    }
    
    // 当前轮播图索引
    let currentIndex = 0;
    
    // 自动轮播定时器
    let autoSlideInterval;
    
    // 显示指定索引的轮播图
    function showSlide(index) {
        // 隐藏所有轮播图
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 移除所有指示器的激活状态
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // 显示当前轮播图
        slides[index].classList.add('active');
        
        // 激活当前指示器
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        // 更新当前索引
        currentIndex = index;
        
        // 预加载下一张图片
        preloadImage(index + 1);
    }
    
    // 显示下一张轮播图
    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // 显示上一张轮播图
    function prevSlide() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // 开始自动轮播
    function startAutoSlide() {
        stopAutoSlide(); // 先停止之前的定时器
        autoSlideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // 绑定按钮点击事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡，避免触发幻灯片点击
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡，避免触发幻灯片点击
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    // 绑定指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡，避免触发幻灯片点击
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // 鼠标悬停时停止自动轮播
    slider.addEventListener('mouseenter', stopAutoSlide);
    
    // 鼠标离开时恢复自动轮播
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // 确保初始状态正确
    showSlide(0);
    
    // 开始自动轮播
    startAutoSlide();
}); 