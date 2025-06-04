'use strict';

// random number that the user has to guess 

// randomNumber = getRandomNumber();
let randomNumber = getRandomNumber();

function getRandomNumber() {
    return Math.ceil(Math.random() * 100);
}

// for testing reasons (making sure the game runs properly i have to know what the random number is!)
console.log(randomNumber);

// 
let count = 0;


document.querySelector('#guessButton').addEventListener('click', (event) => {
    let userGuess = (document.querySelector('input'))
    userGuess = userGuess.value;
    console.log(userGuess);

    userGuess = Number(userGuess);
    // so we can update the result box in the HTMl if the input is invalid
    const result = document.querySelector('.result');
    if (userGuess == '') {
        alert('Please enter a number.');
        // to exit this sequence if the inpt is not a number 
        result.insertAdjacentHTML('beforeend', `<h2> Please input a valid number!</h2>`);
        // documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
        return;
    }

    if (!Number.isInteger(userGuess)) {
        alert('Enter a valid number please!');
        result.insertAdjacentHTML('beforeend', `<h2> Please input a valid number!</h2>`);
        return;
    }

    if (userGuess > 100 || userGuess < 1) {
        alert('Enter a valid number in the range please!');
        result.insertAdjacentHTML('beforeend', `<h2> Please input a valid number in the range!</h2>`);
        return;
    }


    let message = '';
    let countMessage = '';

    if (userGuess != randomNumber) {
        count++;
        if (userGuess > randomNumber) {
            message = 'Too high! Try again. o(╥﹏╥)o';
            countMessage = `Number of Guesses: ${count}`;
        } else {
            message = 'Too low! Try again. o(╥﹏╥)o';
            countMessage = `Number of Guesses: ${count}`;
        }
    } else {
        count++;
        message = `You got it! ${userGuess} is right!(✿◠‿◠)`;
        countMessage = `It took you ${count} amount of tries!! Congrats!`;
        // disabling the game because the user won 
        document.querySelector('#guessButton').disabled = true;
        document.querySelector('#inputGuess').disabled = true;

    }



    // displaying the message
    // const result = document.querySelector('.result');
    const countResult = document.querySelector('.count');

    // clearning whats inside the .result and .count div to update the message
    // documentation : https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
    result.innerHTML = '';
    countResult.innerHTML = '';

    // updating the information 
    result.insertAdjacentHTML('beforeend', `<h2>${message}</h2>`);
    result.insertAdjacentHTML('beforeend', `<p>${countMessage}</p>`);

    // reset the input field
    document.querySelector('input').value = '';
});



// when the replay button gets clicked on, it will run the replay function which enables the game again
document.querySelector('#replayButton').addEventListener('click', replay);

function replay(event) {
    // resetting the count back to 0 
    count = 0
    console.log('replaay lolol');
    randomNumber = getRandomNumber();
    console.log(randomNumber);

    // turning the guess button back on
    document.querySelector('#guessButton').disabled = false;
    document.querySelector('#inputGuess').disabled = false;

    const result = document.querySelector('.result');
    result.innerHTML = `<h2> Restarting the game lets goooo! </h2>`;

    // to reset the input field again 
    document.querySelector('input').value = '';

};

