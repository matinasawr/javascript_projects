'use strict';

// batch_count 
// curr_count
let wordLimit = 50;
let curr_count = 0;
let batch_count = 0;

function initTextArea() {
    const story = document.querySelector('#story');
    const wordCount = document.querySelector('#count')
    // let wordLimit = 50;
    let number = document.getElementById('number');
    // console.log(number);


    // add event listener for when they tye something
    story.addEventListener('keyup', (event => {
        // preprocessing to find out jwo many words are there HINT: split()
        let text = story.value;
        // console.log(text);
        // words != " " hint: filter()
        // words as list
        // find the length of the word list 
        let words = text.split(' ').filter(word => word.length > 0)
        console.log('WORD LENGTH IS', words);
        // updating curr count
        curr_count = words.length;
        // count batches -> 1
        wordCount.textContent = curr_count;

        // this is for updating the limit in the header h2 - grabbing the number from the dropdown
        let wordLimit = parseInt(number.value);
        let limit = document.querySelector('.limit');
        limit.textContent = wordLimit;


        console.log('LIMIT:', wordLimit);

        // a new batch ->  qs html tags -> grab data from api 
        // replace the data from html tags - if the curr word count goes above the limit (new batch's limit too with the +1, aka new threshold) add a new batch - call the helper function to load a new iamge and fact 
        if (curr_count >= wordLimit * (batch_count + 1)) {
            batch_count++
            helper();
        }

        console.log('CURRENT COUNT: ', curr_count);
        console.log('BATCH COUNT: ', batch_count);


    }));


}

initTextArea();

function helper() {

    // qs 3 things -> image, fact and select tag for the animal 
    let animal = document.querySelector('#animal')
    // let fact = document.querySelector('#fact')
    // let select = document.querySelector('#number')
    let image = document.querySelector('#image')
    let funFact = document.querySelector('#funFact')
    //  depending on what animal is picked, youre gonna update the respective animal image and fact 
    let selectAnimal = animal.value;
    console.log(selectAnimal);

    if (selectAnimal == 'cats') {
        console.log(selectAnimal);
        loadCat();
    } else {
        console.log('DOG', selectAnimal);
        loadDog();
    }


    async function loadCat() {
        // cat information
        const imageUrl = 'https://api.thecatapi.com/v1/images/search';
        const factCatUrl = 'https://catfact.ninja/fact';

        try {
            // fetch the image and fact for cats
            const imageCatResponse = await fetch(imageUrl);
            const factCatResponse = await fetch(factCatUrl);

            console.log(factCatResponse);

            // json
            const catImageData = await imageCatResponse.json();
            const catFactData = await factCatResponse.json();

            const catImageURL = catImageData[0].url;
            const catFunFact = catFactData.fact;

            image.src = catImageURL;
            funFact.textContent = catFunFact;

            console.log('CAT IMAGE', catImageURL);
            console.log('CAT FUN FACT', catFunFact);

        } catch (error) {
            console.log('Something went wrong with the cat API');
        }

    }



    async function loadDog() {
        // cat information
        const imageUrl = ' https://dog.ceo/api/breeds/image/random';
        const factDogURL = 'https://dogapi.dog/api/v2/facts?limit=1';

        try {
            // fetch the image and fact for cats
            const imageDogResponse = await fetch(imageUrl);
            const factDogResponse = await fetch(factDogURL);

            console.log(imageDogResponse);

            // json
            const dogImageData = await imageDogResponse.json();
            const dogFactData = await factDogResponse.json();

            const dogImageURL = dogImageData.message;
            const dogFunFact = dogFactData.data[0].attributes.body;

            image.src = dogImageURL;
            funFact.textContent = dogFunFact;
        } catch (error) {
            console.log('Something went wrong with the dog API');
        }

    }
}


function initNumSelector() {
    // qs the select tags 
    // grb the limit from there 
    const limitNumber = document.querySelector('#number')
    // add event listener for when they update - change 
    limitNumber.addEventListener('change', () => {
        batch_count = 0
        curr_count = 0;

        let newLimit = parseInt(limitNumber.value);
        // qs the h2 tag and then update the limit 
        document.querySelector('.limit').textContent = newLimit;
        console.log(newLimit);

    })
}

initNumSelector()


// no longer needed as we didnt learn local storage in class
// function getData() {
//     // API calls 
//     // make api calls for cat dog image and a dog daat 
//     // store the data (response) from api into variable data urlfor images and facts 
// }
