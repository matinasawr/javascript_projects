# Project 3

> Directions are also in the book:
> [chapter 15](https://pages.github.iu.edu/ebigalee/I365-JS-Book/book/chapter_15.html)

Create a registration form the collects a name, email, and three or more other pieces of data, then displays the registration.  
**The registration topic can be for whatever you'd like.** 

## Expectations

In the registration form:

-   all elements must be in a FORM with a name
-   name and email are REQUIRED form elements and cannot be left blank
-   must use at least one radio, one dropdown (select), and more than one checkbox
-   use fieldset and legend to visually group the form elements
-   elements must have a **value** that makes a _good variable value_
-   form should include a **submit button** and a **reset button**
-   must grab the **submit** event and NOT the **click** event
-   validation required for any inputs or selects
-   bonus for validation on radio buttons or checkboxes

![form](project3-form.png 'project 3 form')

When the user clicks "Register", the form should NOT go to an action, but be intercepted by JavaScript to collect the data available and _display the results as a TABLE (in human-friendly language) somewhere on the page_.

![registrants](project3-results.png 'project 3 registrants')

The form data should be stored in **localstorage** such that if the page is refreshed/reloaded, the registrant's information is still there. It should update if new registrants are added.

Consider clearing out the localstorage occassionally when you are testing:

```js
localStorage.clear();
```

## Form Setup

Example of how your form should be set up:

```html
<form name="camps">
    ...
    <input type="submit" id="register" value="Register" class="btn btn-primary">
    <input type="reset" id="reset" value="Reset" class="btn btn-primary">
</form>
```
Also you're going to want a way to load event listeners and any other functions or code when the page loads. We've been doing this with an init(), but this would be the time to try out an IIFE (immediately invoked function expression).

```js
(function() {
    // initial functions & event listeners
})();
```

And don't forget you'll need to stop the form from submitting so we can validate / store with JavaScript first.

```js
event.preventDefault();
```

TIP: Form not working? You need to grab the **submit** event from the **form** NOT off of the **input button**.

## Form Styling

You may use Bootstrap to help you format your forms. (Add to HEAD) This makes it much easier to get pretty forms. Use as much or little as you'd like for this project.

USE BOOTSTRAP FOR FORM STYLING AND LAYOUT TO MAKE YOUR LIFE EASIER 😌

```html
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
```

> [Bootstrap Forms](https://getbootstrap.com/docs/5.3/forms/overview/)  
> [Bootstrap Tables](https://getbootstrap.com/docs/5.3/content/tables/)  

## Rubric

| | Maximum Points | Description |
| -----: | :----: | :----- |
| HTML Forms | 30 | Forms properly constructed in HTML / required elements present |
| CSS Layout | 10 | Layout and design is professional, hierarchical and clear |
| Data from forms | 5 | Registration data is collected on Submit |
| Data displayed | 30 | Registrations appear on the page |
| Data stored | 15 | Use of local storage to save data is page refreshed |
| Data validation | 10 | All inputs and selects will not proceed unless not empty |
| BONUS | 1 | All radio buttons and checkboxes also validated (to be not empty) |
| |  |  |
| **Total** | **100** | Completed Project 3 |

