document.addEventListener("DOMContentLoaded", function () {
  const btnEqual = document.querySelector(".equal");
  const operandInput1 = document.querySelector(".input:first-of-type");
  const operandInput2 = document.querySelector(".input:last-of-type");
  const operatorSelect = document.querySelector(".select");
  const result = document.querySelector(".result");

  btnEqual.addEventListener("click", () => calc());

  function calc() {
    const op1 = +operandInput1.value;
    const op2 = +operandInput2.value;
    const operator = operatorSelect.value;

    const OPERATORS = {
      "+": op1 + op2,
      "-": op1 - op2,
      "*": op1 * op2,
      "/": op2 !== 0 ? op1 / op2 : "Мой калькулятор не умеет делить на ноль :)",
    };

    if (operator in OPERATORS) {
      result.textContent = OPERATORS[operator];
    } else {
      result.textContent = "Неподдерживаемая операция";
    }
  }
});
