// DOM selectors
const datePicker = document.querySelectorAll('input')[0];
const expense = document.querySelectorAll('input')[1];
const expenseForm = document.querySelector('form');
const submitBtn = document.getElementById('form-button');
const expenseContainer = document.querySelector('.expense-container');

let date = "";
let value = 0;

// Get input from the form
function getInput(e) {
    e.preventDefault();
    console.log(value, date);
    if (!date.length || !value.length) {
        date = datePicker.value;
        value = expense.value;
        updateDOM();
    }
}

// Append the element with the date and expense to DOM
function updateDOM() {
    const expenseCard = document.createElement('div');
    const header2 = document.createElement('h2');
    const header3 = document.createElement('h3');
    expenseCard.classList.add('expense-card');
    header2.textContent = `£${value}`;
    header3.textContent = date;
    expenseCard.append(header2, header3);
    expenseContainer.appendChild(expenseCard);
}

expenseForm.addEventListener('submit', getInput);

















// const hello = "THIS IS MY TEST TEXT";

// function cloneExpenseCard(e, date, expense) {
//     // Prevent page refresh on submit
//     e.preventDefault();
//     let cardClone = expenseCard.cloneNode(true);
//     expenseContainer.appendChild(cardClone);
// }

// // Add date and expense value into element
// function modifyData(e) {
//     e.preventDefault();
//     let expenseValue = inputValue.value;
//     let dateValue = dateSelector.value;
//     if (dateValue.length && expenseValue.length) {
//         amountSpent.textContent = expenseValue;
//         dateSpent.textContent = dateValue;
//         cloneExpenseCard(e, expenseValue, dateValue);
//         // console.log(dateValue, expenseValue);
//     } else {
//         alert("Please fill in the date and expense amount");
//     }
//     inputValue.value = "";
//     dateSelector.value = "";
// }

// submitButton.addEventListener("click", modifyData);