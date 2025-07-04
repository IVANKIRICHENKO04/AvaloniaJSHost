export function AddElement(parent) {
    // 1) Контейнер
    const container = document.createElement('div');
    Object.assign(container.style, {
        border: '2px dashed green',
        borderRadius: '6px',
        padding: '8px',
        width: '640px',
        height: '360px',
        boxSizing: 'border-box',
        position: 'relative',
        pointerEvents: 'auto',
        zIndex: '9999',
        userSelect: 'none'
    });

    // 2) Стили кнопок через <style>
    const style = document.createElement('style');
    style.textContent = `
      .contrast-btn {
        background: white;
        border: 1px solid #666;
        border-radius: 3px;
        padding: 4px 8px;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
      }
      .contrast-btn:hover { background: blue; color: white; }
      .contrast-btn:active { background: green; color: white; }
    `;
    container.appendChild(style);

    // 3) <canvas>
    const canvas = document.createElement('canvas');
    canvas.width = 624;
    canvas.height = 344;
    Object.assign(canvas.style, {
        display: 'block',
        backgroundColor: '#fff',
        cursor: 'crosshair',
        pointerEvents: 'auto'
    });
    container.appendChild(canvas);
    parent.appendChild(container);

    // 4) Контекст
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    // 5) Координаты внутри canvas
    function getLocalCoords(e) {
        const r = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - r.left) * (canvas.width / r.width),
            y: (e.clientY - r.top) * (canvas.height / r.height)
        };
    }

    // 6) Логика рисования пользователем
    let drawing = false;
    let last = { x: 0, y: 0 };
    function startDraw(e) {
        e.preventDefault();
        drawing = true;
        last = getLocalCoords(e);
    }
    function doDraw(e) {
        if (!drawing) return;
        const cur = getLocalCoords(e);
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(cur.x, cur.y);
        ctx.stroke();
        last = cur;
    }
    function stopDraw() {
        drawing = false;
    }

    ['pointerdown', 'mousedown'].forEach(evt => canvas.addEventListener(evt, startDraw));
    ['pointermove', 'mousemove'].forEach(evt => canvas.addEventListener(evt, doDraw));
    ['pointerup', 'mouseup', 'pointerleave', 'mouseleave'].forEach(evt => canvas.addEventListener(evt, stopDraw));

    // 7) Кнопка Очистить
    const clearBtn = document.createElement('button');
    clearBtn.className = 'contrast-btn';
    clearBtn.textContent = 'Очистить';
    Object.assign(clearBtn.style, { position: 'absolute', top: '8px', right: '8px', zIndex: '10000' });
    function clearCanvas(e) {
        e.stopPropagation();
        e.preventDefault();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    ['click', 'pointerup', 'mouseup'].forEach(evt => clearBtn.addEventListener(evt, clearCanvas));
    container.appendChild(clearBtn);

    // 8) Кнопка Нарисовать пример
    const drawBtn = document.createElement('button');
    drawBtn.className = 'contrast-btn';
    drawBtn.textContent = 'Нарисовать';
    Object.assign(drawBtn.style, { position: 'absolute', top: '8px', right: '80px', zIndex: '10000' });
    function drawExample(e) {
        e.stopPropagation();
        e.preventDefault();
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.fillRect(50, 50, 200, 150);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(50, 50, 200, 150);
    }
    ['click', 'pointerup', 'mouseup'].forEach(evt => drawBtn.addEventListener(evt, drawExample));
    container.appendChild(drawBtn);

    // 9) Автоматическое рисование случайных прямоугольников каждые 5 секунд
    setInterval(() => {
        // Случайные размеры и позиция
        const w = Math.random() * (canvas.width / 2);
        const h = Math.random() * (canvas.height / 2);
        const x = Math.random() * (canvas.width - w);
        const y = Math.random() * (canvas.height - h);
        // Случайный цвет (полупрозрачный)
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x, y, w, h);
    }, 5000);

    return canvas;
}

export function ClearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

