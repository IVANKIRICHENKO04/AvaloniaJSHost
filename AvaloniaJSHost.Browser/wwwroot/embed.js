
/////////////////////////////////////////////// Локальное видео ////////////////////////////////////////////////

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

/////////////////////////////////////////////// Поток flv ////////////////////////////////////////////////


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


/////////////////////////////////////////////// Поток YouTube ////////////////////////////////////////////////


//export function AddElement(parent) {
//    // 1) Создаём контейнер
//    const container = document.createElement('div');
//    Object.assign(container.style, {
//        border: '2px dashed blue',
//        borderRadius: '6px',
//        padding: '8px',
//        width: '640px',
//        height: '360px',
//        boxSizing: 'border-box',
//        overflow: 'hidden',
//        position: 'relative',
//        backgroundColor: '#000'
//    });

//    // 2) Создаём iframe для YouTube
//    const iframe = document.createElement('iframe');
//    // Замените на ID вашего YouTube-ролика или трансляции
//    const videoId = 'M7lc1UVf-VE';
//    iframe.src = `https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&controls=1&rel=0`;
//    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
//    iframe.allowFullscreen = true;
//    Object.assign(iframe.style, {
//        width: '100%',
//        height: '100%',
//        border: 'none',
//        display: 'block'
//    });

//    // 3) Добавляем iframe в контейнер и контейнер в parent
//    container.appendChild(iframe);
//    parent.appendChild(container);

//    // 4) Возвращаем iframe для управления из .NET/JSInterop
//    return iframe;
//}



/////////////////////////////////////////////// JSMpeg‑плеер ////////////////////////////////////////////////


//export function AddElement(parent) {
//    const container = document.createElement('div');
//    Object.assign(container.style, {
//        border: '2px dashed blue',
//        borderRadius: '6px',
//        padding: '8px',
//        width: '640px',
//        height: '360px',
//        boxSizing: 'border-box',
//        overflow: 'hidden',
//        backgroundColor: '#000'
//    });

//    const canvas = document.createElement('canvas');
//    Object.assign(canvas.style, {
//        width: '100%',
//        height: '100%',
//        display: 'block'
//    });
//    container.appendChild(canvas);
//    parent.appendChild(container);

//    // URL вашего ffmpeg HTTP‑сервера
//    const streamUrl = 'http://localhost:8081';

//    // Инициализируем JSMpeg‑плеер
//    const player = new JSMpeg.Player(streamUrl, {
//        canvas: canvas,
//        autoplay: true,
//        audio: false,
//        loop: false,
//        progressive: true    // важно для HTTP потока
//    });

//    return player;
//}


/////////////////////////////////////////////// 3D-сцена ////////////////////////////////////////////////


//export function AddElement(parent) {
//    // --- Контейнер и рендерер ---
//    const container = document.createElement('div');
//    container.style.width = '100%';
//    container.style.height = '100%';
//    container.style.position = 'relative';
//    parent.appendChild(container);

//    const renderer = new THREE.WebGLRenderer({ antialias: true });
//    renderer.setSize(container.clientWidth, container.clientHeight);
//    container.appendChild(renderer.domElement);

//    // --- Сцена и камера ---
//    const scene = new THREE.Scene();
//    const camera = new THREE.PerspectiveCamera(
//        75,
//        container.clientWidth / container.clientHeight,
//        0.1,
//        1000
//    );
//    camera.position.z = 5;

//    // --- Объекты: куб и сфера ---
//    const cubeGeometry = new THREE.BoxGeometry();
//    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
//    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//    cube.position.x = -2;
//    scene.add(cube);

//    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
//    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
//    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//    sphere.position.x = 2;
//    scene.add(sphere);

//    // --- Освещение ---
//    const light = new THREE.PointLight(0xffffff, 1, 100);
//    light.position.set(0, 5, 5);
//    scene.add(light);

//    // --- Флаг и анимация куба ---
//    let cubeRotationActive = false;
//    function animateCube() {
//        if (cubeRotationActive) {
//            cube.rotation.x += 0.01;
//            cube.rotation.y += 0.01;
//            renderer.render(scene, camera);
//            requestAnimationFrame(animateCube);
//        }
//    }

//    // --- Рендер сцены ---
//    function renderScene() {
//        renderer.render(scene, camera);
//    }
//    renderScene();

//    // --- Обработчики событий ---
//    container.addEventListener('keydown', (event) => {
//        let needRender = false;
//        switch (event.key) {
//            case 'ArrowLeft':
//                scene.rotation.y -= 0.1; needRender = true; break;
//            case 'ArrowRight':
//                scene.rotation.y += 0.1; needRender = true; break;
//            case 'ArrowUp':
//                scene.rotation.x -= 0.1; needRender = true; break;
//            case 'ArrowDown':
//                scene.rotation.x += 0.1; needRender = true; break;
//        }
//        if (needRender) renderScene();
//    });

//    container.addEventListener('contextmenu', e => e.preventDefault());

//    container.addEventListener('mousedown', (event) => {
//        const rect = renderer.domElement.getBoundingClientRect();
//        const mouse = new THREE.Vector2(
//            ((event.clientX - rect.left) / rect.width) * 2 - 1,
//            -((event.clientY - rect.top) / rect.height) * 2 + 1
//        );
//        const raycaster = new THREE.Raycaster();
//        raycaster.setFromCamera(mouse, camera);
//        const intersects = raycaster.intersectObjects([cube], true);

//        if (intersects.length && intersects[0].object === cube) {
//            if (event.button === 0) {
//                cube.material.color.setHex(Math.random() * 0xffffff);
//                renderScene();
//            } else if (event.button === 2) {
//                cubeRotationActive = !cubeRotationActive;
//                if (cubeRotationActive) animateCube();
//                else renderScene();
//            }
//        }
//    });

//    window.addEventListener('resize', () => {
//        const w = container.clientWidth;
//        const h = container.clientHeight;
//        camera.aspect = w / h;
//        camera.updateProjectionMatrix();
//        renderer.setSize(w, h);
//        renderScene();
//    });

//    // Чтобы контейнер уловил фокус для стрелок
//    container.tabIndex = 0;
//    container.style.outline = 'none';
//    container.focus();

//    // --- Возвращаем API для внешнего управления ---
//    return {
//        scene,
//        camera,
//        renderer,
//        cube,
//        sphere,
//        startCubeRotation: () => {
//            cubeRotationActive = true;
//            animateCube();
//        },
//        stopCubeRotation: () => {
//            cubeRotationActive = false;
//            renderScene();
//        },
//        render: renderScene
//    };
//}