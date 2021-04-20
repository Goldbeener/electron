function showNotification(Notification, opts) {
    const res = new Promise((resolve, reject) => {
        const options = {
            title: '通知',
            body: '来自主进程的通知',
            actions: [ //参数类型是list 但是在macos只有第一个参数有效
                { type: 'button', text: '收到2'}, 
                { type: 'button', text: '确定'}
            ], 
            closeButtonText: '关闭',
            ...opts,
        };
        const notification = new Notification(options);

        // 注意这些信息是主进程的，因此日志信息是打印在命令行内的
        // 渲染进程的日志 才会输出在应用控制台
        notification.on('click', (event, arg) => {
            resolve('click');
        })

        notification.on('close', (event, arg) => {
            resolve('close');
        })

        notification.on('action', (event, index) => {
            resolve('action');
        })
        notification.show();
    })
    return res;
}

module.exports = showNotification;