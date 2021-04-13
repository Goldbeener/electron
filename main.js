const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');
let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();
}

function showNotification() {
    const options = {
        title: '通知',
        body: '来自主进程的通知',
        // actions: [{ type: 'button', text: '确定'}, { type: 'button', text: '知道了'}],
        actions: [{ type: 'button', text: '知道了'}, { type: 'button', text: '确定'}],
        closeButtonText: '关闭',
    };
    const notification = new Notification(options);

    // 注意这些信息是主进程的，因此日志信息是打印在命令行内的
    // 渲染进程的日志 才会输出在应用控制台
    notification.on('click', (event, arg) => {
        console.log('click>>>>', event, arg);
    })

    notification.on('close', (event, arg) => {
        console.log('close>>>>', event, arg);
    })

    notification.on('action', (event, index) => {
        console.log('action>>>>', event, index);
    })
    notification.show();
}

app.whenReady()
    .then(() => {
        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    })
    .then(showNotification);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app
app.addRecentDocument('./README.md');
