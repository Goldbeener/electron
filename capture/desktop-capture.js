const { desktopCapturer } = require('electron');

desktopCapturer
    .getSources({
        types: ['screen', 'window'],
    })
    .then(async (sources) => {
        // 获取到当前系统中所有的屏幕【包括外接显示屏】展示的所有应用程序窗口
        console.log('🚀🚀🚀  video 源 source', sources);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: sources[1].id, // 指定窗口作为video源
                        minWidth: 1280,
                        maxWidth: 1280,
                        minHeight: 720,
                        maxHeight: 720,
                    },
                },
            });
            handleStream(stream);
        } catch (error) {
            console.log('🚀🚀🚀 ~ window.addEventListener ~ error', error);
        }
    })
    .catch((error) => {
        console.log('capture 失败');
    });

// 将捕获到的视频源展示在页面中
function handleStream(stream) {
    const videoEl = document.querySelector('#video');
    console.log('🚀🚀🚀 ~ handleStream ~ videoEl', videoEl);
    videoEl.srcObject = stream;
    videoEl.onloadedmetadata = () => videoEl.play();
}

/**  
 * 屏幕分享
        只是简单的将当前选中的屏幕分享给他人
 * 远程协助
        1.将屏幕分享给他人
        2.并且他人可以直接操控分享人的屏幕
*/
