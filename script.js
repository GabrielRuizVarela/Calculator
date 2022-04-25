const pastScreen = document.querySelector("#pastScreen");
const currentScreen = document.querySelector("#currentScreen");
const operators = document.querySelectorAll("[data-operator]");
const dot = document.querySelector("#dot");
const numbers = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("#deleteButton");
const clearButton = document.querySelector("#clearButton");
let lastInputWasOperator = false;
let firstOperation = true;

numbers.forEach(number => number.addEventListener("click", setNumberScreen));
operators.forEach(operator => operator.addEventListener("click", setOperatorScreen));
dot.addEventListener("click",setScreenDot);
clearButton.addEventListener('click',clearScreen);
deleteButton.addEventListener('click',deleteNumber);
document.addEventListener("keydown", (event) =>{
    if(event.key==='Enter'){
        document.getElementById('=').click();
    }
    if((event.key!==' ' && !isNaN(event.key) && 0 >= event.key <= 9) ||
            ['+','-','/','=','*'].includes(event.key)){
        document.getElementById(`${event.key}`).click();
    }
    if(event.key==='Backspace'){
        
        document.getElementById('deleteButton').click();
    }
});

function deleteNumber(){
    currentScreen.textContent = currentScreen.textContent.slice(0,-1);
}

function clearScreen(){
    currentScreen.textContent = '';
    pastScreen.textContent = '';
    lastInputWasOperator = false;
    firstOperation = true;
}

function setScreenDot(){
    if(lastInputWasOperator || currentScreen.textContent==='ERROR' || currentScreen.textContent.includes('.')){
        return;
    }
    currentScreen.textContent = currentScreen.textContent + this.textContent;
    lastInputWasOperator = false;
}

function setNumberScreen(){
    if(lastInputWasOperator || currentScreen.textContent==='ERROR'){
        currentScreen.textContent ="";
    }
    currentScreen.textContent = currentScreen.textContent + this.textContent;
    lastInputWasOperator = false;
}

function setOperatorScreen(){
    lastInputWasOperator = true;
    if(currentScreen.textContent==='ERROR'){
        firstOperation=true;
        pastScreen.textContent = '';
    }
    if(firstOperation){
        if(currentScreen.textContent==='') return
        if(this.textContent!=='='){
            pastScreen.textContent = `${currentScreen.textContent} ${this.textContent}`;
            currentScreen.textContent = '';
            firstOperation = false;
            return;
        }
    } 
    if(currentScreen.textContent==='' && this.textContent!=='='){
        pastScreen.textContent = `${pastScreen.textContent.slice(0,-2)} ${this.textContent}`;
        return;
    }
    if(this.textContent==='=' && currentScreen.textContent!=='' && pastScreen.textContent!=='' &&!pastScreen.textContent.includes('=')){
        let firstNumber = Number(pastScreen.textContent.slice(0,-2));
        let secondNumber = Number(currentScreen.textContent);
        let operator = pastScreen.textContent.slice(-1);
        let result = operate(firstNumber,secondNumber,operator);
        pastScreen.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
        currentScreen.textContent = result;
        return;
    }
    if(pastScreen.textContent.includes('=') && this.textContent!=='='){
        pastScreen.textContent = `${currentScreen.textContent} ${this.textContent}`;
        currentScreen.textContent = '';
        return;
    } else if(currentScreen.textContent!=='' && pastScreen.textContent!=='' && !pastScreen.textContent.includes('=')){
        let firstNumber = Number(pastScreen.textContent.slice(0,-2));
        let secondNumber = Number(currentScreen.textContent);
        let operator = pastScreen.textContent.slice(-1);
        let result = operate(firstNumber,secondNumber,operator);
        pastScreen.textContent = `${result} ${this.textContent}`;
        currentScreen.textContent = '';
        return;
    }
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b===0) return 'ERROR';
    return a/b;
}

function operate(a, b, operator){
    if (operator==='+') return Number(add(a,b).toFixed(7));
    if (operator==='-') return Number(subtract(a,b).toFixed(7));
    if (operator==='×') return Number(multiply(a,b).toFixed(7));
    if (operator==='/') return Number(divide(a,b).toFixed(7));
    
}

function setResultScreen(a,b,operator,result){
    pastScreen.textContent = `${a} ${operator} ${b} =`
}
