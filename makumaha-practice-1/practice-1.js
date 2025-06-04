"use strict";

/* Practice 01-01
Create a username and email address for a student.
 * @param { string } fullName
 * @return { string } userName and email
*/
function createUser(fullName) {
    // splits to first and last name
    let splitName = fullName.split(" ");
    // first name is the splitname at [0]
    let first = splitName[0];
    // last name is the splitname at the last index and .join to make it a string
    let last = splitName.slice(-1).join(" ");

    // creating username : from the first name grab the first two characters, and then add the last name - also made it lowercased 
    let user = (first.slice(0, 2) + last).toLowerCase();

    // to normalize the username (get rid of any odd characters)
    let cleanUser = "";

    // unclean list of special character we don't want in the username
    const notCleanChar = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "\\", "|", ";", ":", "/", "?", ".", "'", "\""];

    // checking to see if the username has a special character, if it doesn't we append it to a clean string 
    for (let i = 0; i < user.length; i++) {
        let char = user[i];
        // if the char does NOT include a nonCleanChar - append it 
        if (!notCleanChar.includes(char)) {
            cleanUser += char;
        }
    }
    cleanUser = cleanUser.toLowerCase().slice(0, 10);
    return cleanUser;
}


function createEmail(user) {
    let newEmail = user + "@js.iu.edu";
    return newEmail;
}

// list of the given usernames 
let userNames = [
    "erlee",
    "stmendis",
    "bekizior",
    "stmendis1",
    "stmendis2",
    "stmendis3",
    "stmendis4",
    "akeshapula",
    "sholongain",
    "sholongai1",
];

// input for full name 
let promptName = prompt("Enter your full name:");


// if the user cancels, it will ask the user to provide a name
if (promptName == null) {
    console.log("Please provide a name.");
    // if they do put in a name, it will proceed wth the functions to make a user + email
} else {
    // for 01-03 : while loop to allow the user to create more usernames
    let anotherUser = "yes"
    // while the user keeps saying yes, keep the loop running
    while (anotherUser == "yes") {
        // creating the username 
        let userInfo = createUser(promptName);
        // creating the email 
        let email = createEmail(userInfo);


        // part 2 : if the list of UserNames includes the same username created, we'll add a number to the end of the name 
        if (userNames.includes(userInfo)) {
            // if the username"s length is less than 10, append a random number at the end 
            if (userInfo.length < 10) {
                userInfo += Math.floor(Math.random() * 9) + 1;
                userNames.push(userInfo);
                // if the lenght is 10, switch the last position of the username to a random number
            } else if (userInfo.length == 10) {
                // part 4 bonus: used the links Erika provided ab regular expressions :https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
                // const range = /[1-9]/;
                // if (userInfo.slice(-1) in range) {
                //     let newUsername = userInfo.slice(-2, -1) + Math.floor(Math.random() * 90) + 10;
                //     userInfo = newUsername;
                //     userNames.push(userInfo);
                // slice the userInfo so we grab the first 9 characters and then add a random number to the end
                let newUsername = userInfo.slice(0, 9) + Math.floor(Math.random() * 10);
                userInfo = newUsername;
                userNames.push(userInfo);
            }
            // if it doesn't exist, just append it 
        } else {
            userNames.push(userInfo);

        }
        // creating the email + printing the statement 
        email = createEmail(userInfo);
        console.log((`Welcome! Your username is ${userInfo} and your new email is ${email}. `));


        // part 3- asking the user if they want to make another one
        anotherUser = prompt("Would you like to create another email address? (yes/no)");
        if (anotherUser == "yes") {
            promptName = prompt("Enter your full name:");
        } else {
            console.log("you chose to quit. byee");
            break;
        }
    }
}

// testing out the array to make sure the new username gets added to the end 
console.log(userNames);
