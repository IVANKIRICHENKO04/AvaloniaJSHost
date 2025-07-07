// PlotlyModule.js
export function AddPlotlyElement(parent) {
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
        userSelect: 'none',
        background: '#fff'
    });
    parent.appendChild(container);

    // 2) Стили кнопок
    const style = document.createElement('style');
    style.textContent = `
    .plotly-btn {
      background: white;
      border: 1px solid #666;
      border-radius: 3px;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
    }
    .plotly-btn:hover { background: #007bff; color: white; }
    .plotly-btn:active { background: #0056b3; color: white; }
  `;
    container.appendChild(style);

    // 3) Див для Plotly
    const plotDiv = document.createElement('div');
    Object.assign(plotDiv.style, {
        width: '100%',
        height: '100%',
        pointerEvents: 'auto'      // чтобы сам div принимал события
    });
    container.appendChild(plotDiv);

    // 4) инициализируем Plotly
    Plotly.newPlot(plotDiv, [], {
        margin: { t: 20, b: 40, l: 40, r: 20 },
        xaxis: { title: 'X' },
        yaxis: { title: 'Y' }
    });

    // 5) Кнопки “Очистить” и “Нарисовать”
    const clearBtn = document.createElement('button');
    clearBtn.className = 'plotly-btn';
    clearBtn.textContent = 'Очистить';
    Object.assign(clearBtn.style, {
        position: 'absolute', top: '8px', right: '8px', zIndex: '10000'
    });
    clearBtn.addEventListener('click', e => {
        e.stopPropagation(); e.preventDefault();
        Plotly.purge(plotDiv);
        Plotly.newPlot(plotDiv, [], {
            margin: { t: 20, b: 40, l: 40, r: 20 },
            xaxis: { title: 'X' }, yaxis: { title: 'Y' }
        });
    });
    container.appendChild(clearBtn);

    const drawBtn = document.createElement('button');
    drawBtn.className = 'plotly-btn';
    drawBtn.textContent = 'Нарисовать пример';
    Object.assign(drawBtn.style, {
        position: 'absolute', top: '8px', right: '80px', zIndex: '10000'
    });
    drawBtn.addEventListener('click', e => {
        e.stopPropagation(); e.preventDefault();
        const data = [{ x: [0, 1, 2, 3, 4, 5], y: [2, 3, 5, 4, 7, 6], mode: 'lines+markers' }];
        Plotly.react(plotDiv, data, { title: 'Пример графика' });
    });
    container.appendChild(drawBtn);

    // 6) Авто‑обновление
    setInterval(() => {
        const n = 50, x = [...Array(n).keys()], y = x.map(() => Math.random() * 10);
        Plotly.react(plotDiv, [{ x, y, mode: 'lines' }], { title: 'Каждые 5 сек' });
    }, 5000);

    // 7) Блокировка air‑space: при входе/выходе мыши
    const avaloniaCanvas = document.querySelector('canvas');
    const onEnter = () => avaloniaCanvas.style.pointerEvents = 'none';
    const onLeave = () => avaloniaCanvas.style.pointerEvents = 'auto';
    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);

    // 8) Обработка pointer/mouse точно так же, как в AddElement()
    let isDragging = false;
    container.addEventListener('pointerdown', e => {
        e.stopPropagation(); e.preventDefault();
        isDragging = true;
    });
    container.addEventListener('pointermove', e => {
        if (!isDragging) return;
        e.stopPropagation(); e.preventDefault();
        // здесь можно, например, запускать кастомное рисование по Plotly.js API
        // или передавать координаты куда надо:
        // const coords = { x:e.clientX, y:e.clientY };
    });
    ['pointerup', 'pointerleave'].forEach(evt =>
        container.addEventListener(evt, e => {
            isDragging = false;
            e.stopPropagation(); e.preventDefault();
        })
    );

    return plotDiv;
}

export function ClearPlot(plotDiv) {
    Plotly.purge(plotDiv);
}
