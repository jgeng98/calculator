// UIs
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const decimalButton = document.querySelector("#decimal");
const equalsButton = document.querySelector("#equals");
const currentExpression = document.querySelector("#current-expression");
const pastExpression = document.querySelector("#past-expression");

// event listeners
numberButtons.forEach((number) => {
  number.addEventListener("click", () => addNumToScreen(number.textContent));
});

operationButtons.forEach((operation) => {
  operation.addEventListener("click", () =>
    addOperationToScreen(operation.textContent)
  );
});

clearButton.addEventListener("click", clearScreen);
backspaceButton.addEventListener("click", undoCharacter);
decimalButton.addEventListener("click", addDecimal);
equalsButton.addEventListener("click", evaluateExpression);

// calculator functionality
function addNumToScreen(number) {
  // if calculator hasn't been used yet, remove the 0 from the display
  if (currentExpression.textContent === "0") {
    currentExpression.textContent = "";
  }

  // append the clicked number to the current expression screen
  currentExpression.textContent += number;
}

function addOperationToScreen(operation) {}

function addDecimal() {}

function evaluateExpression() {}

function undoCharacter() {}

function clearScreen() {
  pastExpression.textContent = "";
  currentExpression.textContent = "0";
}
