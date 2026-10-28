// getElementById finds an element by its id.
// The text in quotes has to match your HTML exactly, capitals included.
const display = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const status = document.getElementById("status");
const ringFill = document.getElementById("ringFill");
const circumference = 565.5;


// change this: starting time in seconds
let startSeconds = 300;

// seconds left right now
let totalSeconds = startSeconds;

// setInterval gives back an ID. We keep it so we can stop the timer later
let intervalId = null;

// true while counting, false otherwise
let isRunning = false;

// a function is a named block of code you can run whenever you want
function formatTime(secs) {
    // Math.floor rounds down: 245 / 60 = 4.08, so we get 4 minutes
    const mins = Math.floor(secs / 60);

    // % gives the remainder: 245 % 60 = 5, so 5 seconds left over
    const remaining = secs % 60;

    // adds a zero in front of single digits so 5 shows as 05
    const padded = remaining < 10 ? "0" + remaining : remaining;

    // backticks let you put variables inside text using ${ }
    return `${mins}:${padded}`;
}

function updateRing() {
    // 150 seconds left out of 300 gives 0.5
    const fractionLeft = totalSeconds / startSeconds;

    // dashoffset hides part of the ring: 0 shows all of it, 565.5 shows none.
    // With half the time left: 565.5 x (1 - 0.5) = 282.75 hidden, so half shows
    ringFill.style.strokeDashoffset = circumference * (1 - fractionLeft);
}


function updateDisplay() {
    display.textContent = formatTime(totalSeconds);
    updateRing();
    document.title = formatTime(totalSeconds) + " - Egg Timer";
}

// run once now so the page starts with the right time
updateDisplay();

function tick() {
    totalSeconds = totalSeconds - 1;
    updateDisplay();

    // your turn: if totalSeconds has reached 0, call a function
    // called finishTimer (when time runs out, further below)
    // Hint: <= means "less than or equal to"
    if (totalSeconds <= 0) {
        finishTimer();   // the function that ends the timer
    }

}

function startTimer() {
    // if it is already running, stop here.
    // without this, clicking Start twice makes it count twice as fast
    if (isRunning) return;

    isRunning = true;
    startButton.textContent = "Pause";
    display.classList.add("running");   // switches on the .running CSS
    // runs tick again and again. 1000 milliseconds = 1 second
    intervalId = setInterval(tick, 1000);
}

function pauseTimer() {
    // stops the repeating using the saved ID
    clearInterval(intervalId);
    isRunning = false;
    startButton.textContent = "Start";
    display.classList.remove("running");
}

function resetTimer() {
    pauseTimer();                  // stop first so it does not keep counting
    totalSeconds = startSeconds;   // put the time back
    updateDisplay();

    // your turn: remove the "finished" class from the display
    // and put a message back in the status text
    // Hint: this is the opposite of the classList.add line in finishTimer
    display.classList.___("finished");
    status.___ = "Pick your egg";   // the property used to change text

}

function finishTimer() {
    pauseTimer();
    display.classList.add("finished");

    // change this: your message
    status.textContent = "Your egg is ready!";

    // your turn: make something else happen (see the extras)
    // needs the Alarm Sound extra pasted in first
    ___();   // the name of the sound function

}

// addEventListener means: when this happens to this element, run this function.
// No brackets after resetTimer, because we are passing the function in,
// not running it right now.
resetButton.addEventListener("click", resetTimer);

// your turn: the Start button has two jobs. If the timer is running it
// should pause, otherwise it should start. Write a function that checks
// isRunning, then attach it with addEventListener.
// Hint: one button, two jobs. Check whether the timer is running.
function toggleTimer() {
    if (___) {
        pauseTimer();
    } else {
        ___();
    }
}

// Hint: the same method used for resetButton
startButton.___("click", toggleTimer);

// querySelectorAll finds every element matching a CSS selector.
// ".preset" means every element with class="preset"
const presetButtons = document.querySelectorAll(".preset");

// forEach runs the same code once for each button
presetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // dataset.seconds reads data-seconds from the HTML.
        // It comes in as text, so Number() turns it into a number
        startSeconds = Number(button.dataset.seconds);
        resetTimer();
    });
});

const minutesInput = document.getElementById("minutesInput");

// "input" fires every time the value changes
minutesInput.addEventListener("input", function () {
    const mins = Number(minutesInput.value);

    // check the number makes sense first. || means "or"
    if (mins < 1 || mins > 60) return;

    startSeconds = mins * 60;
    resetTimer();
});

// makes a beep with the browser's built-in audio tools.
// Browsers only allow sound after the user has clicked something,
// and pressing Start counts.
function beep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();

    oscillator.type = "sine";           // change this: try "square" or "triangle"
    oscillator.frequency.value = 880;   // change this: pitch, higher is squeakier

    oscillator.connect(audioContext.destination);   // plug it into the speakers
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);   // change this: length in seconds
}

// keydown fires on any key press. e tells you which key
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        e.preventDefault();   // stops the page scrolling down
        toggleTimer(); // runs the function from Start and Pause button
    }
});


// Stretch: make it beep three times. setTimeout runs a function once after
// a delay in milliseconds. Each beep lasts 0.5 seconds.
beep();
setTimeout(beep, ___);   // second beep, 0.6 seconds later
setTimeout(beep, ___);   // third beep, 1.2 seconds after the first
