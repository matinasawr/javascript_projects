# Practice 3: Shapes

> [Book Directions](https://pages.github.iu.edu/ebigalee/I365-JS-Book/book/chapter_13.html)

## 13.1 (completed in-class)

(1) To start, set **x** and **y** to be the coordinates for the very center of the canvas. The canvas form element has properties like "height" and "width" that may help here. 

(2) Then write an event listener on the 'Draw Shape' button to call the function **drawShape**.

(3) In **drawShape**, use the form elements to grab the selected shape, so we know which shape to draw.

(4) Write the functions under **"Drawing Each Kind of Shape".**

> [MDN Canvas Tutorial: Drawing Shapes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)  

To do this, you'll need the tutorial provided by MDN on how to make each element work. Begin with the circle since it's the default shape selected in our program. The triangle is the most challenging. **Each shape must be CENTERED in the canvas.**

**Set a default size of ~100 for the radius, width or base, and height for now as needed in each of these functions**

(5) Write the helper functions for the **"Drawing Options"** - in each of these the goal is to grab the form element associated with each and decide what to set the fill, color and width of our shape to. Defaults are set for you.

## 13.2

Comment out the 'Draw Shape' button in your HTML.

Instead of updating the shape on a button click, let's make the interface a bit more interactive. Have the shape's properties update whenever a form element is CHANGED.

>   [MDN change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)

Add event listeners to the checkbox, radio buttons, and select (dropdown), so that they re-draw the shape on CHANGE.

## 13.3

Uncomment the rest of the HTML in the "size" form element. (This is the one the canvas is located within.)

-   Event listeners: When each of these form elements (range, input:number, input:number) is changed, call the function **drawShape**

## 13.4

Uncomment the HTML in the "calculate" form element. (This is the last form in the HTML.)

-   In the globals section, add a statement under "init" to _calculateSize_ when the document first loads.
-   Create an event listener for the "Calculate Size" button.

```js
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// CALCULATE SIZE OF AREA AND PERIMETER
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function calculateSize(event) {
    // KEEPS FORM FROM SUBMITTING AT THIS POINT
    event.preventDefault();

    // get current shape, radius, width/base, height
    // create variables to hold the calculated area and perimeter
    // calculate the area and perimeter of the current shape
    // update the interface to display the area and perimeter
}
```

Write a function **calculateSize** that is called whenever the "Calculate Size" button is clicked. The function should calculate the **area** and **perimeter** of the shape in pixels and display the results.

-   For this to work, you'll need to set variables to hold the **radius**, **width**, **height**, **area** and **perimeter**.
-   You'll also need to calculate these two values differently, depending on the current shape.
-   To get the formulas, do a Google search, or think back to 10th grade Geometry... be as specific as you can be in your search. Remember we only know the height and base/width, and not the length of all the sides.
-   Once the calculations are complete, update the P element #size with the current shape's area (px) and perimeter (px squared). Use the HTML tag SUP to superscript your exponent. Look up the JS Number method .toFixed() to help control the decimals.

_(Yes, we could have the calculations appear when the shape changes, but for the sake of practice, let's tie this one action to a button. :-)_

## 13.5

-   Find a way update the radius label  ("Radius = 100px") to show the current value of the range slider
-   Find a way to reset the value of the width and height inputs if a value out of range is entered. For example, if the user types in 500, the input will reset to 300 before re-drawing the shape. And if the user chooses a negative number, the input will set to zero.


## Rubric

| | Maximum Points | Description |
| -----: | :----: | :----- |
| 13.1 | 15 | Draws shape with selected color and optional border |
| 13.2 | 5 | Shape draws on form change |
| 13.3 | 30 | Dimensions of shape can be adjusted on change |
| 13.4 | 30 | Calculate the area and perimeter of the current shape on click |
| 13.5 | 10 | Display value for radius / dimensions validation |
| |  |  |
| **Total** | **100** | Completed Practice 3 |
