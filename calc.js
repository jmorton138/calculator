// document.addEventListener('DOMContentLoaded', function() {

// });

const nums = document.querySelectorAll('.num');
const clearBtn = document.querySelector('#clear');
const show = document.getElementById('display');
const equals = document.getElementById('equals');
const operators = document.querySelectorAll('.op');
const deleteBtn = document.getElementById('backspace');
let opType;
let num1;
let num2;
let result;
let newEquation = true;
nums.forEach(num => {
    num.addEventListener('click',() => display(num.innerText));
});

operators.forEach(operator => {
    operator.addEventListener('click', () => storeOperater(operator.value));
});

clearBtn.addEventListener('click', () => clear());

equals.addEventListener('click', () => operate(opType, num1, num2));

deleteBtn.addEventListener('click', () => deleteChar())

document.addEventListener('keyup', typeKey);

function typeKey(e) {
    if (e.key == "+" || e.key == "-" || e.key =="/" || e.key == "*") {
        console.log(e.key);
        storeOperater(e.key);
    }
    else if (e.code.search("Digit") !== -1 || e.code == "Period") {
      display(e.key);
    }  else if (e.key == "=" || e.key == "Enter") {
        if (opType && num1 && num2) {
            operate(opType, num1, num2);
        }
    }
    if (e.key == "Backspace") {
        deleteChar();
    }
 
    // console.log(e);

}
function clear() {
    num1 = undefined;
    num2 = undefined;
    opType = undefined;
    show.innerText = "";
}

function checkDecimal(num) {
    if (num == ".") {
    let total = show.innerText;
    if (total.indexOf(".") !== -1) {
        console.log(total.indexOf("."))
        return;
    }
    }  

}

function deleteChar() {
    let string = show.innerText;
    string = string.slice(0, string.length-1);
    clear();
    display(string);
    //show.innerText = string;

}

function display(num) {
    //new display value when user enters number after sum

    if (result) {
        let stringRes = result.toString();
        //if not with 10 decimal places round to 10th decimal place
        if (stringRes.indexOf(".") !== -1) {
            let index = stringRes.indexOf(".");
            let decPlaces = stringRes.length - index;
            if (decPlaces > 17) {
                num = result.toFixed(17);
                }
            
        }
    
        show.innerText = show.innerText + num;
        result = false;
        
    } else if (num1 && !opType && !num2 && newEquation === true) {
        newEquation = false;
        show.innerText ="";
        show.innerText = show.innerText + num;
        num1 = show.innerText;
        
      
    } else if (num1 && !opType && !num2 && !newEquation) {
        //stop user from entering more than one decimal
        if (num == ".") {
        let total = show.innerText;
        if (total.indexOf(".") !== -1) {
            console.log(total.indexOf("."))
            return;
            }
        }
        if (show.innerText.length < 25) {
            show.innerText = show.innerText + num;
        }  
        num1 = show.innerText;
      
    } 
    // display and get value for second number
    else if (num1 && opType && !num2) {
        show.innerText="";
        show.innerText = show.innerText + num;
        num2 = show.innerText;
    } 
    //update second number
    else if (num1 && opType && num2){
        //stop user from entering more than one decimal
        if (num == ".") {
        let total = show.innerText;
        if (total.indexOf(".") !== -1) {
            console.log(total.indexOf("."))
            return;
            }
        }
        if (show.innerText.length < 25) {
            show.innerText = show.innerText + num;
        }  
        num2 = show.innerText;
    } 
    //clear error message when begin
    else if (num == "ERROR") {
        show.innerText="ERROR";
        num1 = undefined;
        num2 = undefined;
        opType = undefined;
        //num1 = show.innerText;
    } else if (!num1 && !opType && !num2) {
        show.innerText ="";
        newEquation = false;
        show.innerText = show.innerText + num;
        num1 = show.innerText;
    } 
}

//convert strings to equation
function storeOperater(operator) {

    if (num1 && num2 && opType) {
        return operate(opType, num1, num2);
    } else {  
        opType = operator;
        num1 = show.innerText;
        if (num1 == "ERROR") {
        //opType = undefined;
        num1 = num2;
        num2 = undefined;
        opType = undefined;
        return;
    }
    }
}

function operate(operator, numA, numB) {
    //does nothing unless user enters 2 numbers and operator
    if (!numA || !numB || !operator) {
        return;
    }

    //handle math operations
    if (operator === '+') {
        result = parseFloat(numA) + parseFloat(numB);

    }
      if (operator === '-') {
          result = parseFloat(numA) - parseFloat(numB);
    }
      if (operator === '*') {
        result = parseFloat(numA) * parseFloat(numB);
    }
      if (operator === '/') {
        if (numB == 0) {
            clear();
            result ="ERROR";
            return display(result);
        } else {
            result = parseFloat(numA) / parseFloat(numB);
        } 
    }
    num1 = result;
    num2 = undefined;
    opType = undefined;
    newEquation = true;    
    show.innerText="";
    return display(result);

}

//round decimal result
//keyboard support




