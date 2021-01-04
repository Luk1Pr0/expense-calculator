// DOM selectors
const datePicker = document.querySelectorAll('input')[0];
const expense = document.querySelectorAll('input')[1];
const expenseForm = document.querySelector('form');
const submitBtn = document.getElementById('form-button');
const expenseContainer = document.querySelector('.expense-container');
const totalExpenseEl = document.getElementById('total-expense');

let date = Date;
let value = 0;
let totalExpense = 0;
let expenseId = 0;

let expenses = [];

// Get input from the form
function getInput(e) {
    e.preventDefault();
    if (datePicker.value && expense.value) {
        // Get values of date and expense
        date = datePicker.value.split('-').reverse().join('/');
        value = parseInt(expense.value);
        console.log(date);
        // Create object with expense, date and id
        const obj = { value, date, id: expenseId += 1 };
        // Append the expense Object to the expenses and update DOM
        expenses.push(obj);
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
    calculateTotalExpense();
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
    calculateTotalExpense();
}

function calculateTotalExpense() {
    // Calculate total expense out of all expenses and return new array
    let values = expenses.map(expense => {
        return expense.value;
    });
    // Reduce the sum array and get the sum of it
    const sum = values.reduce((a, b) => a + b, 0);
    totalExpenseEl.textContent = sum;
}

// Append expense array to localStorage
function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('expenseId', expenseId);
}

// Update DOM with local storage 
function updateFromLocalStorage() {
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        expenseId = parseInt(localStorage.getItem('expenseId'));
        rebuildDOM();
    }
}

// Get items from local storage on load
updateFromLocalStorage();

// Event listeners
expenseForm.addEventListener('submit', getInput);