// FAQ页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化分类筛选
    initCategoryFilter();
    
    // 初始化搜索功能
    initSearch();
});

// 初始化分类筛选
function initCategoryFilter() {
    const tabs = document.querySelectorAll('.category-tabs .tab');
    const faqItems = document.querySelectorAll('.faq-item');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有激活状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 设置当前项为激活状态
            this.classList.add('active');
            
            // 获取分类值
            const category = this.getAttribute('data-category');
            
            // 显示/隐藏对应的FAQ项
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const faqItems = document.querySelectorAll('.faq-item');
    const tabs = document.querySelectorAll('.category-tabs .tab');
    const allTab = document.querySelector('.tab[data-category="all"]');
    
    // 搜索函数
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 如果搜索框为空，恢复默认显示
            const activeTab = document.querySelector('.tab.active');
            activeTab.click();
            return;
        }
        
        // 设置"全部问题"标签为激活状态
        tabs.forEach(tab => tab.classList.remove('active'));
        allTab.classList.add('active');
        
        // 搜索问题和答案
        let hasResults = false;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                hasResults = true;
                
                // 如果匹配，自动展开该项
                item.classList.add('active');
            } else {
                item.style.display = 'none';
            }
        });
        
        // 如果没有结果，显示提示
        const noResultsEl = document.querySelector('.no-results');
        
        if (!hasResults) {
            if (!noResultsEl) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <p>没有找到与"${searchTerm}"相关的问题。</p>
                    <p>请尝试使用其他关键词，或者<a href="#" class="clear-search">清除搜索</a>查看所有问题。</p>
                `;
                
                document.querySelector('.faq-list').appendChild(noResults);
                
                // 添加清除搜索的点击事件
                document.querySelector('.clear-search').addEventListener('click', function(e) {
                    e.preventDefault();
                    searchInput.value = '';
                    performSearch();
                });
            }
        } else if (noResultsEl) {
            noResultsEl.remove();
        }
    }
    
    // 点击搜索按钮
    searchButton.addEventListener('click', performSearch);
    
    // 按回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
} 