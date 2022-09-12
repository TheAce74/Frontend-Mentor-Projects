const back = document.querySelectorAll(".back");
const overlay = document.querySelectorAll(".overlay");

const timeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

let totalSeconds;

function init() {
  totalSeconds = 1295742;

  setTimeLeft();

  const interval = setInterval(() => {
    if (totalSeconds < 0) {
      clearInterval(interval);
    }
    countTime();
  }, 1000);
}

function setTimeLeft() {
  timeLeft.days = Math.floor(totalSeconds / (60 * 60 * 24));
  timeLeft.hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  timeLeft.minutes = Math.floor((totalSeconds / 60) % 60);
  timeLeft.seconds = Math.floor(totalSeconds % 60);
}

function countTime() {
  if (totalSeconds > 0) {
    timeLeft.seconds--;
    if (timeLeft.minutes >= 0 && timeLeft.seconds < 0) {
      timeLeft.seconds = 59;
      timeLeft.minutes--;
      if (timeLeft.hours >= 0 && timeLeft.minutes < 0) {
        timeLeft.minutes = 59;
        timeLeft.hours--;
        if (timeLeft.days >= 0 && timeLeft.hours < 0) {
          timeLeft.hours = 23;
          timeLeft.days--;
        }
      }
    }
  }
  totalSeconds--;
  printTime();
}

function printTime() {
  if (+back[3].innerText != timeLeft.seconds) {
    back[3].classList.add("flip");
    back[3].innerText = timeLeft.seconds.toString().padStart(2, "0");
    overlay[3].innerText = timeLeft.seconds.toString().padStart(2, "0");
    setTimeout(() => {
      back[3].classList.remove("flip");
    }, 300);
  }
  if (+back[2].innerText != timeLeft.minutes) {
    back[2].classList.add("flip");
    back[2].innerText = timeLeft.minutes.toString().padStart(2, "0");
    overlay[2].innerText = timeLeft.minutes.toString().padStart(2, "0");
    setTimeout(() => {
      back[2].classList.remove("flip");
    }, 300);
  }
  if (+back[1].innerText != timeLeft.hours) {
    back[1].classList.add("flip");
    back[1].innerText = timeLeft.hours.toString().padStart(2, "0");
    overlay[1].innerText = timeLeft.hours.toString().padStart(2, "0");
    setTimeout(() => {
      back[1].classList.remove("flip");
    }, 300);
  }
  if (+back[0].innerText != timeLeft.days) {
    back[0].classList.add("flip");
    back[0].innerText = timeLeft.days.toString().padStart(2, "0");
    overlay[0].innerText = timeLeft.days.toString().padStart(2, "0");
    setTimeout(() => {
      back[0].classList.remove("flip");
    }, 300);
  }
}

window.addEventListener("load", init);
