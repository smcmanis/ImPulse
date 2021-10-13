let countdown;
let bpm = 70;
const targetBpm = 130;
let totalTime;
const movingInput = document.querySelector('input[type=checkbox]');
const heartRateInput = document.querySelector('input[type=range]');
let moving = movingInput.getAttribute("checked");
let targetReached = false;

const clock = document.querySelector('.clock');
const heartRateDisplayScreen = document.querySelector('.flex');

const timerDisplay = document.querySelector('.meterProgress');
const countdownLimit = 13;
const messageDisplay = document.querySelector('.motivationMessage');
const heartRateDisplay = document.querySelector('.heartRateCurrent');

let bpmSetPoint = parseInt(heartRateInput.value);

function globalTimer() {
  const start = Date.now();
  totalTime = setInterval(() => {
    displayHeartRate();
    if (targetReached) {
      setTimeout(displayGoodJob, 2000);
      clearInterval(totalTime);
    }
  }, 1000);
}

heartRateInput.addEventListener('click', () => {
  bpmSetPoint = parseInt(heartRateInput.value);
});

function handleMoving() {
  moving = movingInput.checked;
  if (!moving) {
    timerDisplay.classList.add("countdownActive");
    startTimer();
  } else {
    timerDisplay.classList.remove("countdownActive");
    clearInterval(countdown);
    displayMotivationMessage(countdownLimit);
  }
}
movingInput.addEventListener('change', handleMoving);



function timer(seconds) {
  clearInterval(countdown);

  let now = Date.now();
  let then = now + seconds * 1000;

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      window.location.href = "index.html";
      return;
    }

    if (bpm >= targetBpm) {
      clearInterval(countdown);
      return;
    }
    displayMotivationMessage(secondsLeft);
  }, 1000);
}

function displayTimeLeft() {
  timerDisplay.classList.add("countdownActive");
}

function startTimer() {
  const seconds = countdownLimit;
  timer(seconds);
}



globalTimer();
startTimer();
handleMoving();

function displayHeartRate() {
  delta = Math.floor(Math.random() * 3);
  if (delta == 2) {
    delta = -1;
  }

  bpm = bpmSetPoint + delta;
  heartRateDisplay.textContent = `${bpm}`;
  if (bpm >= targetBpm) {
    heartRateDisplay.style.color = 'green';
    targetReached = true;
  }
}

function displayMotivationMessage(seconds) {
  if (seconds <= countdownLimit - 5) {
    messageDisplay.style.visibility = 'visible';
  } else {
    messageDisplay.style.visibility = 'hidden';
  }
}





function displayGoodJob() {
  console.log('good');
  document.querySelector('.face').innerHTML = "Good Job!";
}