const userInput = document.getElementById('userInput');
const memory = document.getElementById('memory');

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

const numadd = document.getElementById("add");
const numsubtract = document.getElementById("subtract");
const nummultiply = document.getElementById("multiply");
const numdivide = document.getElementById("divide");
const backspace = document.getElementById("backSpace");
const clear = document.getElementById("clear");
const numequals = document.getElementById("equals");

const decimal = document.getElementById('decimal');
const equalsButton = document.getElementById('equals');
const numberButtons = document.querySelectorAll(".numberButton");
const operatorButtons = document.querySelectorAll('.operatorButton');
const negativePositive = document.getElementById('negativePositive')

const memoryWipe = document.getElementById('memoryWipe');

let currentInput = '';
let numbers = [];
let operators = [];
let lastWasEquals = false;



///Arithmetic logic
let addition = (a, b, ...rest) => [a, b, ...rest].reduce((sum, num) => sum + num, 0);
let subtraction = (a, b, ...rest) => [a, b, ...rest].reduce((result, num) => result - num);
let multiplication = (a, b, ...rest) => [a, b, ...rest].reduce((prod, num) => prod * num);
let division = (a, b, ...rest) => [a, b, ...rest].reduce((result, num) => result / num);
///

/// Operator logic
function operation(operator) {
    switch (operator) {
        case '+':
            return addition(...numbers)
        
        case '-':
            return subtraction(...numbers)

        case '*':
            return multiplication(...numbers)
        
        case '/':
            return division(...numbers)
    }
}

/// Equals button
equalsButton.addEventListener('click', () => {
    if (currentInput === '' || operators.length === 0) return;

    try {
        const res = evaluateExpression([...numbers, Number(currentInput)], operators);

        userInput.textContent = res;

        // Build full expression for memory
        let fullExpression = '';
        for (let i = 0; i < numbers.length; i++) {
            fullExpression += numbers[i];
            if (operators[i]) {
                fullExpression += ` ${operators[i]} `;
            }
        }
        fullExpression += currentInput;

        let memoryEntry = `${fullExpression} = ${res}`;

        const memoryLog = document.getElementById('memoryLog')
        const p = document.createElement('p');
        p.textContent = memoryEntry;
        memoryLog.appendChild(p);

        currentInput = res.toString();
        numbers = [];
        operators = [];
        lastWasEquals = true;

    } catch (error) {
        alert(error.message);
        userInput.textContent = '';
        currentInput = '';
        numbers = [];
        operators = [];
        lastWasEquals = false;
    }
});
///



/// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", function () {
        if (currentInput === '' && numbers.length === 0) {
            return;
        }
        const lastChar = userInput.textContent.trim().slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) { 
            return 
        }

        if (lastWasEquals) {

            numbers = [Number(currentInput)];
            operators = [];
            lastWasEquals = false;

        } else {
            numbers.push(Number(currentInput));
        }

        operators.push(button.textContent);
        currentInput = '';
        userInput.innerHTML += '&nbsp;' + button.textContent + '&nbsp;';
    });
});
///   

/// Append numbers
    function appendNumberToDisplay(number) {
        if (lastWasEquals) {
            userInput.textContent = '';
            currentInput = '';
            lastWasEquals = false;
        }

    
    if (currentInput.length >= 15) {
        return; 
        }

        currentInput += number;
        userInput.textContent += number;
    }

    numberButtons.forEach(button => {
        button.addEventListener("click", function () {
            appendNumberToDisplay(button.textContent);
        });
    });
 
///

///clear and reset///
    document.getElementById('clear').addEventListener('click', function(){
        userInput.textContent = '';
        currentInput = '';
    });
    
  
  
    document.getElementById('backSpace').addEventListener("click", function() {
        userInput.textContent = userInput.textContent.slice(0, -1);
        currentInput = currentInput.slice(0, -1);
});
///


document.getElementById('negativePositive').addEventListener('click', function () {
    if (currentInput) {
        if (currentInput[0] === '-') {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = '-' + currentInput;
        }
        userInput.textContent = currentInput;
    }
});

/// Decimal logic

decimal.addEventListener("click", function(){
    if(!currentInput.includes('.')) {
    appendNumberToDisplay(".");
    }
});


///

/// Keyboard support
document.addEventListener("keyup", function (event) {
    const key = event.key;
  
    if (/[0-9]/.test(key)) {
      appendNumberToDisplay(key);
    } else if (key === "+") {
      event.preventDefault();
      numadd.click();
    } else if (key === "-") {
      numsubtract.click();
    } else if (key === "*") {
      nummultiply.click();
    } else if (key === "/") {
      numdivide.click();
    } else if (key === "Backspace") {
      backspace.click();
    } else if (key === "Delete") {
      clear.click();
    } else if (key === "." && !currentInput.includes(".")) {
        decimal.click();
    
    } else if (event.key === 'Enter') {
      event.preventDefault();
      numequals.click();
    }
  });

///PEMDAS

function evaluateExpression(numbers, operators) {
    const expression = [];

   
    for (let i = 0; i < numbers.length; i++) {
        expression.push(numbers[i]);
        if (operators[i]) {
            expression.push(operators[i]);
        }
    }

    
    const apply = (expr, ops) => {
        let i = 0;
        while (i < expr.length) {
            if (ops.includes(expr[i])) {
                const op = expr[i];
                const a = expr[i - 1];
                const b = expr[i + 1];


                if (op === '/' && b === 0) {
                    throw new Error("Are you trying to break the universe?");
                }
                
                let result;
                switch (op) {
                    case '*': result = a * b; break;
                    case '/': result = a / b; break;
                    case '+': result = a + b; break;
                    case '-': result = a - b; break;
                }

               
                expr.splice(i - 1, 3, result);
                i = i - 1; 
            } else {
                i++;
            }
        }
    };

    
    apply(expression, ['*', '/']);
    
    apply(expression, ['+', '-']);

    return expression[0];
}
///

memoryWipe.addEventListener("click", function(){
    memoryLog.textContent = '';
    });