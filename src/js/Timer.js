export default class Timer {
    #endOfRange = null;
    #intervalId = null;
    #onTick = null;

    constructor({ selectedDate, insertIntoMarkupFoo }) {
        this.#endOfRange = selectedDate;
        this.#onTick = insertIntoMarkupFoo;
    }

    killTimer() {
        clearInterval(this.#intervalId);
    }

    runTimer() {
        let deltaTime = this.#endOfRange - Date.now();
        this.#onTick(this.#convertMs(deltaTime));
        this.#intervalId = setInterval(() => {
            deltaTime -= 1000;
            this.#onTick(this.#convertMs(deltaTime));
        }, 1000);
    }

    #convertMs(ms) {
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
}

