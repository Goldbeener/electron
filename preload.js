// 普通的js脚本
// 其中注入了一些全局变量 例如 process
// 在程序网页加载的时候 预加载，可以做一些处理

const {ipcRenderer} = require('electron'); 

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }

    const oBtn = document.getElementById('btn');
    oBtn.addEventListener('click', async () => {
        const res = await ipcRenderer.invoke('platform-action', 'asss');        
    })
}); 
