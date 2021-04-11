const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadFile('index.html');
}

function showNotification() {
    const notification = {
        title: '通知',
        body: '来自主进程的通知',
    };
    new Notification(notification).show();
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

app.addRecentDocument('./README.md');
