// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date()
    if (selectedDates[0] < currentDate) {
      return Notify.failure("Please choose a date in the future");
    }
   buttonStart.disabled = false;
    console.log(selectedDates[0]);
  }
   
};
// отримуємо доступ до елементів
const elemInput = document.getElementById("datetime-picker");
const buttonStart = document.querySelector('[data-start]');
const elemDays = document.querySelector('[data-days]');
const elemHours = document.querySelector('[data-hours]');
const elemMinutes = document.querySelector('[data-minutes]');
const elemSeconds = document.querySelector('[data-seconds]');


// //встановлюємо початкові значення 
let timeDifference = null;


flatpickr(elemInput, options);

buttonStart.disabled = true;

// // встановлюємо слухача на кнопку
buttonStart.addEventListener('click', onbuttonStartClick);
 
function onbuttonStartClick(){
    const selectedDate = elemInput.value
    const expectedDate = new Date(selectedDate);
    timeDifference = setInterval(() => { 
    const currentDate = new Date()
    const time = expectedDate - currentDate
    const timeData = convertMs(time)  
    const { days, hours, minutes, seconds } = timeData;
    elemDays.textContent = addLeadingZero(`${days}`)        
    elemHours .textContent = addLeadingZero(`${hours}`)        
    elemMinutes.textContent = addLeadingZero(`${minutes}`)        
    elemSeconds.textContent = addLeadingZero(`${seconds}`)  
    if (time <= 1000) {
        clearInterval(timeDifference);
        return Notify.success('The time has come!');

      }      
    }, 1000)
    buttonStart.disabled = true;  
   
};

 function addLeadingZero(value){
    return value.padStart(2, '0')
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