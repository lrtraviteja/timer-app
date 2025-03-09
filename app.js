let timer;
let isRunning = false;
let timeLeft = 0;
let mode = 'Pomodoro'; 
const modes = {
    Pomodoro: 25 * 60,
    ShortBreak: 5 * 60,
    LongBreak: 15 * 60
};

const display = document.getElementById('timer-display');
const audio = document.getElementById('alert-sound');

function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                audio.play().catch(error => {
                    console.error('Audio playback failed:', error);
                });
                isRunning = false;
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = modes[mode];
    updateDisplay();
}

function switchMode(newMode) {
    mode = newMode;
    resetTimer();
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', () => switchMode('Pomodoro'));
document.getElementById('short-break-btn').addEventListener('click', () => switchMode('ShortBreak'));
document.getElementById('long-break-btn').addEventListener('click', () => switchMode('LongBreak'));

resetTimer();
