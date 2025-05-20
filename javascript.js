const userInput = document.getElementById('userInput');
const result = document.getElementById('result');

const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");

let currentInput = '';
let numbers = [];
let currentOperator = null;




let addition = (a, b, ...rest) => [a, b, ...rest].reduce((sum, num) => sum + num, 0);
let subtraction = (a, b, ...rest) => [a, b, ...rest].reduce((result, num) => result - num);
let multiplication = (a, b, ...rest) => [a, b, ...rest].reduce((prod, num) => prod * num);
let division = (a, b, ...rest) => [a, b, ...rest].reduce((result, num) => result / num);

function operation(operator) {
    switch (operator) {
        case '+':
            result = addition(...numbers)
            break;
        
        case '-':
            result = subtraction(...numbers)
            break;

        case '*':
            result = multiplication(...numbers)
            break;
        
        case '/':
            result = division(...numbers)
            break;
    }
}


    function appendNumberToDisplay(number) {
        currentInput += number;
        userInput.textContent += number;
    };


    const numberButtons = document.querySelectorAll(".numberButton");

    numberButtons.forEach(button => {
        button.addEventListener("click", function () {
            appendNumberToDisplay(button.textContent);
        });
    });




    document.getElementById('clear').addEventListener('click', function(){
        userInput.textContent = '';
        result.textContent = '';
        currentInput = '';
    });
    
  
  
    document.getElementById('backSpace').addEventListener("click", function() {
        userInput.textContent = userInput.textContent.slice(0, -1);
        currentInput = currentInput.slice(0, -1);
});