// 动态加载选项卡内容
function loadTabContent(tabId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            console.log(`成功加载 ${filePath}:`, text);
            const contentElement = document.querySelector(`#${tabId} .content`);
            if (contentElement) {
                contentElement.textContent = text;
            }
        })
        .catch(error => {
            console.error(`加载 ${filePath} 失败:`, error);
            const contentElement = document.querySelector(`#${tabId} .content`);
            if (contentElement) {
                contentElement.textContent = `内容加载失败: ${error.message}`;
            }
        });
}