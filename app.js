// DOM selectors
const datePicker = document.querySelectorAll('input')[0];
const expense = document.querySelectorAll('input')[1];
const expenseForm = document.querySelector('form');
const submitBtn = document.getElementById('form-button');
const expenseContainer = document.querySelector('.expense-container');
const totalExpenseEl = document.getElementById('total-expense');

let date = Date;
let value = 0;
let totalExpense = '';

let expenseObj = {};
let expenses = [];
let expenseSum = [];

// Get input from the form
function getInput(e) {
    e.preventDefault();
    if (datePicker.value && expense.value) {
        // Get values of date and expense
        date = datePicker.value;
        value = parseInt(expense.value);
        // Set keys and their values for the expense object
        expenseObj.date = date;
        expenseObj.value = value;
        // Append the expense Object to the expenses and update DOM
        expenses.push(expenseObj);
        expenseSum.push(value);
        console.log(expenseSum);
        updateDOM();
    }
    datePicker.value = '';
    expense.value = '';
}

// Append the element with the date and expense to DOM
function updateDOM() {
    // Create elements that need to be appended to DOM
    const expenseCard = document.createElement('div');
    const header2 = document.createElement('h2');
    const header3 = document.createElement('h3');
    // Crete data
    expenseCard.classList.add('expense-card');
    header2.textContent = `£${value}`;
    header3.textContent = date;
    // Append data to the expense card and expense card to the container
    expenseCard.append(header2, header3);
    expenseContainer.appendChild(expenseCard);
    updateLocalStorage();
}

// Rebuild DOM from the local storage
function rebuildDOM() {
    expenses.forEach(expense => {
        // Create elements that need to be appended to DOM
        const expenseCard = document.createElement('div');
        const header2 = document.createElement('h2');
        const header3 = document.createElement('h3');
        // Crete data and add class to the card
        expenseCard.classList.add('expense-card');
        header2.textContent = `£${expense.value}`;
        header3.textContent = expense.date;
        // Append data to the expense card and expense card to the container
        expenseCard.append(header2, header3);
        expenseContainer.appendChild(expenseCard);
    });
}

function calculateTotalExpense() {
    // Calculate total expense out of all expenses and return new array
    let sum = expenses.map(expense => {
        return expense.value;
    });
    // Reduce the sum array and get the sum of it
    totalExpense = `£${sum.reduce((a, b) => a + b, 0)}`;
}

// Append expense array to localStorage
function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Update DOM with local storage 
function updateFromLocalStorage() {
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        rebuildDOM();
    }
}

// Get items from local storage on load
updateFromLocalStorage();

// Event listeners
expenseForm.addEventListener('submit', getInput);