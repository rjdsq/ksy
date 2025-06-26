// 选项卡切换功能
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content, #message');

    // 检查是否找到元素
    if (!tabButtons.length || !tabContents.length) {
        console.error('未找到选项卡按钮或内容元素');
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮和内容的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 为当前按钮和对应内容添加active类
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const targetTab = document.getElementById(tabId);
            
            if (targetTab) {
                targetTab.classList.add('active');
            } else {
                console.error(`未找到ID为${tabId}的选项卡内容`);
            }
        });
    });
}