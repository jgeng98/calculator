// UIs
let buttons = document.querySelectorAll("button");

// event listeners
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    clickButton(e.currentTarget.id);
  });
});

// calculator functionality
