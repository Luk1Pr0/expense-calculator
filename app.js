// DOM selectors
const datePicker = document.querySelectorAll('input')[0];
const expense = document.querySelectorAll('input')[1];
const expenseForm = document.querySelector('form');
const submitBtn = document.getElementById('form-button');
const expenseContainer = document.querySelector('.expense-container');
const totalExpense = document.getElementById('total-expense');

let date = "";
let value = 0;
let defaultId = 0;
let expenseObj = {};
let expenses = [];

// Get input from the form
function getInput(e) {
    e.preventDefault();
    if (datePicker.value || expense.value) {
        // Get values of date and expense
        date = datePicker.value;
        value = expense.value;
        // Set keys and their values for the expense object
        expenseObj.date = date;
        expenseObj.expense = value;
        // Append the expense Object to the expenses
        expenses.push(expenseObj);
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

// Append expense array to localStorage
function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Update DOM with local storage 
function updateFromLocalStorage() {
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        // console.log('expense array', expenses);
        rebuildDOM();
    }
}

// Rebuild DOM with the local storage items
function rebuildDOM() {
    expenses.forEach(expense => {
        // Create elements that need to be appended to DOM
        const expenseCard = document.createElement('div');
        const header2 = document.createElement('h2');
        const header3 = document.createElement('h3');
        // Crete data and add class to the card
        expenseCard.classList.add('expense-card');
        header2.textContent = `£${expense.expense}`;
        header3.textContent = expense.date;
        // Append data to the expense card and expense card to the container
        expenseCard.append(header2, header3);
        expenseContainer.appendChild(expenseCard);
    });
}

// Get items from local storage
updateFromLocalStorage();

expenseForm.addEventListener('submit', getInput);