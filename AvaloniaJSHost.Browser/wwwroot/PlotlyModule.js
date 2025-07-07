
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
    });
    container.appendChild(plotDiv);
    parent.appendChild(container);

    // 4) Инициализация пустого графика
    Plotly.newPlot(plotDiv, [], {
        margin: { t: 20, b: 40, l: 40, r: 20 },
        xaxis: { title: 'X' },
        yaxis: { title: 'Y' }
    });

    // 5) Кнопка Очистить график
    const clearBtn = document.createElement('button');
    clearBtn.className = 'plotly-btn';
    clearBtn.textContent = 'Очистить';
    Object.assign(clearBtn.style, {
        position: 'absolute', top: '8px', right: '8px', zIndex: '10000'
    });
    clearBtn.addEventListener('click', e => {
        e.stopPropagation();
        Plotly.purge(plotDiv);
        Plotly.newPlot(plotDiv, [], {
            margin: { t: 20, b: 40, l: 40, r: 20 },
            xaxis: { title: 'X' },
            yaxis: { title: 'Y' }
        });
    });
    container.appendChild(clearBtn);

    // 6) Кнопка Нарисовать пример
    const drawBtn = document.createElement('button');
    drawBtn.className = 'plotly-btn';
    drawBtn.textContent = 'Нарисовать пример';
    Object.assign(drawBtn.style, {
        position: 'absolute', top: '8px', right: '80px', zIndex: '10000'
    });
    drawBtn.addEventListener('click', e => {
        e.stopPropagation();
        const exampleData = [{
            x: [0, 1, 2, 3, 4, 5],
            y: [2, 3, 5, 4, 7, 6],
            mode: 'lines+markers',
            marker: { size: 8 },
            line: { dash: 'dashdot' },
            name: 'Пример'
        }];
        const exampleLayout = {
            title: 'Пример графика',
            margin: { t: 40, b: 40, l: 40, r: 20 },
            xaxis: { title: 'X' },
            yaxis: { title: 'Y' }
        };
        Plotly.react(plotDiv, exampleData, exampleLayout);
    });
    container.appendChild(drawBtn);

    // 7) Автоматическое обновление случайными данными каждые 5 секунд
    setInterval(() => {
        const n = 50;
        const x = Array.from({ length: n }, (_, i) => i);
        const y = x.map(() => Math.random() * 10);
        const randomData = [{
            x,
            y,
            mode: 'lines',
            line: { simplify: false },
            name: 'Случайные данные'
        }];
        const randomLayout = {
            title: 'Автообновление каждые 5 секунд',
            margin: { t: 40, b: 40, l: 40, r: 20 },
            xaxis: { title: 'X' },
            yaxis: { title: 'Y' }
        };
        Plotly.react(plotDiv, randomData, randomLayout);
    }, 5000);

    return plotDiv;
}

export function ClearPlot(plotDiv) {
    Plotly.purge(plotDiv);
}
