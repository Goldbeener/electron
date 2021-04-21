const { ipcMain } = require('electron');

// 主进程异步响应
ipcMain.on('async-message', (event, ...args) => {
    console.log('异步请求参数', args);
    setTimeout(() => {
        event.reply('async-reply', 'pong-async')
    }, 500)
})

// 主进程同步响应
ipcMain.on('sync-message', (event, ...args) => {
    console.log('同步请求参数', args);
    event.returnValue = 'pong-sync'
})
