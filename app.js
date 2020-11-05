// DOM selectors
const dateSelector = document.querySelector("#date-selector");
const inputValue = document.querySelector("#input-value");
const submitButton = document.querySelector("#submit-button");
const expenseContainer = document.querySelector("#data-container");
const expenseCard = document.querySelector("#expense-card");
const amountSpent = document.querySelector("#money-amount");
const dateSpent = document.querySelector("#date-spent");

const hello = "THIS IS MY TEST TEXT";

function cloneExpenseCard(e, date, expense) {
    // Prevent page refresh on submit
    e.preventDefault();
    let cardClone = expenseCard.cloneNode(true);
    expenseContainer.appendChild(cardClone);
}

// Add date and expense value into element
function modifyData(e) {
    e.preventDefault();
    let expenseValue = inputValue.value;
    let dateValue = dateSelector.value;
    if (dateValue.length && expenseValue.length) {
        amountSpent.textContent = expenseValue;
        dateSpent.textContent = dateValue;
        cloneExpenseCard(e, expenseValue, dateValue);
        // console.log(dateValue, expenseValue);
    } else {
        alert("Please fill in the date and expense amount");
    }
    inputValue.value = "";
    dateSelector.value = "";
}

submitButton.addEventListener("click", modifyData);