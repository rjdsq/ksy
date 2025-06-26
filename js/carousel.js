// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    // 纯前端动态加载图片函数
    async function loadImages() {
        try {
            const imgDir = 'img/yunnan/';
            const response = await fetch(imgDir);
            if (!response.ok) throw new Error('目录访问失败');
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // 从目录列表中提取图片文件
            const images = Array.from(doc.querySelectorAll('a'))
                .map(a => a.getAttribute('href'))
                .filter(href => 
                    href && 
                    !href.startsWith('?') && 
                    !href.startsWith('/') &&
                    /\.(jpg|jpeg|png|gif|webp)$/i.test(href)
                )
                .map(href => imgDir + href);
            
            if (images.length === 0) throw new Error('未找到图片');
            return images;
        } catch (error) {
            console.warn('纯前端动态加载失败:', error.message);
            console.info('将使用默认图片作为后备');
            return [
                'img/yunnan/云南大理 洱海.jpg',
                'img/yunnan/云南大理 苍山.jpg'
            ];
        }
    }

    // 初始化轮播图
    async function initCarousel() {
        const images = await loadImages();
        
        // 轮播图容器
        const carousel = document.querySelector('.carousel');
        const container = carousel.querySelector('.carousel-container');
        const indicators = carousel.querySelector('.carousel-indicators');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        let currentIndex = 0;
        let intervalId = null;
        const carouselItems = [];

        // 创建轮播图项和指示器
        function createCarouselItems() {
            container.innerHTML = '';
            indicators.innerHTML = '';
            
            images.forEach((img, index) => {
                // 创建轮播图项
                const item = document.createElement('div');
                item.className = 'carousel-item';
                if (index === 0) item.classList.add('active');
                
                const imgEl = document.createElement('img');
                imgEl.src = img;
                imgEl.alt = img.split('/').pop().split('.')[0];
                
                item.appendChild(imgEl);
                container.appendChild(item);
                carouselItems.push(item);
                
                // 创建指示器
                const indicator = document.createElement('div');
                indicator.className = 'carousel-indicator';
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(index));
                indicators.appendChild(indicator);
            });
        }

        // 切换幻灯片
        function goToSlide(index) {
            // 边界检查
            if (index < 0) index = images.length - 1;
            else if (index >= images.length) index = 0;
            
            // 更新当前项
            carouselItems[currentIndex].classList.remove('active');
            indicators.children[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            // 设置新项
            carouselItems[currentIndex].classList.add('active');
            indicators.children[currentIndex].classList.add('active');
        }

        // 自动播放
        function startAutoPlay() {
            stopAutoPlay();
            intervalId = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 3000);
        }

        // 停止自动播放
        function stopAutoPlay() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        // 初始化轮播图
        createCarouselItems();
        startAutoPlay();

        // 事件监听
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(currentIndex - 1);
            startAutoPlay();
        });
        
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(currentIndex + 1);
            startAutoPlay();
        });
        
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // 创建轮播图项和指示器
        function createCarouselItems() {
            container.innerHTML = '';
            indicators.innerHTML = '';
            
            images.forEach((img, index) => {
                // 创建轮播图项
                const item = document.createElement('div');
                item.className = 'carousel-item';
                if (index === 0) item.classList.add('active');
                
                const imgEl = document.createElement('img');
                imgEl.src = img;
                imgEl.alt = img.split('/').pop().split('.')[0];
                
                item.appendChild(imgEl);
                container.appendChild(item);
                
                // 创建指示器
                const indicator = document.createElement('div');
                indicator.className = 'carousel-indicator';
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(index));
                indicators.appendChild(indicator);
            });
        }
        
        // 切换幻灯片
        function goToSlide(index) {
            // ...原有切换逻辑...
        }
        
        // 自动播放
        function startAutoPlay() {
            // ...原有自动播放逻辑...
        }
        
        // 停止自动播放
        function stopAutoPlay() {
            // ...原有停止逻辑...
        }
        
        // 初始化
        createCarouselItems();
        startAutoPlay();
        
        // 事件监听
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(currentIndex - 1);
            startAutoPlay();
        });
        
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(currentIndex + 1);
            startAutoPlay();
        });
        
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 启动轮播图
    document.addEventListener('DOMContentLoaded', () => {
        initCarousel().catch(error => {
            console.error('轮播图初始化失败:', error);
        });
    });

    // 获取现有轮播图元素
    const carousel = document.querySelector('.carousel-container');
    const slidesContainer = document.querySelector('.carousel-slides');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || !slidesContainer) {
        console.error('未找到轮播图容器');
        return;
    }

    // 清空现有内容
    slidesContainer.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';

    // 添加所有图片
    images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        // 从路径中提取文件名（不带后缀）
        const fileName = img.split('/').pop().split('.')[0];
        console.log('图片路径:', img, '提取的文件名:', fileName); // 调试日志
        slide.innerHTML = `<img src="${img}" alt="${fileName}" onerror="this.style.display='none'">`;
        slidesContainer.appendChild(slide);

        // 添加指示点
        if (dotsContainer) {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        }

        // 轮播图功能
        function goToSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        
            // 更新指示点
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        
            currentIndex = index;
        }

        // 自动轮播
        let intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }, 5000);

        // 鼠标悬停暂停
        carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carousel.addEventListener('mouseleave', () => {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                goToSlide(currentIndex);
            }, 5000);
        });

        // 上一张
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                goToSlide(currentIndex);
            });
        }

        // 下一张
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                goToSlide(currentIndex);
            });
        }
    });

    // 轮播图功能
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    // 创建指示器
    images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    // 切换到指定幻灯片
    function goToSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }

    // 上一张
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        });
    }

    // 下一张
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        });
    }

    // 自动轮播
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }, 5000);

    // 鼠标悬停暂停轮播
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // 鼠标离开恢复轮播
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }, 5000);
    });
});