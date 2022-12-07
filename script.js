const container = document.querySelector('#container')

function generateCanvas(res) {
    const pixelSize = 800 / res;
    const pixelNumber = res * res;

    for (let i = 0; i < pixelNumber; i++) {
        const pixel = document.createElement('div');
        pixel.style.cssText = `width: ${pixelSize}px; heigth: ${pixelSize}px;`;
        //pixel.textContent = `${i+1}`
        container.appendChild(pixel);
    }
}

generateCanvas(16);