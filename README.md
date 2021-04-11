# Quick Start

# FEATURES

## Notification

为应用程序添加通知信息

### 渲染进程添加

使用 H5 通知 API 触发，然后使用当前系统原生通知 API 来展示；不同操作系统可能不一样

### 主进程添加

使用 Electron 提供的`Notification`模块

## RecentUse

`app.addRecentDocument('path/to/file')`

在 docker 菜单中展示可以最近使用的文件，并且可以快速跳转
