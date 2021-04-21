const { desktopCapturer } = require('electron');

desktopCapturer
    .getSources({
        types: ['screen', 'window'],
    })
    .then(async sources => {
        for (const source of sources) {
            if (source.name !== 'Kim') continue;
            console.log('🚀🚀🚀  video 源 source', source);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: source.id,
                        minWith: 1280,
                        maxWidth: 1280,
                        minHeight: 720,
                        maxHeight: 720,
                    }
                });
                handleStream(stream)
            } catch (error) {
                console.log('🚀🚀🚀 ~ window.addEventListener ~ error', error);
            }
        }
    })

function handleStream (stream) {
    const videoEl = document.querySelector('#video');
    console.log('🚀🚀🚀 ~ handleStream ~ videoEl', videoEl);
    videoEl.srcObject = stream;
    videoEl.onloadedmetadata = () => videoEl.play();
}