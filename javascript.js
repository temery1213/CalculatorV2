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

