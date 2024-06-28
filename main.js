document.addEventListener("DOMContentLoaded", function () {
  const btnEqual = document.querySelector(".equal");
  const operandInput1 = document.querySelector(".input:first-of-type");
  const operandInput2 = document.querySelector(".input:last-of-type");
  const operatorSelect = document.querySelector(".select");
  const resultList = document.querySelector(".result_list");
  btnEqual.addEventListener("click", calc);

  operandInput1.addEventListener("input", validateInput);
  operandInput2.addEventListener("input", validateInput);

  resultList.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn_del")) {
      event.target.parentElement.remove();
    }
  });

  //input type="nubmer" не работает в firefox
  function validateInput(event) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9.-]/g, "");
  }

  function calc() {
    const op1 = +operandInput1.value;
    const op2 = +operandInput2.value;
    const operator = operatorSelect.value;

    if (isNaN(op1) || isNaN(op2)) {
      resultList.textContent = "Введите два числа";
      return;
    }

    const OPERATORS = {
      "+": op1 + op2,
      "-": op1 - op2,
      "*": op1 * op2,
      "/": op2 !== 0 ? op1 / op2 : "Мой калькулятор не умеет делить на ноль :)",
    };

    if (operator in OPERATORS) {
      let resultNode = createResultNode(OPERATORS[operator]);
      resultList.appendChild(resultNode);
      DEL_BTNS = document.querySelectorAll(".btn_del");
      operandInput1.value = "";
      operandInput2.value = "";
    } else {
      resultList.textContent = "Неподдерживаемая операция";
    }
  }

  function createResultNode(result) {
    let li = document.createElement("li");
    li.classList.add("result_li");
    let p = document.createElement("p");
    p.textContent = result;
    let button = document.createElement("button");
    button.classList.add("btn_del");
    li.append(p);
    li.append(button);
    return li;
  }
});
