class Calculator {
  constructor(prevOprandTextEle, currentOprandTextEle) {
    this.prevOprandTextEle = prevOprandTextEle;
    this.currentOprandTextEle = currentOprandTextEle;
    this.clear();
  }

  clear() {
    this.currentOprand = "";
    this.prevOprand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOprand = this.currentOprand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOprand.includes(".")) {
      return;
    }
    this.currentOprand = this.currentOprand.toString() + number.toString();
  }

  setOperation(operation) {
    if (this.currentOprand === "") {
      return;
    }

    if (this.prevOprand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOprand = this.currentOprand;
    this.currentOprand = "";
  }

  compute() {
    let computation;
    let prev = parseFloat(this.prevOprand);
    let current = parseFloat(this.currentOprand);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;

      case "-":
        computation = prev - current;
        break;

      case "*":
        computation = prev * current;
        break;

      case "÷":
        computation = prev / current;
        break;

      default:
        return;
    }

    this.operation = undefined;
    this.currentOprand = computation;
    this.prevOprand = "";
  }

  formatCurrent(numberString) {
    const numberArray = numberString.toString().split(".");
    let digitPart = parseFloat(numberArray[0]);
    let decimalPart = numberArray[1];

    let intgerDisplay;
    if (isNaN(digitPart)) {
      intgerDisplay = "";
    } else {
      intgerDisplay = digitPart.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalPart != null) {
      return `${intgerDisplay}.${decimalPart}`;
    } else {
      return intgerDisplay;
    }
  }

  updateDispaly() {
    this.currentOprandTextEle.innerText = this.formatCurrent(
      this.currentOprand
    );
    this.prevOprandTextEle.innerText = this.operation
      ? `${this.prevOprand} ${this.operation}`
      : "";
  }
}

const numberButtons = document.querySelectorAll("[data-number]");

const operationButtons = document.querySelectorAll("[data-operation]");

const clearButton = document.querySelector("[data-clear-all]");

const deleteButton = document.querySelector("[data-delete]");

const equalButton = document.querySelector("[data-equal]");

const prevOprandTextEle = document.querySelector("[data-prev-operand]");

const currentOprandTextEle = document.querySelector("[data-current-operand]");

const calculator = new Calculator(prevOprandTextEle, currentOprandTextEle);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDispaly();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.setOperation(button.innerText);
    calculator.updateDispaly();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDispaly();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDispaly();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDispaly();
});
