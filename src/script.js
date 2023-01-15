
//timer variable with properties
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions:0,
  count:0
};


//ability to start timer and countdown to zero 
let interval; //interval variable 

const buttonSound = new Audio('button-sound.mp3');
const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
  buttonSound.play();
  const { action } = mainButton.dataset;
  if (action === 'start') {
    startTimer();
  } else {
    stopTimer();
  }
});
//creating an event lister that detects a click on buttons and switches the mode of the timer 
//modeButtons pts to the containing element
const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener ('click',handleMode);

function getRemainingTime(endTime) {//takes timestamp arguemnt and finds difference between current time and the end time in milliseconds
    //converst tthe total # of seconds left by dividing by 1000; result is parsed into integer in base 10
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;

    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);


    return {
        total,
        minutes,
        seconds,
    };

    //returl value is stored in timer.remaingTime property
}
function stopTimer() {
    clearInterval(interval); //setInterval() is triggered in startTImer()

    mainButton.dataset.action = 'Start';
    mainButton.textContent = 'Start';
    mainButton.classList.remove('active'); //returned to original form by removing the active class 
}
function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000; //exact time in the future when the timer will end 
      
    if (timer.mode === 'pomodoro') timer.sessions++; //sessions property incremented at the start of a pomodoro session
    if (total === 0) {
        timer.count++;
    }
    //once countdown timer is started, action changed to "stop"
    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'Stop';
    mainButton.classList.add('active');

    interval = setInterval(function() {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
        if (total <= 0) {
            //ADD COUNTER TO UPDATE THE COIN VALUE 
            //CHANGED
           
            clearInterval(interval);//tements causes the app to switch to a new break session dependent on timer.mode

            //once the countdown reaches 0 the switch sta
            switch (timer.mode) { //checks if timer.sessions is divisible by timer.longBreakInterval
                case 'pomodoro':
                if (timer.sessions % timer.longBreakInterval === 0) {
                    switchMode('longBreak');
                   
                } else {
                    switchMode('shortBreak');
                  
                }
                break;
                default: //if break session is ending -> new pomodoro session to begin
                    switchMode('pomodoro');

            }
            if (Notification.permission === 'granted') {
                const text =
                  timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
                new Notification(text);
              }
            document.querySelector(`[data-sound="${timer.mode}"]`).play();
      startTimer(); //countdown to start again as before 
        }
    }, 1000); //value stoed in endTime variable 
}

function updateClock() {
    //takes the value of the mintuesand seconds properties
    
    const { remainingTime } = timer;
    //pads numbers so we have two digits 
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');

    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;
}

function switchMode(mode) {
    //mode property is set to the currentmode(pomodoro, shortbreak,longbreak)
    timer.mode = mode;

    //property of remainingTime is added to timer object 
    timer.remainingTime = {
        //total # of seconds remaining
        total: timer[mode] * 60,
        //number of miinutes
        minutes: timer[mode],
        //always set to zero at end of session 
        seconds: 0,
    };
    //active class is removed from all the mode buttons and set on the one that was clicked 
    
    //LOOK AT ROOT in index.css
    document
        .querySelectorAll('button[data-mode]')
        .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    //document.body.style.backgroundColor = `var(--${mode})`;

    //invoke updateClock(): shows how the countdown portion is updated
    updateClock();
}
//element is clicked: handleMode is invoked
function handleMode(event){
    const{ mode } = event.target.dataset;

    if(!mode) return;
    //if element is clicked: button that is specified 
    switchMode(mode);
    //stop the timer when the mode is changed by clicking any of the three buttons

    stopTimer();
}

document.addEventListener('DOMContentLoaded', () => {
    // Let's check if the browser supports notifications
  if ('Notification' in window) {
    // If notification permissions have neither been granted or denied
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      // ask the user for permission
      Notification.requestPermission().then(function(permission) {
        // If permission is granted
        if (permission === 'granted') {
          // Create a new notification
          new Notification(
            'Awesome! You will be notified at the start of each session'
          );
        }
      });
    }
  }
  switchMode('pomodoro'); //default mode is pomodoro
});

window.onload = function(){
    quoteBox.
    espresso.addEventListener('click',touch);
    
    function touch(){
    
        var quoteBox = document.getElementById('box');
        quoteBox.style.width = "70vw";
        quoteBox.style.backgroundColor = "white";
        fade(quoteBox);

        function fade(element) {
            var op = 1;  // initial opacity
            var timer = setInterval(function () {
                if (op <= 0.1){
                    clearInterval(timer);
                    element.style.display = 'none';
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.1;
    }, 50);
}


    }       
}
//onload = checkLocalStorage();

// making the clones on window reload 
// checkLocalStorage() {
    //check local storage for pre-existing todo items and call addTodoListItem for each 
// }
//making the clones on button click 
function todoListSubmitHandler(event) {
    let textbox = document.getElementById("todolist-txt");
    console.log("text box value: " + textbox.value);
    addTodoListItem(textbox.value);
    textbox.value = "";

    var t = new Date();
    var month = t.getMonth();
    var day = t.getDate();
    var hour = t.getHours();
    var min = t.getMinutes();
    var secs = t.getSeconds();
    document.getElementById('txt3').innerHTML = "2023-" + (month+1) + '-' + day + '  |  ' + hour + ':' + min + ':' + secs;
}
//deleting the clones
function removeTodoListEntry(event) { 
    console.log("remove event: ", event);
    console.log("srcElement: ", event.srcElement);
    console.log("ancestor", event.srcElement.closest(".todolist-entry"));
    let ancestor = event.srcElement.closest(".todolist-entry");
    ancestor.remove();

    //another step: remove text from localstorage
}

function addTodoListItem(text) {
    let newTodoBox = document.getElementById("todolist-entry-prototype").cloneNode(true);
    newTodoBox.id = "";
    let collection = document.getElementById("collection");
    newTodoBox.childNodes[1].childNodes[1].innerHTML = text;
    newTodoBox.style.display = "flex";
    // newTodoBox.childNodes[0].childNodes[1] = <current time>;
    collection.appendChild(newTodoBox);

    // another step: add text to localstorage
}

var col = "#D9A970";
function mode_change() {
    if(col == "#D9A970") {
        document.getElementsByTagName('body')[0].style.backgroundColor = "#4C2A5D";
        document.getElementsByClassName('boxes')[0].style.backgroundColor = "#89649e";
        // document.getElementsByClassName("boxes").style["boxShadow"] = "3px 3px 3px #150D24";
        document.getElementById('collection').style.backgroundColor = "#6E3571";
        document.getElementById('right').style.backgroundColor = "#89649e";
        document.getElementById('timer').style.backgroundColor = "#6E3571";
        col = "#4C2A5D";
    }
    else {
        document.getElementsByTagName('body')[0].style.backgroundColor = "#D9A970";
        document.getElementsByClassName('boxes')[0].style.backgroundColor = "#d8c094";
        // document.getElementsByClassName("boxes").style["boxShadow"] = "3px 3px 3px #D0954E";
        document.getElementById('collection').style.backgroundColor = "#8c523a";
        document.getElementById('right').style.backgroundColor = "#d8c094";
        document.getElementById('timer').style.backgroundColor = "#8c523a";
        col = "#D9A970";
    }
    // document.getElementById('image').src="night-cafe.png"
}