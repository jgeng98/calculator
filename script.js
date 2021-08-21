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
let lastOperand;

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
equalsButton.addEventListener("click", evaluate);

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
  // otherwise, continue appending numbers as usual
  if (currentExpression.textContent.includes("_")) {
    currentExpression.textContent = "" + number;
  } else {
    currentExpression.textContent += number;
  }
}

function addOperatorToScreen(operator) {
  // remember the last operand that was clicked
  lastOperand = currentExpression.textContent;

  // if no number has been inputted yet, return nothing
  if (currentExpression.textContent === "0") {
    return;
  }

  //   if there is a current operator and the last operand was actually a number, then we can evaluate the expression
  if (currentOperator !== null && lastOperand !== "_") {
    evaluate();
  }

  // if the past expression screen is currently empty, that means it's the first operator in the expression
  // otherwise, it's a change in operator, so replace the previous operator with the newly clicked operator
  if (pastExpression.textContent === "") {
    // move the past operand and the operation to the previous expression screen
    pastExpression.textContent = currentExpression.textContent + operator;
    // display an "_" in the current expression screen to indicate an unfinished expression
    currentExpression.textContent = "" + "_";
  } else {
    pastExpression.textContent =
      pastExpression.textContent.slice(0, -1) + operator;
  }

  // set the current operator variable
  currentOperator = operator;
}

function addDecimal() {
  // if there's already a decimal point in the current expression, don't do anything
  if (currentExpression.textContent.includes(".")) {
    return;
  }

  // otherwise, append a decimal point to the current expression
  currentExpression.textContent += ".";
}

function evaluateExpression() {}

function evaluate() {}

function undoCharacter() {
  // removes the last character from the current expression
  currentExpression.textContent = currentExpression.textContent.slice(0, -1);

  if (currentExpression.textContent === "") {
    currentExpression.textContent = 0;
  }
}

function clearScreen() {
  pastExpression.textContent = "";
  currentExpression.textContent = "0";
}

// calculator functions
function roundResult(num) {
  return Math.round(num * 100) / 100;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
