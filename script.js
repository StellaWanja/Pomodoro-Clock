// start of settings open close modal
const openModalBtns = document.querySelectorAll('[data-modal-target]');
const closeModalBtns = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

// open modal
openModalBtns.forEach(button => {
    button.addEventListener('click', () => {
        //dataset - access all data attributes
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
});

// click anywhere else to close modal
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.settings-modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

// close modal
closeModalBtns.forEach(button => {
    button.addEventListener('click', () => {
        //dataset - access all data attributes
        const modal = button.closest('.settings-modal');
        closeModal(modal);
    })
});

function openModal (modal) {
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('overlay-active');
}

function closeModal (modal) {
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('overlay-active');
}

// end of settings open close modal

// start of settings input field
//set minus btn to disabled default attribute
const workMinusBtn = document.getElementById('work-minus-btn');
const workPlusBtn = document.getElementById('work-plus-btn');
const shortBreakMinusBtn = document.getElementById('short-break-minus-btn');
const shortBreakPlusBtn = document.getElementById('short-break-plus-btn');
const longBreakMinusBtn = document.getElementById('long-break-minus-btn');
const longBreakPlusBtn = document.getElementById('long-break-plus-btn');
const inputWorkTime = document.getElementById('work-number');
const inputShortBreakTime = document.getElementById('short-break-number');
const inputLongBreakTime = document.getElementById('long-break-number');

let inputWorkNum = 0;
let inputShortBreakNum = 0;
let inputLongBreakNum = 0;

//work
workPlusBtn.addEventListener('click', () => {
    inputWorkNum++;
    if(inputWorkNum < 0){
        inputWorkNum = 0;
    } else if (inputWorkNum < 10) {
        inputWorkTime.innerHTML = `0${inputWorkNum}`;
    } else {
        inputWorkTime.innerHTML = inputWorkNum;
    }
});

workMinusBtn.addEventListener('click', () => {
    inputWorkNum--;
    if(inputWorkNum < 0){
        inputWorkNum = 0;
    } else if (inputWorkNum < 10) {
        inputWorkTime.innerHTML = `0${inputWorkNum}`;
    } else {
        inputWorkTime.innerHTML = inputWorkNum;
    }
});

// short break
shortBreakPlusBtn.addEventListener('click', () => {
    inputShortBreakNum++;
    if(inputShortBreakNum < 0){
        inputShortBreakNum = 0;
    } else if (inputShortBreakNum < 10) {
        inputShortBreakTime.innerHTML = `0${inputShortBreakNum}`;
    } else {
        inputShortBreakTime.innerHTML = inputShortBreakNum;
    }
});

shortBreakMinusBtn.addEventListener('click', () => {
    inputShortBreakNum--;
    if(inputShortBreakNum < 0){
        inputShortBreakNum = 0;
    } else if (inputShortBreakNum < 10) {
        inputShortBreakTime.innerHTML = `0${inputShortBreakNum}`;
    } else {
        inputShortBreakTime.innerHTML = inputShortBreakNum;
    }
});

// longBreak
longBreakPlusBtn.addEventListener('click', () => {
    inputLongBreakNum++;
    if(inputLongBreakNum < 0){
        inputLongBreakNum = 0;
    } else if (inputLongBreakNum < 10) {
        inputLongBreakTime.innerHTML = `0${inputLongBreakNum}`;
    } else {
        inputLongBreakTime.innerHTML = inputLongBreakNum;
    }
});

longBreakMinusBtn.addEventListener('click', () => {
    inputLongBreakNum--;
    if(inputLongBreakNum < 0){
        inputLongBreakNum = 0;
    } else if (inputLongBreakNum < 10) {
        inputLongBreakTime.innerHTML = `0${inputLongBreakNum}`;
    } else {
        inputLongBreakTime.innerHTML = inputLongBreakNum;
    }
});

// end of input settings field

const applySettingsBtn = document.querySelector('.apply-btn');

const minWorkTime = document.getElementById('work-min');
const secWorkTime = document.getElementById('work-sec');

const minShortBreakTime = document.getElementById('short-break-min');
const secShortBreakTime = document.getElementById('short-break-sec');
const bell = new Audio('https://soundbible.com/mp3/service-bell_daniel_simion.mp3');

const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');

let startTimer; //store reference to timer variable

// apply time settings
applySettingsBtn.addEventListener('click', () => {
    if(inputWorkNum < 10){
        minWorkTime.innerText = `0${inputWorkNum}`;
        secWorkTime.innerText = '00';
    } else {
        minWorkTime.innerText = inputWorkNum;
        secWorkTime.innerText = '00';
    }

    if(inputShortBreakNum < 10){
        minShortBreakTime.innerText = `0${inputShortBreakNum}`;
        secShortBreakTime.innerText = '00';
    } else {
        minShortBreakTime.innerText = inputShortBreakNum;
        secShortBreakTime.innerText = '00';
    }

    // close modal on applybtn click
    const modal = applySettingsBtn.closest('.settings-modal');
    closeModal(modal);
});

// start timer
startBtn.addEventListener('click', () => {
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000);
        startBtn.innerHTML = 'pause';
    } else {
        stopTimer();
        startTimer = undefined;
        startBtn.innerHTML = 'start';
    }
});

resetBtn.addEventListener('click', () => {
    if(inputWorkNum < 10){
        minWorkTime.innerText = `0${inputWorkNum}`;
        secWorkTime.innerText = '00';
    } else {
        minWorkTime.innerText = inputWorkNum;
        secWorkTime.innerText = '00';
    }

    if(inputShortBreakNum < 10){
        minShortBreakTime.innerText = `0${inputShortBreakNum}`;
        secShortBreakTime.innerText = '00';
    } else {
        minWorkTime.innerText = inputShortBreakNum;
        secWorkTime.innerText = '00';
    }
    startTimer = undefined;
});

function timer () {
    //work countdown
    if(secWorkTime.innerText != 00){
        secWorkTime.innerText--;
    } else if (minWorkTime.innerText != 00 && secWorkTime.innerText == 00) {
        secWorkTime.innerText = 59;
        minWorkTime.innerText--;
    }

    //shortbreak countdown
    if(minWorkTime.innerText == 0 && secWorkTime.innerText == 0){
        if(secShortBreakTime.innerText != 0){
            secShortBreakTime.innerText--;
        } else if (minShortBreakTime.innerText != 0 && secShortBreakTime.innerText == 0) {
            secShortBreakTime.innerText = 59;
            minShortBreakTime.innerText--;
        }
    }

    //interval counter
    if(minWorkTime.innerText == 0 && secWorkTime.innerText == 0 && minShortBreakTime == 0 && secShortBreakTime == 0){
        minWorkTime.innerText = inputWorkNum;
        secWorkTime.innerText = '00';

        minShortBreakTime.innerText = inputShortBreakNum;
        secShortBreakTime.innerText = '00'; 
        
    }
}

function stopTimer () {
    clearInterval(startTimer);
}