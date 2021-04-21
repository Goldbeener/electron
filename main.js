const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const showNotification = require('./notification');
require('./ipc/main');

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // 预加载脚本
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();
}



async function main() {
    await app.whenReady();

    createWindow();

    // 程序激活后没有可见窗口 才创建新的窗口
    // 首次启动或者重启
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    // 程序没有任何打开的窗口的时候 尝试退出
    app.on('window-all-closed', () => {
        // macos 无效  macos判断方式
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    app.addRecentDocument('./README.md');

    // 回调函数的返回值 传递给渲染进程调用方
    ipcMain.handle('platform-action-fb', async (event, args) => {
        // 主进程唤起notification
        const opts = {
            title: 'hello title'
        };

        return await showNotification(opts);
    })

    // 回调函数的返回值 传递给渲染进程调用方
    ipcMain.handle('platform-action', async (event, args) => {
        // 主进程做画面捕获
        return await desktopCapturer.getSources({
            types: ['window', 'screen'],
        })
    })
}
main();




