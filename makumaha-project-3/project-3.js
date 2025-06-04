'use strict';

(function () {
    // initial functions & event listeners
    const form = document.forms.pizza;
    const tbody = document.querySelector('tbody');

    // for loading the exisiting orders onto page
    loadOrders();

    form.addEventListener('submit', (event) => {
        // DO NOT SEND ME TO THE ACTION
        event.preventDefault();
        // DO SOME JS INSTEAD
        sendData();
    });

    function sendData() {
        let email = form.email.value;
        let name = form.name.value;
        let size = form.pizzaSize.value;
        let spice = form.spice.value;
        console.log(email);
        let valid = true;

        if (!spice) {
            alert('Please select a spice level.');
            valid = false;
        }

        if (!size) {
            alert('Please select a size.');
            valid = false;
        }
        // vaidation form - if any of the inputs are invalid dont run 
        if (!valid) {
            return;
        }

        // adding the toppings into a list so we can append them nicely
        let toppings = [];
        let checkboxes = document.querySelectorAll('input[name="toppings"]');

        for (let index = 0; index < checkboxes.length; index++) {
            if (checkboxes[index].checked) {
                toppings.push(checkboxes[index].value);
            } else {
                console.log(checkboxes[index].value + ' not selected');
            }
        }

        // if no toppings are selected, just make it cheese
        if (toppings.length == 0) {
            toppings = ['cheese'];
        }

        console.log(toppings);

        let order = {
            name, email, size, toppings: toppings.join(', '), spice
        };
        console.log(order);

        // saving to local storage 
        saveOrder(order)
        createTable(order)


        // reset the form
        console.log(form);
        form.reset();

    }

    function createTable({ name, email, size, toppings, spice }) {
        let html = `<tr> 
        <td> ${name} </td>
        <td> ${email} </td>
        <td> ${size} </td>
        <td> ${toppings} </td>
        <td> ${spice} </td>
        </tr>`;
        tbody.insertAdjacentHTML('afterbegin', html);
    }

    function saveOrder(order) {
        // get the orders from local storage or if none it wil be initalized as empty 
        let orders = JSON.parse(localStorage.getItem('pizzaOrders')) || [];
        orders.push(order);
        localStorage.setItem('pizzaOrders', JSON.stringify(orders));
    }

    function loadOrders() {
        let orders = JSON.parse(localStorage.getItem('pizzaOrders')) || [];
        // for each order, add a row into the table
        orders.forEach(createTable);
    }

})();
