# Quick Start

# FEATURES

## init
初始化app

### 初始化
1. app ready之后 开始创建窗口
2. createWindow
    + loadFile
    + webPreferences preload 预加载js脚本[在前]
    + index.html 文件中使用`script`标签引入的脚本[在后]

### 通信
`ipcMain` `ipcRenderer`
1. 主进程与渲染进程通信
2. 渲染进程与主进程通信
3. 渲染进程与渲染进程通信


#### 渲染进程向主进程
```js
/** send & on **/

// renderer
const { ipcRenderer } = require('electron');

// 同步返回值是 可以直接获取到主进程的响应值
ipcRenderer.sendSync('sync-event-name', params);

// 异步的返回值 还需要监听主进程的返回事件
// 有点回调风格的写法
ipcRenderer.send('async-event-name', params);
ipcRenderer.on('sync-event-reply', (event, args) => {

})


// main
const { ipcMain } = require('electron');

ipcMain.on('sync-event-name', (eventm ...params) => {
    event.returnValue = response;
})

ipcMain.on('async-event-name', (event, ...params) => {
    event.reply('async-event-reply', response);
})


/** invoke & handle **/

// renderer
const { ipcRenderer } = require('electron');
ipcRenderer
    .invoke('async-event-name', 'params')
    .then(res => {
        // response from the main
    })

// ipcMain
const { ipcMain } = require('electron');
ipcMain.handle('async-event-name', async (event, args) => {
    // 返回值是一个promise
    const result = await doSomeAsyncWork();
    return result
})

```

#### 主进程向渲染进程

## Notification
为应用程序添加通知信息

### 渲染进程添加

使用 H5 通知 API 触发，然后使用当前系统原生通知 API 来展示；不同操作系统可能不一样

### 主进程添加

使用 Electron 提供的`Notification`模块

## RecentUse

`app.addRecentDocument('path/to/file')`

在 docker 菜单中展示可以最近使用的文件，并且可以快速跳转

## 桌面捕获
### 屏幕分享
关键: 捕获到需要分享的窗口，将视频流分享出去
### 远程协作
关键：
    1. 屏幕分享
    2. 协作者对屏幕的操作