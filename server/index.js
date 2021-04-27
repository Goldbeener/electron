const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8090 });
const code2Ws = new Map();

wss.on('connection', function connection(ws, request){
    // 分配client code
    const code = Math.floor(Math.random() * (999999 - 10000)) + 100000;
    code2Ws.set(code, ws);

    console.log('>>>> ws connection', request);
    const ip = request.connection.remoteAddress.replace('::ffff:', '');
    console.log('>>>> connect ip', ip);

    // 常用方法封装
    ws.sendData = (event, data) => {
        ws.send(JSON.stringify({ event, data }));
    }
    ws.sendError = msg => {
        ws.sendData('error', { msg });
    }

    // 收到消息
    ws.on('message', function incoming(message){

        console.log('>>>> incoming message', message);
        // 消息处理 默认消息格式为 { event, data } 结构的字符串
        let parsedMessage = {};
        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            console.log('>>>> message parse fail', error);
            ws.sendError('message is not valid');
            return;
        }

        // 根据event类型处理不同的逻辑
        let { event, data } = parsedMessage;
        if (event === 'login') {
            // 登陆 分配code
            ws.sendData('logined', { code });
        } else if (event === 'control') {
            // 控制 找到傀儡 并发送控制提示
            const remote = +data.remote;
            if (code2Ws.has(remote)) {
                ws.sendData('controlled', { remote });
                // 通知傀儡
                let remoteWs = code2Ws.get(remote);
                ws.sendRemote = remoteWs.sendData;
                remoteWs.sendRemote = ws.sendData;
                ws.sendRemote('be-controlled', { remote: code })
            } else {
                ws.sendError('user not found');
            }
        } else if (event === 'forward') {
            ws.sendRemote(data.event, data.data);
        } else {
            ws.sendError('message not handle', message);
        }

    })

    // 关闭
    ws.on('close', function close(err) {
        code2Ws.delete(code);
        delete ws.sendRemote;
        clearTimeout(ws._closeTimeout);
    })

    ws._closeTimeout = setTimeout(() => {
        ws.terminate();
    }, 10 * 60 * 1000);
})