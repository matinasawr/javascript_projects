'use strict';

import { wordleWords } from "./wordle-list.js";
import { fullList } from "./full-list.js";


// globals
let wordleWord = [];
let currentGuess = [];
let currentTile = {
    row: 1,
    tile: 1,
};




// CHOOSE ONE OF THESE:
// Using an IIFE to start our code
(function () {
    createTiles();
    createKeys();
    chooseWord();


    document.querySelectorAll('.key').forEach((key) => {
        key.addEventListener('click', keyClicked);
    });

    window.addEventListener('keydown', keydown);
})();

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//  FUNCTIONALITY
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/**
 * Randomly chooses a word from the official wordle choices list
 * @returns {array} wordleWord (sets global)
 */
function chooseWord() {
    let index = Math.ceil(Math.random() * wordleWords.length);
    let chosenWord = wordleWords[index];
    console.log(chosenWord);
    wordleWord = chosenWord.split('');
    console.log(wordleWord);
}

// had to move the keydown to its own function so i could remove the function once the game ends
function keydown(event) {
    // console.log('keydown');
    let regex = /^[a-zA-Z]+$/;
    if (event.key === 'Escape') {
        console.log('ESCAPE KEY:', event.key);
    } else if (event.key === 'Enter') {
        console.log('ENTER KEY:', event.key);
        checkGuess();
    } else if (event.key === 'Backspace') {
        console.log('BACKSPACE KEY:', event.key);
        backSpace();
    } else if (
        regex.test(event.key) &&
        event.key != 'Shift' &&
        event.key != 'Alt' &&
        event.key != 'Meta' &&
        event.key != 'Tab' &&
        event.key != 'Control' &&
        event.key != 'CapsLock' &&
        !event.key.includes('Arrow')
    ) {
        console.log('ALPHABET KEY:', event.key);
        buildGuess(event.key)
    } else {
        console.log('not a valid key ; keydown');
    }
};

