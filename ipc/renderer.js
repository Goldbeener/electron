const { ipcRenderer } = require('electron');

const res = ipcRenderer.sendSync('sync-message', 'ping-sync', 'ping2-sync')
console.log('同步响应>>>>', res);

ipcRenderer.on('async-reply', (event, args) => {
    console.log('异步响应>>>>', args);
})

ipcRenderer.send('async-message', 'ping-async', 'ping2-async');
console.log('>>> 这个应该在异步响应之前');

