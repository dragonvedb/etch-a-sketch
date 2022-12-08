const container = document.querySelector('#container')

const btnNewCanvas = document.querySelector('#new-canvas')
btnNewCanvas.addEventListener('click', () => {
    generateCanvas(prompt("HOW BIG?"));
})

const btnReset = document.querySelector('#reset')
btnReset.addEventListener('click', () => generateCanvas(currentResolution))

const btnSetCanvas = document.querySelectorAll('.set-canvas')
for (const button of btnSetCanvas) {
    button.addEventListener('click', (e) => {
        generateCanvas(e.target.id);
    })
}

const btnSetColor = document.querySelectorAll('.set-color')
for (const button of btnSetColor) {
    button.setAttribute('style', `color: ${button.id};`)

    button.addEventListener('click', (e) => {
        currentColor = e.target.id;
    })
}

let currentResolution = 16
let currentColor = 'black';

function generateCanvas(res) {
    if (res === null || res <= 0 || !(Number.isInteger(parseInt(res)))) return;
    if (res > 80) res = 80;

    currentResolution = res;

    container.innerHTML = "";

    const pixelSize = 800 / res;
    const pixelNumber = res * res;

    for (let i = 0; i < pixelNumber; i++) {
        const pixel = document.createElement('div');
        pixel.style.cssText = `width: ${pixelSize}px; heigth: ${pixelSize}px;`;

        pixel.addEventListener('mouseover', (e) => {
            e.target.style.background = currentColor;
        });

        container.appendChild(pixel);
    }
}

generateCanvas(16);