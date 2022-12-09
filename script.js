const html = document.querySelector('html')
const container = document.querySelector('#container')
container.addEventListener('mouseleave', () => mouseDown = false)

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

const btnFillBucket = document.querySelector('#fill-bucket');
btnFillBucket.addEventListener('click', () => {
    fillBucket ? (fillBucket = false) : (fillBucket = true);
})

const btnSetColor = document.querySelectorAll('.set-color')
for (const button of btnSetColor) {
    
    if (button.id === 'rainbow') {
        button.addEventListener('click', (e) => {
            rainbowPen = true;
            currentColor = randomColor();
        })
        continue;
    }

    button.setAttribute('style', `color: ${button.id};`)

    button.addEventListener('click', (e) => {
        rainbowPen = false;
        currentColor = e.target.id;
    })
}

let currentResolution = 16
let currentColor = 'black';
let rainbowPen = false;
let fillBucket = false


let mouseDown = false;

let randomColor = function() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function generateCanvas(res) {
    if (res === null || res <= 0 || !(Number.isInteger(parseInt(res)))) return;
    if (res > 80) res = 80;

    currentResolution = res;

    container.innerHTML = "";

    const pixelSize = 800 / res;
    const pixelNumber = res * res;

    for (let i = 0; i < pixelNumber; i++) {
        const pixel = document.createElement('div');
        pixel.setAttribute('id', `${i+1}`)
        pixel.style.cssText = `width: ${pixelSize}px; heigth: ${pixelSize}px; background-color: whitesmoke`;
        
        pixel.addEventListener('mousedown', (e) => {
            if (fillBucket) {
                colorFill(e.target.id, e.target.style.backgroundColor);
                return;
            }
            
            e.target.style.background = currentColor;
            mouseDown ? (mouseDown = false) : (mouseDown = true);
            if (rainbowPen === true) currentColor = randomColor();
        })
       
        pixel.addEventListener('mouseover', (e) => {
            if (mouseDown === true) {
                e.target.style.background = currentColor;
                if (rainbowPen === true) currentColor = randomColor();
            };
        });
        

        /*pixel.addEventListener('click', (e) => {
            colorFill(e.target.id, e.target.style.backgroundColor);
        });*/


        container.appendChild(pixel);
    }
}

function colorFill(startPixel, targetColor) {
    const fillArray = [parseInt(startPixel)];

    function checkPixel(id) {
        if (document.getElementById(`${id}`)) {
            var newPixel = document.getElementById(`${id}`);
        } else return;

        if (newPixel.style.backgroundColor === targetColor) {
            return fillArray.push(id);
        }
    }

    do {
        const id = fillArray[0];

        const pixel = document.getElementById(`${id}`);
        pixel.style.backgroundColor = currentColor;

        checkPixel(id - currentResolution);
        checkPixel(id + currentResolution);
        if (!(id % currentResolution === 0)) checkPixel(id + 1);
        if (!(id % currentResolution === 1)) checkPixel(id - 1);

        fillArray.shift();
    } while (fillArray.length > 0)

    return;
}

generateCanvas(16);