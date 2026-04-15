// 雨滴效果核心代码
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    if (!rainContainer) return;
    
    // 清空容器，防止重复生成导致雨滴重叠变多
    rainContainer.innerHTML = '';
    const dropCount = 50; // 雨滴数量，可根据性能调整
    
    for (let i = 0; i < dropCount; i++) {
        const raindrop = document.createElement('div');
        const sizes = ['small', 'medium', 'large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        raindrop.classList.add('raindrop', size);
        
        // 1. 随机水平位置 (0 - 100vw)
        raindrop.style.left = Math.random() * 100 + 'vw';
        
        // 2. 随机动画时长 (速度) - 保持你喜欢的舒缓速度
        // 1s 到 3s 之间
        const duration = 1 + Math.random() * 2;
        raindrop.style.animationDuration = duration + 's';
        
        // 3. 【核心修改】使用负延迟
        // 生成 -5s 到 0s 之间的随机数
        // 这会让雨滴在页面加载时，直接从动画的中间进度开始播放
        // 这样看起来雨滴就已经分布在屏幕各处了，而不是都在头顶
        const delay = Math.random() * -5;
        raindrop.style.animationDelay = delay + 's';
        
        // 确保动画属性被正确应用
        raindrop.style.animationName = 'rain';
        raindrop.style.animationTimingFunction = 'linear';
        raindrop.style.animationIterationCount = 'infinite';

        rainContainer.appendChild(raindrop);
    }
}

// 生成涟漪
function createRipple() {
    const rainContainer = document.getElementById('rainContainer');
    if (!rainContainer) return;
    
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = Math.random() * 80 + 'vw';
    ripple.style.top = '95vh'; // 底部位置
    ripple.style.animationName = 'ripple';
    ripple.style.animationDuration = '1.5s';
    ripple.style.animationTimingFunction = 'ease-out';
    
    rainContainer.appendChild(ripple);
    
    // 动画结束后删除元素，防止内存泄漏
    setTimeout(() => ripple.remove(), 1500);
}

// 强制初始化函数
function forceInitializeRain() {
    const rainContainer = document.getElementById('rainContainer');
    if (rainContainer) {
        rainContainer.style.display = 'block';
        createRain();
        
        // 定时生成涟漪
        setInterval(() => {
            createRipple();
        }, 800);
    }
}

// 多重保险：确保页面加载、刷新、或从缓存恢复时都能运行
document.addEventListener('DOMContentLoaded', forceInitializeRain);
window.addEventListener('load', forceInitializeRain);
window.addEventListener('pageshow', function(e) {
    if (e.persisted) forceInitializeRain();
});
// 兜底执行
setTimeout(forceInitializeRain, 50);