function keyClicked(event) {
    let currentKey = event.currentTarget.id.toLowerCase();
    console.log('key clicked', currentKey);

    switch (currentKey) {
        case 'enter':
            console.log('current keys are:', currentKey);
            // console.log('ENTER TILE:', currentKey);
            checkGuess();
            break;

        case 'backspace':
            // console.log('BACKSPACE TILE:', currentKey);
            backSpace();
            break;

        default:
            // console.log('ALPHABET TILE:', event.currentTarget.id);
            buildGuess(currentKey);
            break;
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//  CREATE INTERFACE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/**
 * Creates six rows of file tiles each for the interface
 */

function createTiles() {
    for (let index = 1; index < 7; index++) {
        let wordle = `<div class="row-${index}">
    <div class="tile" data-tile="1"></div>
    <div class="tile" data-tile="2"></div>
    <div class="tile" data-tile="3"></div>
    <div class="tile" data-tile="4"></div>
    <div class="tile" data-tile="5"></div>
</div>`
        // selecting the tiles + inserting the tiles
        document.querySelector('.tiles').insertAdjacentHTML('beforeend', wordle);
    }

}


/**
 * Creates three rows of keyboard keys as interface elements
 */
function createKeys() {
    const qwerty = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        [
            'ENTER',
            'Z',
            'X',
            'C',
            'V',
            'B',
            'N',
            'M',
            `<span class="material-symbols-outlined">backspace</span>`,
        ],
    ];


    let jIndex = '';
    // select keys 
    for (let index = 0; index < qwerty.length; index++) {
        let rowList = (qwerty[index]);
        let row = "";
        jIndex = ""
        row += `<div class="row-1" id="row-1">`;
        // console.log(rowList);
        for (let j = 0; j < rowList.length; j++) {
            jIndex = rowList[j];
            if (jIndex == 'ENTER') {
                row += `<div class="key enter" id="${jIndex}">${jIndex}</div>`;
            }
            else if (jIndex.length > 5) {
                row += ` <div class="key" id="backspace">Backspace</div>`;
            }
            else {
                row += `<div class="key" id="${jIndex}">${jIndex}</div>`
                // console.log(jIndex);
            }
        }
        row += `</div>`
        document.querySelector('.keys').insertAdjacentHTML('beforeend', row)

    }

}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//  MAKE A GUESS: ADD A LETTER
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/**
 * Creates an array of 5 letters = a guessed word
 * @param {string} letter
 */
function buildGuess(letter) {
    // as long as currentGuess isn't 5-letters long, add a letter to a tile
    if (currentGuess.length < 5) {
        currentGuess.push(letter)
        addTile(letter)
    }
    console.log(currentGuess);
}


/**
 * Updates a tile to add a letter to the interface when an interface key is selected
 * @param {string} letter
 */
function addTile(letter) {
    // select the current row and tile (keep track in a global
    let row = document.querySelector(`.row-${currentTile.row}`);
    // console.log(row);
    let tile = row.querySelector(`[data-tile="${currentTile.tile}"]`);
    // console.log(tile);
    tile.insertAdjacentHTML('afterbegin', letter.toUpperCase());
    tile.classList.add('active');
    currentTile.tile += 1;
    // console.log(currentTile);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//  MAKE A GUESS: REMOVE A LETTER
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/**
 * Handles when the backspace key is clicked
 * - removes a tile and a letter in guessed word
 */
function backSpace() {
    // if there are any letters left in the guess (global variable)...
    // delete a letter from the guess
    // delete the tile for that letter
    console.log('got to backspace');
    if (currentGuess.length > 0) {
        currentGuess.pop();
        currentTile.tile -= 1;
        let row = document.querySelector(`.row-${currentTile.row}`);
        let tile = row.querySelector(`[data-tile="${currentTile.tile}"]`);
        console.log(tile);
        tile.textContent = '';
        tile.classList.remove('active');
    }

}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//  MAKE A GUESS: CHECK THE GUESS
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/**
 * Checks if a guessed word is valid, and if so sends it to be evaluated
 * Note: evaluateWord(array) takes an array based off the guessed word
 */

function checkGuess() {
    let notice = document.querySelector('.notice')
    let row = document.querySelector(`.row-${currentTile.row}`);
    // What if the user hits Enter before typing in 5 letter?
    if (currentGuess.length < 5) {
        row.classList.add('shake');
        console.log('needs five letters!');
        // <div class="notice"></div>
        notice.classList.add('open');
        setTimeout(() => {
            notice.classList.remove('open');
        }, 1500);
        // Is the guess 5 letters?
        // If not, we will have a notice appear with the error "not enough letters"
    } else {
        console.log('you guessed', currentGuess);
    }
    // If so, then we want to validate the guess - use isValid(guess):  
    if (isValid(currentGuess)) {
        evaluateGuess();
        // If the guess is valid, THEN AND ONLY THEN do we want to evaluate the guess
        console.log('ready to eval..');

        // yto go to the new row if the word is valid and usermade a guess
        currentTile.row += 1;
        currentTile.tile = 1;
        currentGuess = [];


    } else {
        // If the guess is NOT valid, have a notice appear with the error "not a word"
        row.classList.add('shake');
        notice.textContent = 'not a valid word';
        notice.classList.add('open');
        setTimeout(() => {
            notice.classList.remove('open');
        }, 1500);
    }
}

/**
 * Determines if the current guess is a word recognized as a guess by Wordle
 * @param {array} currentWord
 * @returns {boolean}
 */
function isValid(currentWord) {
    return fullList.find((word) => word == currentWord.join(''));
}

/**
 * Evaluates a guessed word letter by letter to see if it is correct, present or absent
 * @param {array} currentWordArray (needs access to this global)
 */
function evaluateGuess() {
    // Make a copy of both the current wordle word and the current guess
    // wordle word to evalulate 
    let originalArray = [...wordleWord]
    // copy of the guessed word 
    let guessCopy = [...currentGuess]
    // to clear out the array for each guess - this part drove me ceazy bc i couldnt figure out why 4each subsequent guess was not accurately beig evaluated while the first one was 
    // starting values
    let resultArray = ['absent', 'absent', 'absent', 'absent', 'absent'];

    let row = document.querySelector(`.row-${currentTile.row}`);
    let tiles = row.querySelectorAll('.tile');


    for (let index = 0; index < guessCopy.length; index++) {
        // this is for the correct letters first
        if (guessCopy[index] == originalArray[index]) {
            // console.log(guessCopy[index]);
            // console.log(originalArray[index]);
            resultArray[index] = 'correct';
            // to make the letter unusable 
            originalArray[index] = 1;
            guessCopy[index] = 1;
        }
        console.log(index, 'PASS', resultArray);
        console.log(guessCopy);
        console.log(originalArray);
    }


    // present letters (yellow)
    for (let index = 0; index < guessCopy.length; index++) {
        // if the letter at guessCopy isnt 1 and thewordle word incljudes that letter, itll be present 
        if (guessCopy[index] != 1 && originalArray.includes(guessCopy[index])) {
            resultArray[index] = 'present';
            // looking at the index of the current letter from guessCopy to see if it exists anywhere in orginialarray
            //  finding the first indexd where guessCopy[index] is fund in the orginal array
            // this prevents using the same letter in multiple positions 
            let check = originalArray.indexOf(guessCopy[index])
            originalArray[check] = 1;
            guessCopy[index] = 1;
        }
    }

    // gray lettters 
    for (let index = 0; index < guessCopy.length; index++) {
        if (resultArray[index] == 'absent' && guessCopy[index] != 1) {
            resultArray[index] = 'absent';
        }

    }


    updateDisplay(resultArray);
    // adding the animation if the guess word matches the wordle word
    if (resultArray.every(status => status === 'correct')) {
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('animation-bounce');
            }, index * 200);
        });
    }
}




