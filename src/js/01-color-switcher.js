

const ref = {
    buttonStartEl: document.querySelector('[data-start]'),
    buttonStopEl: document.querySelector('[data-stop]'),
};

let colorChangeInterval = null;

ref.buttonStartEl.addEventListener('click', evt => {
    colorChangeInterval = onButtonStartClick(evt);
});
ref.buttonStopEl.addEventListener('click', onButtonStopClick);


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function onButtonStartClick(evt) {
    evt.target.setAttribute('disabled', 'disabled');
    return setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  function onButtonStopClick (
    evt,
    buttonStartEl = ref.buttonStartEl,
    interval = colorChangeInterval
  ) {
    buttonStartEl.removeAttribute('disabled');
    clearInterval(colorChangeInterval);
  }