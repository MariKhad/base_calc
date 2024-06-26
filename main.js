document.addEventListener("DOMContentLoaded", function () {
  const btnEqual = document.querySelector(".equal");
  const operandInput1 = document.querySelector(".input:first-of-type");
  const operandInput2 = document.querySelector(".input:last-of-type");
  const operatorSelect = document.querySelector(".select");
  const result = document.querySelector(".result");

  btnEqual.addEventListener("click", () => calc());

  const numberRegex = /^-?\d*(\.\d+)?$/;

  operandInput1.addEventListener("input", validateInput);
  operandInput2.addEventListener("input", validateInput);

  //input type="nubmer" не работает в firefox
  function validateInput(event) {
    event.target.value = value.replace(/[^0-9.-]/g, "");
    if (event.target.value.indexOf("-") > 0) {
      event.target.value = value.replace(/-/g, "");
    }
    const parts = event.target.value.split(".");
    if (parts.length > 2) {
      event.target.value = parts.shift() + "." + parts.join("");
    }
  }

  function calc() {
    const op1 = +operandInput1.value;
    const op2 = +operandInput2.value;
    const operator = operatorSelect.value;

    if (isNaN(op1) || isNaN(op2)) {
      result.textContent = "Введите два числа";
      return;
    }

    const OPERATORS = {
      "+": op1 + op2,
      "-": op1 - op2,
      "*": op1 * op2,
      "/": op2 !== 0 ? op1 / op2 : "Мой калькулятор не умеет делить на ноль :)",
    };

    if (operator in OPERATORS) {
      result.textContent = OPERATORS[operator];
      operandInput1.value = "";
      operandInput2.value = "";
    } else {
      result.textContent = "Неподдерживаемая операция";
    }
  }
});