/**
 * Update display after word guessed
 * @param {array} resultArray
 * @param result
 */
function updateDisplay(resultArray, result) {
    let row = document.querySelector(`.row-${currentTile.row}`);
    let tiles = row.querySelectorAll('.tile');


    for (let index = 0; index < resultArray.length; index++) {
        let tile = row.querySelector(`[data-tile="${index + 1}"]`);
        let letter = currentGuess[index].toUpperCase();
        console.log(letter);
        // console.log(tile);
        if (resultArray[index] == 'correct') {
            tile.classList.add('color-correct');
        } else if (resultArray[index] == 'present') {
            tile.classList.add('color-present');
        } else {
            tile.classList.add('color-absent')
        }


        let key = document.querySelector(`#${letter}.key`)
        console.log(key);
        if (key) {
            if (resultArray[index] == 'correct') {
                key.classList.add('key-correct');
            } else if (resultArray[index] == 'present') {
                key.classList.add('key-present');
            } else {
                key.classList.add('key-absent');
            }
        }

        console.log('array at handle', resultArray);

        // documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
        // tried to check if resultArray = ['correct', 'correct', 'correct', 'correct', 'correct'] , but it didnt work so i resorted to .every()
        if (resultArray.every(status => status === 'correct')) {
            // delaying the modal popup so the tiles can turn
            setTimeout(() => {
                result = 'win';
                handleResult(result);
            }, tiles.length * 200);

        } else if (currentTile.row >= 6) {
            result = 'loss';
            handleResult(result);
        }
    }
}



/**
 * Determines if we are still playing or game is over (won or lost)
 * @param result
 */
function handleResult(result) {
    // inserting it to the notice div 
    let notice = document.querySelector('.notice');
    let word = '';
    console.log(wordleWord);

    if (result == 'win') {
        result = 'You won!(づ｡◕‿‿◕｡)づ';
        // im not sure why there is an error in the CLG ofor the wordleword, its prinitng as an aray and it works.. 
        wordleWord = wordleWord.join('');
        word = `The word was: ${wordleWord}`;
        console.log('RESULT WIN: PRINTTT');
        openModal(result, wordleWord)
    } else if (result == 'loss') {
        console.log('RESULT LOSS: PRINTTTTTT');
        result = 'You lost! ಥ_ಥ'
        wordleWord = wordleWord.join('');
        word = `The word was: ${wordleWord}`;
        openModal(result, word)
    }

    // disabling the keyboard
    document.querySelectorAll('.key').forEach((key) => {
        key.removeEventListener('click', keyClicked);
    });

    // trying to remove the keydown 
    window.removeEventListener('keydown', keydown);
};




// open the modal 
function openModal(message, word) {
    let modalOuter = document.querySelector('.modal-outer');
    let modalInner = document.querySelector('.modal-inner');

    let html = `<h1>${message}</h1>
                <p> the word was ${word} </p>
    `;


    modalOuter.classList.add('open');
    modalInner.insertAdjacentHTML("afterbegin", html);

    // to close the modal if you click outside its content
    document.querySelector('.modal-outer').addEventListener('click', closeModal);
    window.addEventListener('keydown', closeModal);
}





function closeModal(event) {
    if (event.key == 'Escape') {
        console.log('ESCAPE KEY:', event.key);
        document.querySelector('.modal-outer').classList.remove('open');

    } else {
        console.log("outer");
        document.querySelector('.modal-outer').classList.remove('open');
    }
    // console.log(document.querySelector('.modal-outer').classList.remove('open'));
};

