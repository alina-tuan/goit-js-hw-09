import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// const timerStyle = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const currentTime = Date.now();
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minsRef = document.querySelector('span[data-minutes]');
const secsRef = document.querySelector('span[data-seconds]');

// Оформлення
// timerStyle.style.display = 'flex';
// timerStyle.style.gap = '40px';

btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    
      // alert("Please choose a date in the future");
      btnStart.setAttribute('disabled', true);
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);
btnStart.addEventListener('click', onBtnStartClick);

let interval = null;

function onBtnStartClick() {
  const startTime = calendar.selectedDates[0];
  // console.log(startTime);
  interval = setInterval(() => {
    const timeLeft = startTime - new Date();
    // console.log(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minsRef.textContent = addLeadingZero(minutes);
    secsRef.textContent = addLeadingZero(seconds);
  }, 1000);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
