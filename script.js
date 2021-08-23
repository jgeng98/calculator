// UIs
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const decimalButton = document.querySelector("#decimal");
const equalsButton = document.querySelector("#equals");
const currentExpression = document.querySelector("#current-expression");
const pastExpression = document.querySelector("#past-expression");

// starting values
let currentOperator;
let firstOperand;

// event listeners
numberButtons.forEach((number) => {
  number.addEventListener("click", () => addNumToScreen(number.textContent));
});

operatorButtons.forEach((operator) => {
  operator.addEventListener("click", (e) =>
    addOperatorToScreen(getOperator(e.currentTarget.id))
  );
});

clearButton.addEventListener("click", clearScreen);
backspaceButton.addEventListener("click", undoCharacter);
decimalButton.addEventListener("click", addDecimal);
equalsButton.addEventListener("click", clickEvaluate);

// calculator functionality
function getOperator(operatorID) {
  // returns the correct operator symbol
  switch (operatorID) {
    case "divide":
      return "÷";
    case "times":
      return "×";
    case "minus":
      return "−";
    case "plus":
      return "+";
  }
}

function addNumToScreen(number) {
  // if calculator hasn't been used yet, remove the 0 from the display
  if (currentExpression.textContent === "0") {
    currentExpression.textContent = "";
  }

  // if current expression screen contains an "_" (ie. is an un unfinished expression), remove underscore and append number
  // otherwise, if past expression screen contains an "=", then an expression was just calculated, so clear the screen before appending numbers
  // otherwise, continue appending numbers as usual
  if (currentExpression.textContent.includes("_")) {
    currentExpression.textContent = "" + number;
  } else if (pastExpression.textContent.includes("=")) {
    clearScreen();
    currentExpression.textContent = "";
    currentExpression.textContent += number;
  } else {
    currentExpression.textContent += number;
  }
}

function addOperatorToScreen(operator) {
  // remember the last operand that was clicked
  firstOperand = currentExpression.textContent;

  //   if there is a current operator and the last operand was actually a number, then we can evaluate the expression
  if (currentOperator && firstOperand !== "_") {
    evaluate();
    pastExpression.textContent = currentExpression.textContent + " " + operator;
    currentExpression.textContent = "_";
  }

  // if the past expression screen is currently empty, that means it's the first operator in the expression
  // otherwise, it's a change in operator, so replace the previous operator with the newly clicked operator
  if (pastExpression.textContent === "") {
    if (currentExpression.textContent.length >= 15) {
      currentOperand = +currentExpression.textContent;
      pastExpression.textContent =
        currentOperand.toExponential() + " " + operator;
    } else {
      // move the past operand and the operation to the previous expression screen
      pastExpression.textContent =
        currentExpression.textContent + " " + operator;
    }

    // display an "_" in the current expression screen to indicate an unfinished expression
    currentExpression.textContent = "" + "_";
  } else {
    pastExpression.textContent =
      pastExpression.textContent.slice(0, -1) + operator;
  }

  // set the current operator flag to be true
  currentOperator = true;
}

function addDecimal() {
  // if there's already a decimal point in the current expression, don't do anything
  if (currentExpression.textContent.includes(".")) {
    return;
  }

  // if the past expression screen contains an equals sign, clear the screen
  if (pastExpression.textContent.includes("=")) {
    clearScreen();
  }

  // if the current expression screen contains an underscore, replace it with a zero
  // otherwise, append a decimal point to the current expression
  if (currentExpression.textContent.includes("_")) {
    currentExpression.textContent = "0.";
  } else {
    currentExpression.textContent += ".";
  }
}

function evaluateExpression(firstOperand, operator, secondOperand) {
  // call the correct function depending on the operator
  switch (operator) {
    case "÷":
      return divide(firstOperand, secondOperand);
    case "×":
      return multiply(firstOperand, secondOperand);
    case "+":
      return add(firstOperand, secondOperand);
    case "−":
      return subtract(firstOperand, secondOperand);
  }
}

function evaluate() {
  // throw an alert if the user tries dividing by zero
  if (currentOperator === "÷" && currentExpression.textContent === "0") {
    alert("Uh oh, you tried dividing by zero! That's not allowed.");
  }

  // appends the last clicked number (operand) to the past expression screen
  pastExpression.textContent += " " + currentExpression.textContent;

  // split the string in the past expression screen to determine the operands and the operator
  let [operand1, operator, operand2] = pastExpression.textContent.split(" ");

  // evaluate the expression and display the result on the current expression screen
  currentExpression.textContent = roundResult(
    evaluateExpression(operand1, operator, operand2)
  );

  // set the current operator flag to be false
  currentOperator = false;
}

function clickEvaluate() {
  // if past expression screen contains an "=", then an expression was recently evaluated, so do nothing
  if (pastExpression.textContent.includes("=")) {
    return;
  }

  // if there's currently an "_" in the current expression screen, then do nothing because there aren't enough operands
  if (currentExpression.textContent === "_") {
    return;
  }

  // if there is nothing displayed in the past expression screen, then do nothing because a complete expression hasn't been inputted
  if (pastExpression.textContent === "") {
    return;
  }

  // append the last clicked number to the past expression screen and an equals sign
  pastExpression.textContent += " " + currentExpression.textContent + " = ";

  // split the string in the past expression screen to determine the operands and the operator
  let [operand1, operator, operand2] = pastExpression.textContent.split(" ");

  // evaluate the expression and display the result on the screen
  currentExpression.textContent = roundResult(
    evaluateExpression(operand1, operator, operand2)
  );
}

function undoCharacter() {
  // if past expression screen contains an "=", then an expression was just evaluated so clear the screen
  if (pastExpression.textContent.includes("=")) {
    clearScreen();
    return;
  }

  // removes the last character from the current expression
  currentExpression.textContent = currentExpression.textContent.slice(0, -1);

  if (currentExpression.textContent === "") {
    currentExpression.textContent = 0;
  }
}

function clearScreen() {
  // resets the past and current expression screens
  pastExpression.textContent = "";
  currentExpression.textContent = "0";

  // reset the global variables
  firstOperand = "";
  currentOperator = false;
}

// calculator functions
function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  return +a / +b;
}
