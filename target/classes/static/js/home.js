// 首页JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    initSlider();
    
    // 初始化账号标签页
    initAccountTabs();
    
    // 初始化账号卡片效果
    initAccountCards();
});

// 初始化轮播图
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;
    
    // 显示指定幻灯片
    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.classList.remove('active');
            // 不要立即隐藏，让过渡效果完成
            setTimeout(() => {
                if (slide !== slides[index]) { // 不隐藏即将显示的幻灯片
                    slide.style.display = 'none';
                }
            }, 800);
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 显示当前幻灯片
        slides[index].style.display = 'block';
        // 使用requestAnimationFrame确保DOM更新后再添加active类
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                slides[index].classList.add('active');
            });
        });
        
        dots[index].classList.add('active');
        
        // 更新当前幻灯片索引
        currentSlide = index;
        
        // 动画完成后重置状态
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
    
    // 显示下一张幻灯片
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // 显示上一张幻灯片
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // 开始自动播放
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    // 停止自动播放
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // 点击下一张按钮
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        stopSlideInterval();
        nextSlide();
        startSlideInterval();
    });
    
    // 点击上一张按钮
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        stopSlideInterval();
        prevSlide();
        startSlideInterval();
    });
    
    // 点击指示点
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            if (currentSlide === index) return;
            stopSlideInterval();
            showSlide(index);
            startSlideInterval();
        });
    });
    
    // 添加幻灯片点击事件 - 点击幻灯片跳转到对应链接
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            const link = this.querySelector('.slide-content a.btn').getAttribute('href');
            if (link) {
                window.location.href = link;
            }
        });
        
        // 确保按钮点击事件不会触发幻灯片点击事件
        const btn = slide.querySelector('.btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
            });
        }
    });
    
    // 鼠标悬停在轮播图上时停止自动播放
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', stopSlideInterval);
    slider.addEventListener('mouseleave', startSlideInterval);
    
    // 触摸事件支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopSlideInterval();
    }, {passive: true});
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlideInterval();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // 向左滑动，显示下一张
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // 向右滑动，显示上一张
            prevSlide();
        }
    }
    
    // 初始显示第一张幻灯片
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.style.display = 'block';
            slide.classList.add('active');
        } else {
            slide.style.display = 'none';
        }
    });
    
    // 开始自动播放
    startSlideInterval();
}

// 初始化账号标签页
function initAccountTabs() {
    const tabButtons = document.querySelectorAll('.account-tabs .tab-btn');
    const accountCards = document.querySelectorAll('.account-card');
    
    if (tabButtons.length === 0 || accountCards.length === 0) {
        console.warn('标签按钮或账号卡片不存在');
        return;
    }
    
    console.log('初始化标签页，找到', tabButtons.length, '个标签按钮和', accountCards.length, '个账号卡片');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('点击了标签：', this.getAttribute('data-category'));
            
            // 移除所有按钮的活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的活动状态
            this.classList.add('active');
            
            // 获取选中的分类
            const category = this.getAttribute('data-category');
            
            // 显示或隐藏账号卡片
            accountCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                console.log('卡片分类：', cardCategory);
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 初始化账号卡片效果
function initAccountCards() {
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
            // 如果点击的是按钮，不执行跳转（让按钮自己的链接生效）
            if (e.target.closest('.btn')) {
                return;
            }
            
            // 获取卡片中的链接地址
            const link = this.querySelector('a.btn').getAttribute('href');
            if (link) {
                window.location.href = link;
            }
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