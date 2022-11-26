import Timer from './Timer';
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../sass/02-timer.scss';

const ref = {
    buttonStart: document.querySelector('[data-start]'),
    timerFields: document.querySelectorAll('.timer > .field >.value'),
};

ref.buttonStart.setAttribute('disabled', 'disabled');


const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onclose(selectedDates) {
        const dateNow = new Date();

        if (periodValidation(selectedDates[0], dateNow)) {
            toggleButtonActivation(ref.buttonStart);

            ref.buttonStart.addEventListener('click', () => 
            onStartButtonClick(selectedDates[0], insertTimerIntoMarkup)
            );
        }
    },

    locale: {
        firstDayOfWeek: 1,
    },
};


const calendar = flatpickr('#datetime-picker', flatpickrOptions);


function periodValidation(inputDate, dateNow) {
    if (inputDate < dateNow) {
        Notiflix.Notify.failure('Please choose a date in future', {
            fontsize: '20px',
            timeout: 1000,
        });
        return false;
    }
    Notiflix.Notify.success('Click "Start" button', {
        fontsize: '20px',
        timeout: 2000,
    });
    return true;
};

function toggleButtonActivation(buttonEl) {
    if (buttonEl.hasAttribute('disabled')) {
        buttonEl.removeAttribute('disabled');
    }else {
        buttonEl.setAttribute('disabled', 'disabled');
    }
};

function onStartButtonClick(selectedDate, insertIntoMarkupFoo) {
    toggleButtonActivation(ref.buttonStart);
    const timer = new Timer({ selectedDate, insertIntoMarkupFoo });
    timer.runTimer();

    setTimeout(() => {
        timer.killTimer();
    }, selectedDate - Date.now());
};

function insertTimerIntoMarkup (timeObj) {
    const timerRefMap = new Map();
    ref.timerFields.forEach(el => {
        timerRefMap.set(Object.keys(el.dataset)[0], el);
    });

    for (const key in timeObj) {
        if (timeObj.hasOwnProperty(key)) {
            timerRefMap.get(key).textContent = addLeadingZero(timeObj[key]);
        }
    };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};