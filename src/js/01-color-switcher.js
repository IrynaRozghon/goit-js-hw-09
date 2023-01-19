const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const page = document.querySelector('body');
let colorful = null;



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


function colorChangeFirst() {
buttonStart.setAttribute('disabled', '');
 page.style.backgroundColor = getRandomHexColor();
}

buttonStart.addEventListener("click", () => {
  colorChangeFirst();
  buttonStop.removeAttribute('disabled');
  colorful = setInterval(() => {
    page.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener("click", () => {
  clearInterval(colorful);
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', '');
});

