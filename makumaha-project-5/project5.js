// globals for setup
const canvas = document.querySelector('#sketch');
const ctx = canvas.getContext('2d');
const MOVE_AMOUNT = 50;
let isDrawing = false;

// globals for drawing
const { width, height } = canvas;
let x = canvas.width / 2;
let y = canvas.height / 2;
let choice = 'black';

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
// for the range slider
const widthRange = document.querySelector('#width');
widthRange.addEventListener('change', lineWidth);

// for the custom color
const customColor = document.querySelector('#custom');
customColor.addEventListener('input', setCustomColor);



ctx.strokeStyle = 'black';

// start rawing
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

(() => {
    // listen for arrow keys
    window.addEventListener('keydown', handleKey);
    document.querySelector('#clear').addEventListener('click', clearCanvas);
    // functions to handle drawing with the mouse 
    canvas.addEventListener('mousedown', mouseStart)
    canvas.addEventListener('mouseup', mouseEnd)
    canvas.addEventListener('mousemove', mouseDraw)
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', setChoice)
    })

})();

function mouseStart(event) {
    isDrawing = true;
    // connect to mousedown 
    x = event.offsetX * 2;
    y = event.offsetY * 2
}

function mouseDraw(event) {
    // mousemove
    if (isDrawing) {
        ctx.strokeStyle = setColor();
        ctx.beginPath();
        ctx.moveTo(x, y);
        x = event.offsetX * 2;
        y = event.offsetY * 2
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function mouseEnd() {
    // mouseup 
    isDrawing = false;
}

function setChoice(event) {
    // returns a string with the current select color
    // console.log(event.target);
    choice = event.target.id;
    console.log(choice);
    if (choice == 'black') {
        document.querySelector('.active').classList.remove('active');
        document.querySelector('#black').classList.add('active');
        setColor();
    } else if (choice == 'white') {
        document.querySelector('.active').classList.remove('active');
        document.querySelector('#white').classList.add('active');
        console.log(choice);
        setColor();
    } else if (choice == 'erase') {
        document.querySelector('.active').classList.remove('active');
        document.querySelector('#erase').classList.add('active');
        console.log(choice);
        setColor();
    } else if (choice == 'rainbow') {
        document.querySelector('.active').classList.remove('active');
        document.querySelector('#rainbow').classList.add('active');
        setColor();
    } else if (choice == 'wild') {
        document.querySelector('.active').classList.remove('active');
        document.querySelector('#wild').classList.add('active');
        setColor();
    } else {
        setColor();
    }
}

function setColor() {
    switch (choice) {
        case 'black':
            ctx.strokeStyle = 'black';
            break;
        case 'white':
            ctx.strokeStyle = 'white';
            break;
        case 'erase':
            ctx.strokeStyle = 'gainsboro';
            break;
        case 'rainbow':
            hue += 2;
            ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
            console.log(choice);
            break;
        case 'wild':
            const wildColor = Math.floor(Math.random() * 361);
            ctx.strokeStyle = `hsl(${wildColor}, 100%, 50%)`;
            break;
        default:
            break;
    }
};

function lineWidth() {
    ctx.lineWidth = widthRange.value;
}

function setCustomColor() {
    choice = 'custom';
    ctx.strokeStyle = customColor.value;
}

function draw({ key }) {
    setColor();
    console.log(key);

    ctx.beginPath();
    ctx.moveTo(x, y);
    // move x and y coordinates
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// only arrow keys work
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

// clear the screen
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);

    canvas.addEventListener(
        'animationend',
        function () {
            canvas.classList.remove('clear');
        },
        { once: true }
    );
}

