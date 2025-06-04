'use strict';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// GLOBALS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Adds center point coordinates (x and y)
let x = canvas.width / 2;
let y = canvas.height / 2;




// shortcuts for forms
let shapesForm = document.forms.options;
let sizeForm = document.forms.size;

// init
window.addEventListener("load", drawShape);
// window.addEventListener("load", calculateSize);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// EVENT LISTENTERS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
shapesForm.addEventListener('change', drawShape)
sizeForm.addEventListener('change', drawShape)
document.querySelector('#calculate').addEventListener('click', calculateSize);


// grabbing the value of the radius


sizeForm.addEventListener('change', () => {
    // select the range value 
    let radius = document.querySelector('#radius').value;
    let width = document.querySelector('#width').value;
    let height = document.querySelector('#height').value;

    document.querySelector('.radius-number').textContent = radius;

    // for width
    if (width > 300) {
        console.log('too high');
        document.querySelector('#width').value = 300;
    } else if (width < 0) {
        console.log('too low');
        document.querySelector('#width').value = 0;
    }
    // for height
    if (height > 300) {
        console.log('too high');
        document.querySelector('#height').value = 300;
    } else if (height < 0) {
        console.log('too low');
        document.querySelector('#height').value = 0;
    }
    console.log(width, parseInt(height));

})



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// DRAW SHAPE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function drawShape(event) {
    // KEEPS FORM FROM SUBMITTING AT THIS POINT
    event.preventDefault();
    // CLEARS PREVIOUS DRAWING FROM CANVAS ELEMENT
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setColor();
    showBorder();

    // @TO-DO: GRAB THE VALUE OF THE SELECTED SHAPE
    let shape = shapesForm.shape.value;
    let radius = document.querySelector('#radius').value;
    let width = sizeForm.width.value;
    let height = sizeForm.height.value;


    console.log(shape);

    switch (shape) {
        case 'circle':
            drawCircle();
            console.log(radius);
            break;
        case 'triangle':
            drawTriangle();
            console.log(height, width);
            break;
        case 'square':
            drawSquare();
            console.log(width, height);
            break;
        case 'rectangle':
            drawRectangle();
            console.log(width, height);
            break;
        default:
            break;
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// DRAWING OPTIONS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function setColor() {
    ctx.fillStyle = document.forms.options.color.value;
}
function showBorder() {
    if (shapesForm.border.checked) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
    } else {
        ctx.lineWidth = 0;
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// DRAW EACH KIND OF SHAPE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function drawCircle() {
    let r = sizeForm.radius.value
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 360);
    ctx.fill();
    if (shapesForm.border.checked) {
        ctx.stroke();
    }


}
function drawTriangle() {
    let w = sizeForm.width.value
    let h = sizeForm.height.value

    // First path
    ctx.beginPath();
    ctx.moveTo(x, y - h / 2);
    ctx.lineTo(x - w / 2, y + h / 2);
    ctx.lineTo(x + w / 2, y + h / 2);
    ctx.closePath();
    ctx.fill();

    if (shapesForm.border.checked) {
        ctx.stroke();
    }


}

function drawSquare() {
    let w = sizeForm.width.value;
    ctx.fillRect(x - w / 2, y - w / 2, w, w);

    if (shapesForm.border.checked) {
        ctx.strokeRect(x - w / 2, y - w / 2, w, w);
    }

}

function drawRectangle() {
    let w = sizeForm.width.value;
    let h = sizeForm.height.value;
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
    if (shapesForm.border.checked) {
        ctx.strokeRect(x - w / 2, y - h / 2, w, h);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// CALCULATE SIZE OF AREA AND PERIMETER
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function calculateSize(event) {
    // KEEPS FORM FROM SUBMITTING AT THIS POINT
    event.preventDefault();
    // get current shape, radius, width/base, height
    let shape = shapesForm.shape.value;
    let radius = document.querySelector('#radius').value;
    radius = parseInt(radius)
    let width = parseInt(sizeForm.width.value);
    let height = parseInt(sizeForm.height.value);



    // create variables to hold the calculated area and perimeter
    let area = 0;
    let perimeter = 0;
    // calculate the area and perimeter of the current shape
    if (shape == 'circle') {
        // area is pi * radius squared
        area = Math.PI * Math.pow(radius, 2)
        perimeter = 2 * Math.PI * radius;
    } else if (shape == 'triangle') {
        // area of a triangle is (h * b) / 2
        area = (width * height) / 2;
        console.log(area);

        console.log('width is: ', width);
        // pythagorean theorem to find the length of one slanted side 
        let side = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height, 2));
        // perimeter of a triangele 
        perimeter = 2 * side + width;
    } else if (shape == 'square') {
        area = width * width;
        perimeter = 4 * width;
    } else if (shape == 'rectangle') {
        area = width * height;
        perimeter = 2 * (width + height)
    }
    // update the interface to display the area and perimeter
    // for toFixed documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    area = area.toFixed(2)
    console.log(area);
    perimeter = perimeter.toFixed(2)
    document.querySelector('#size').innerHTML =
        `shape area: ${area} px<sup>2</sup>
    <br>shape perimeter: ${perimeter} px</p>
    `;

    console.log(area);
    console.log(perimeter);
}

