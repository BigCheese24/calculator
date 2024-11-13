let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function() {
    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let  previousScreen = document.querySelector(".previous");
    let  currentScreen = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener("click", function(e){
            handleNumber(e.target.textContent)
            currentScreen.textContent = currentValue;
    }));

    operators.forEach((op) => op.addEventListener("click", function(e) {
         handleOperator(e.target.textContent)
         previousScreen.textContent = previousValue + " " + operator;
         currentScreen.textContent = currentValue;

    }));

    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    });

    equal.addEventListener("click", function() {
        calculate()
        previousScreen.textContent = '';
        if(previousValue.length <= 5) {
            currentScreen.textContent = previousValue;
        } else {
            currentScreen.textContent = previousValue.slice(0,5) + " ..."; 
        }
    })

    decimal.addEventListener("click", function(){
        addDecimal();
    });

    //adding Keyboard functionality
    document.addEventListener("keydown", function(e) {
        if(e.key >= '0' && e.key <= '9') {
            handleNumber(e.key);
        } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
            handleOperator(e.key === "*" ? "x" : e.key);
        } else if(e.key === "Enter" || e.key === "=") {
            calculate();
            previousScreen.textContent = '';
        } else if(e.key === ".") {
            addDecimal();
        } else if(e.key === "Escape") {
            clear.click();
        }

        currentScreen.textContent = currentValue;
        previousScreen.textContent = previousValue + " " + operator;
    });
});

function handleNumber(num) {
    if(currentValue.length <= 6){
        currentValue += num;
    }
}

function handleOperator(op) {
        operator = op;
        previousValue = currentValue;
        currentValue = '';

}

function calculate() {
        previousValue = Number(previousValue);
        currentValue = Number(currentValue);

        if(operator === "+"){
            previousValue += currentValue;
        } else if(operator === "-"){
            previousValue -= currentValue;
        } else if(operator === "x"){
            previousValue *= currentValue;
        } else {
            previousValue /= currentValue;
        }

        previousValue = roundNumber(previousValue);
        previousValue = previousValue.toString();
        currentValue = previousValue.toString();

}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal() {
       if(!currentValue.includes(".")){
        currentValue += '.';
       } 
}