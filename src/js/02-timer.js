// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
     
      console.log(selectedDates[0]);
      currentDifferenceDate(selectedDates[0]);
  },
};
// отримуємо доступ до елементів
const elemInput = document.getElementById("datetime-picker");
console.log(elemInput);
const buttonStart = document.querySelector('[data-start]');
console.log(buttonStart);
const elemTimer = document.querySelector('.timer');
console.log(elemTimer);
const elemField = document.querySelector('.field');
console.log(elemField);
const elemDays = document.querySelector('[data-days]');
console.log(elemDays);
const elemHours = document.querySelector('[data-hours]');
console.log(elemHours);
const elemMinutes = document.querySelector('[data-minutes]');
console.log(elemMinutes);
const elemSeconds = document.querySelector('[data-seconds]');
console.log(elemSeconds);

//встановлюємо початкові значення 
let timeDifference = 0;
let timerId = null;


flatpickr(elemInput, options);
console.log(flatpickr);

buttonStart.setAttribute('disabled', '');

// встановлюємо слухача на кнопку
buttonStart.addEventListener('click', onbuttonStartClick);

//запускаю таймер
function onbuttonStartClick() {
  timerId = setInterval(timer, 1000);
  buttonStart.setAttribute('disabled', ''); 
}

//таймер
function timer() {
  buttonStart.setAttribute('disabled', '');
  elemInput.setAttribute('disabled', true);
  timeDifference -= 1000;

};

// перевіряю правильність дати
function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    buttonStart.setAttribute('disabled', '');
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  buttonStart.removeAttribute('disabled', '');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}