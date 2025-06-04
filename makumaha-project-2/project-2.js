'use strict';

// global valuables
// let numberGlobal = document.querySelector('.num');
// console.log(numberGlobal);
let randomNum = getRandomNumber();
let count = 0;
const countHtml = document.querySelector('.count');
const messageHtml = document.querySelector('.message');


// // making the range a global button // my attempt at the extra credit
// document.querySelector('#guessButton').addEventListener('click', (event) => {
//     let userRange = document.querySelector('input')
//     userRange = Number(userRange.value);
//     console.log(userRange);
// })



// creating the random number
function getRandomNumber() {
    return Math.ceil(Math.random() * 100);
}


console.log(randomNum);

// optionally add a parameter for how large a board to create
function createBoard() {

    for (let index = 1; index < 101; index++) {
        let circle = `<div class="num" data-number="${index}">${index}</div>`
        document.querySelector('.numbers').insertAdjacentHTML('beforeend', circle);
    }
}

function guessNumber(event) {
    let message = '';
    let countMessage = '';

    let num = event.target;
    let userGuess = Number(num.dataset.number);
    console.log(userGuess);


    // takes an event from the number being clicked on
    if (userGuess == randomNum) {
        count++;
        countMessage = `It took you ${count} amount of tries!`;
        message = 'Congrats! You guessed correctly!';
        num.classList.add('winner');

        document.querySelectorAll('.num').forEach((number) => {
            console.log(number.classList);
            console.log((!number.classList.contains('winner') && !number.classList.contains('lower') && !number.classList.contains('higher')));
            // got help from Namith on this :,) - so that the remaining unguessed numbers turn gray and the ones that have already been clicked on are still their colors 
            if (!number.classList.contains('winner') && !number.classList.contains('lower') && !number.classList.contains('higher')) {
                number.classList.add('disabled');
            }
        });
        document.querySelector('#tryButton').disabled = false;


    } else if (userGuess > randomNum) {
        count++;
        countMessage = `${count} amount of tries so far...`;
        message = 'Too high! Try again. ┐(‘～`；)┌';
        num.classList.add('higher');
        console.log(num.classList);

    } else {
        count++;
        countMessage = `${count} amount of tries so far...`;
        message = 'Too low! Try again. ┐(‘～`；)┌';
        num.classList.add('lower');
        console.log(num.classList);
    }


    // clearing out the inside
    countHtml.innerHTML = '';
    messageHtml.innerHTML = '';

    // inserting the html messages depending on the user's guess
    messageHtml.insertAdjacentHTML('beforeend', message);
    countHtml.insertAdjacentHTML('beforeend', countMessage);



}

function tryAgain() {
    document.querySelectorAll('.num').forEach((number) => {
        number.classList.remove('disabled');
    });
    count = 0;
    // clearing out the insides
    let numbers = document.querySelector('.numbers');
    numbers.innerHTML = '';
    countHtml.innerHTML = '';
    messageHtml.innerHTML = '';
    console.log('replaying again');
    randomNum = getRandomNumber();
    console.log(randomNum);

    createBoard();

    let numberButtons = document.querySelectorAll('.num');

    numberButtons.forEach((number) => {
        // add event listeners here
        number.addEventListener('click', (event) => {
            guessNumber(event);
        })
    })

    document.querySelector('#tryButton').disabled = true;


}




// for testing reasons (making sure the game runs properly i have to know what the random number is!)
// console.log(randomNumber);

function init() {
    createBoard();

    let numberButtons = document.querySelectorAll('.num');
    // just testing to make sure I grab the right buttons lol console.log(numberButtons);
    // for each number of button, if its clicked on grab the number's data (the number it is)
    numberButtons.forEach((number) => {
        // add event listeners here
        number.addEventListener('click', (event) => {
            guessNumber(event);
        })
    })

    let tryButton = document.querySelector('#tryButton');
    tryButton.addEventListener('click', tryAgain);


}
init();



