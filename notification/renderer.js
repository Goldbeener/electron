const myNotification = new Notification('通知', {
    body: '来自渲染进程的通知',
});

myNotification.onclick = () => {
    console.log('点击通知信息');
};
