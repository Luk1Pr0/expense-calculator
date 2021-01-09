// DOM selectors
const datePicker = document.querySelectorAll('input')[0];
const expense = document.querySelectorAll('input')[1];
const monthlyIncome = document.querySelectorAll('input')[2];
const expenseForm = document.querySelector('form');
const submitBtn = document.getElementById('form-button');
const expenseContainer = document.querySelector('.expense-container');
const totalExpenseEl = document.getElementById('total-expense');
const monthlyIncomeEl = document.getElementById('monthly-income');
const moneyLeftEl = document.getElementById('money-left');
const editIncomeIcon = document.getElementById('edit-icon');

let date = Date;
let value = 0;
let income = 0;
let totalExpense = 0;
let expenseId = 0;
let leftOver = 0;
let sum = 0;
let expenses = [];

// Get input from the form
function getInput(e) {
    e.preventDefault();
    if (datePicker.value && expense.value) {
        // Get values of date and expense
        date = datePicker.value.split('-').reverse().join('/');
        value = parseFloat(expense.value);
        // If the income is 0 then set it to whatever the user has entered
        if (income === 0) {
            income = monthlyIncome.value;
        }
        // Hide the income input after the income has already been added
        monthlyIncome.classList.add('hidden');
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
    // Append the monthly income into the DOM
    monthlyIncomeEl.textContent = income;
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
        // Append the monthly income into the DOM
        monthlyIncomeEl.textContent = income;
    });
    calculateTotalExpense();
}

// Calculate the total of all expenses and append it to the DOM
function calculateTotalExpense() {
    // Calculate total expense out of all expenses and return new array
    let values = expenses.map(expense => {
        return expense.value;
    });
    // Reduce the sum array and get the sum of it
    sum = values.reduce((a, b) => a + b, 0);
    totalExpenseEl.textContent = `£${sum} `;
    calculateLeftOver();
}

// Calulcate the money that is left after subtracting expenses from income
function calculateLeftOver() {
    // If income and sum exist then get the leftOver and append it to DOM
    if (income && sum) {
        leftOver = income - sum;
        moneyLeftEl.textContent = `£${leftOver} `;
    }
}

// If income value is in local storage then do not display the income input
function checkIncomeValue() {
    if (localStorage.getItem('income')) {
        // If monthly income exists in LS then remove the required attribute and hide it from the form
        monthlyIncome.removeAttribute('required');
        monthlyIncome.classList.add('hidden');
    } else {
        monthlyIncome.classList.remove('hidden');
    }
}

// Append expense array to localStorage
function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('expenseId', expenseId);
    localStorage.setItem('income', income);
    localStorage.setItem('leftOver', leftOver);
}

// Update DOM with local storage 
function updateFromLocalStorage() {
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        expenseId = parseFloat(localStorage.getItem('expenseId'));
        income = parseFloat(localStorage.getItem('income'));
        leftOver = parseFloat(localStorage.getItem('leftOver'));
        rebuildDOM();
    }
}

let isActive = false;

// Get edited expense input and amend it to the DOM and recalculate the leftOver
function getEditedIncome() {
    // isActive = true;
    // console.log('isActive', isActive);
    monthlyIncomeEl.focus();
    monthlyIncomeEl.textContent = '';
    monthlyIncomeEl.addEventListener('keydown', (e) => {
        // When enter is pressed then save the new income amount and recalculate leftOver
        if (e.keyCode === 13) {
            e.preventDefault();
            monthlyIncomeEl.blur();
            // If the user edits but leaves the income blank, then set it to previous
            monthlyIncomeEl.textContent > 1 ? income = monthlyIncomeEl.textContent : monthlyIncomeEl.textContent = income;
            updateLocalStorage();
            calculateLeftOver();
        }
    });
}

// Get items from local storage on load
updateFromLocalStorage();
checkIncomeValue();

// Event listeners
expenseForm.addEventListener('submit', getInput);
editIncomeIcon.addEventListener('click', getEditedIncome);