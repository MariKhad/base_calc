document.addEventListener("DOMContentLoaded", function () {
  const btnEqual = document.querySelector(".equal");
  const operandInput1 = document.querySelector(".input:first-of-type");
  const operandInput2 = document.querySelector(".input:last-of-type");
  const operatorSelect = document.querySelector(".select");
  const result = document.querySelector(".result");
  const changeBgBtn = document.querySelector("#change-bg");
  const randomBgBtn = document.querySelector("#random-bg");
  let isChangedOnce = false;
  let isChanging = false;
  const colors = [
    "#01834F",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#A833FF",
    "#FFD133",
    "#33FFD1",
    "#D133FF",
    "#33A8FF",
    "#FFFFFF",
    "#00FFFF",
    "#FF00FF",
    "#1C1C1C",
  ];

  btnEqual.addEventListener("click", calc);
  changeBgBtn.addEventListener("click", onClickChangeBgColor);
  randomBgBtn.addEventListener("click", onClickRandomBgColor);

  operandInput1.addEventListener("input", validateInput);
  operandInput2.addEventListener("input", validateInput);

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

  function onClickChangeBgColor() {
    if (!isChangedOnce) {
      bgcolor = changeBgBtn.dataset.color;
      document.body.style.backgroundColor = bgcolor;
      isChangedOnce = true;
      changeBgBtn.textContent = "Обратно ";
    } else {
      document.body.style.backgroundColor = "#fff";
      isChangedOnce = false;
      changeBgBtn.textContent = "Один раз";
    }
  }

  function onClickRandomBgColor() {
    if (!isChanging) {
      isChanging = true;
      randomBgBtn.textContent = "Стоп";
      const interval = setInterval(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;

        if (!isChanging) {
          clearInterval(interval);
          resetButtonAndBackground();
        }
      }, 2000);
    } else {
      isChanging = false;
      resetButtonAndBackground();
    }
  }

  function resetButtonAndBackground() {
    randomBgBtn.textContent = "Много раз";
    document.body.style.backgroundColor = "#fff";
  }
});
