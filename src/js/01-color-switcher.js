const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector("body");
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startBtn.addEventListener("click", () => {
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
    startBtn.setAttribute("disabled", true);
    stopBtn.removeAttribute("disabled");
});

stopBtn.disabled = true;
stopBtn.addEventListener("click", () => {
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", true)

    clearInterval(interval);
});

// function clickOnStart() {
//     startBtn.disabled = true;
//     stopBtn.disableButton = false;
// }

// function clickOnStop() {
//     stopBtn.disableButton = true;
//      startBtn.disabled = false;
// }

// startBtn.addEventListener('click', clickOnStart);
// stopBtn.addEventListener('click', clickOnStop);