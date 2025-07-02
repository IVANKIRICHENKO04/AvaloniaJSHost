//import flvjs from 'https://cdn.jsdelivr.net/npm/flv.js@latest/dist/flv.min.js';



//export function AddElement(parent) {
//    const container = document.createElement('div');
//    container.style.border = '2px dashed blue';
//    container.style.borderRadius = '6px';
//    container.style.padding = '8px';
//    container.style.width = '640px';
//    container.style.height = '360px';
//    container.style.boxSizing = 'border-box';

//    const video = document.createElement('video');
//    video.controls = true;            // показывать контролы
//    video.style.width = '100%';
//    video.style.height = '100%';
//    video.style.display = 'block';
//    video.style.backgroundColor = '#000';          // чтобы сразу был виден чёрный фон
//    video.src = 'video.mp4';
//    video.load();

//    container.appendChild(video);
//    parent.appendChild(container);

//    // Возвращаем video, чтобы из .NET через JSInterop можно было менять его свойства
//    return video;
//}



export function AddElement(parent) {
    // 1) Создаём контейнер
    const container = document.createElement('div');
    Object.assign(container.style, {
        border: '2px dashed blue',
        borderRadius: '6px',
        padding: '8px',
        width: '640px',
        height: '360px',
        boxSizing: 'border-box',
        overflow: 'hidden'
    });

    // 2) Создаём video (без src)
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    Object.assign(video.style, {
        width: '100%',
        height: '100%',
        display: 'block',
        backgroundColor: '#000'
    });

    container.appendChild(video);
    parent.appendChild(container);

    // 3) URL FLV‑видео
    const flvUrl = 'https://docs.evostream.com/sample_content/assets/bun33s.flv';

    // 4) Инициализируем flv.js
    if (flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: flvUrl
        });
        flvPlayer.attachMediaElement(video);
        flvPlayer.load();
        flvPlayer.play();
    } else {
        // на крайний случай — попробуем просто указать src
        video.src = flvUrl;
        video.load();
        video.play().catch(err => {
            console.error('FLV.js не поддерживается, видео не стартовало:', err);
        });
    }

    // возвращаем video для .NET/JSInterop
    return video;
}