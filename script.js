const container = document.querySelector('#container')

const btnNewCanvas = document.querySelector('#newCanvas')
btnNewCanvas.addEventListener('click', () => {
    generateCanvas(prompt("HOW BIG?"));
})

function generateCanvas(res) {
    if (res === null || res <= 0 || !(Number.isInteger(parseInt(res)))) return;
    if (res > 80) res = 80;

    container.innerHTML = "";

    const pixelSize = 800 / res;
    const pixelNumber = res * res;

    for (let i = 0; i < pixelNumber; i++) {
        const pixel = document.createElement('div');
        pixel.style.cssText = `width: ${pixelSize}px; heigth: ${pixelSize}px;`;

        pixel.addEventListener('mouseover', (e) => {
            e.target.style.background = 'black';
        });

        container.appendChild(pixel);
    }
}

generateCanvas(16);