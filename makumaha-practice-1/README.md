# 📋 Practice-01: Welcome to Javascript

You've been given a job with the IT deparment at the new School of JavaScript 🏫 at Indiana University. Your supervisor wants you to set up a way to generate unique usernames and emails for everyone in the school. Good luck on your first day!

Use the repository set up for you to complete this practice problem.

</br>

## ⚡ Quickstart

### MacOS / WSL / Linux / ChromeOS

Clone the repository (replacing `REPO-NAME`):

```bash
git clone https://github.iu.edu/i365sp2025/REPO-NAME.git
cd REPO-NAME
```

<br/>

## Practice-01-01

Complete the function `createEmail()`, which takes a name, and creates a username and email address for a student. You may write additional functions as needed.

```js
/*
Create a username and email address for a student.
 * @param { string } fullName
 * @return { string } userName and email
*/
function createEmail(fullName) {}

let promptName = prompt("Enter your full name:");
let userInfo = createEmail(promptName);
```

### 📝 Email / Username Requirements

- Username is the first two characters of the first name, plus the last name
- No more than `10` characters allowed total
- Special characters are ignored and not included in a username/email
- If a user clicks "Cancel", the program should handle any errors
- Emails end with `@js.iu.edu`
- Example Output: `Welcome! Your username is mabekova and your new email is mabekova@iu.js.edu.`

### 🧪 Test Cases:

Use these names to test your code. The resulting email is shown.

- Mary Bekova => mabekova@js.iu.edu
- Shelby Anne O'Longain => sholongain@js.iu.edu
- Hubert Blaine Wolfeschlegelsteinhausenbergerdorff => huwolfesch@js.iu.edu

</br>

## Practice-01-02

Add to your program. Allow two people with the **same name** to both have unique usernames and emails.

### 📝 Requirements

- If the username already exists, add a number from `1 to 9` to the end.
- If the username is `10` characters long, then replace the final letter with a number instead.
- The numbers should start with `1` and go to `9`, not be random numbers.
- For the sake of this exercise, let's assume that we'll never need no more than these `10` variations.
- Once a username/email combo is created, add the username to the `userNames` array storing all known usernames.
- Example output: `Welcome! Your username is stmendis3 and your new email is stmendis3@iu.js.edu.`

```js
let userNames = [
  "erlee",
  "stmendis",
  "bekizior",
  "stmendis1",
  "stmendis2",
  "akeshapula",
  "sholongain",
  "sholongai1",
];
```

### 🧪 Test cases:

Use these same names to test your code. The resulting email is shown.

- Erika Lee => erlee1@js.iu.edu
- Steve Mendis => stmendis3@js.iu.edu
- Shelby Anne O'Longain => sholangai2@js.iu.edu

</br>

## Practice-01-03

Once a username and email is created, ask the user if they'd like to create another.

- Handle the user's response, as well as what happens if the user clicks "Cancel" in the prompt.
- Hint: _What DOES happen? What is RETURNED?_
- Example prompt: `"Would you like to create another email address? (yes/no)"`

</br>

## Practice-01-04 Bonus (2 pts)

Allow for more than 10 people to have the same name.

- Examples: if `stmendis9` exists, allow for your program to generate a `stmenis10`. If `sholangai9` exists, allow for `sholanga10`.
- Probably the best way to do this is with regular expressions (taught in I211 and some CS courses). You MAY use regex for this if you understand what you're doing:
  - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- It is also quite possible, although will take more lines of code, to modify your current technique to check for additional places in your string / array.
- WE'D LIKE YOU TO USE THE TECHNIQUE THAT MAKES THE MOST SENSE TO YOU

</br>

## 🏆 Submission

Push your changes to Github (Replacing `COMMIT_MESSAGE`) and submit your repository link on Canvas

```bash
git add .
git commit -m <COMMIT-MESSAGE>
git push
```

## Rubric

|                                  | Maximum Points | Description                                                |
| -------------------------------: | :------------: | :--------------------------------------------------------- |
|                               01 |       30       | Creates email and username                                 |
|                               02 |       30       | Creates even when duplicates                               |
|                               03 |       30       | Allows user to create multiple usernames and emails        |
| Formatting / Directory structure |       10       | HTML formatted correctly, JavaScript is in the `js/`, etc. |
|                            BONUS |       2        | Allow for more than 10 people to have unique names         |
|                                  |                |                                                            |
|                        **Total** |    **100**     |                                                            |
