let timer; 
let time = 0; 
let running = false; 
let lapNumber = 1; 
let lapTimes = []; 

function startStop() {
  if (running) {
    clearInterval(timer);
    running = false;
    document.querySelector('button').textContent = 'Start';
  } else {
    timer = setInterval(updateTime, 10); 
    running = true;
    document.querySelector('button').textContent = 'Stop';
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  time = 0;
  updateDisplay();
  lapTimes = []; 
  displayLapTimes(); 
  document.getElementById('clearButton').style.display = 'none'; 
  document.getElementById('clearAllButton').style.display = 'none'; 
  document.querySelector('button').textContent = 'Start';
}

function updateTime() {
  time += 10; 
  updateDisplay();
}

function recordLap() {
  if (running) {
   
    const lapTime = document.querySelector('.time').textContent;

    lapTimes.push({ lap: lapNumber++, time: lapTime, millis: time });

    displayLapTimes();

    toggleClearButtons();
  }
}

function clearLast() {
  if (lapTimes.length > 0) {
    lapTimes.pop(); 
    displayLapTimes(); 
  }

  toggleClearButtons();
}

function clearAll() {
  lapTimes = []; 
  displayLapTimes(); 
  toggleClearButtons();
}

function toggleClearButtons() {
  const clearButton = document.getElementById('clearButton');
  const clearAllButton = document.getElementById('clearAllButton');

  if (lapTimes.length > 1) {
    clearButton.style.display = 'inline-block';
  } else {
    clearButton.style.display = 'none';
  }

  if (lapTimes.length > 2) {
    clearAllButton.style.display = 'inline-block';
  } else {
    clearAllButton.style.display = 'none';
  }
}

function displayLapTimes() {
  const lapList = document.getElementById('lapList');
  if (lapList) {
    lapList.innerHTML = ''; 

    if (lapTimes.length > 0) {
      lapTimes.forEach((lap, index) => {
        const lapDisplay = document.createElement('div'); 
        lapDisplay.classList.add('lap');

        const lapNumber = (lap.lap).toString().padStart(2, '0');
        const lapTime = lap.time;
        const lapDiff = index === 0 ? lap.millis : lap.millis - lapTimes[index - 1].millis;
        const formattedDiff = formatTime(lapDiff);

        lapDisplay.innerHTML = `<span>${lapNumber}</span><span>${lapTime}</span><span>+${formattedDiff}</span>`;
        lapList.appendChild(lapDisplay);
      });

      toggleClearButtons();
    } else {
      document.getElementById('clearButton').style.display = 'none';
      document.getElementById('clearAllButton').style.display = 'none';
    }
  }
}

function formatTime(timeInMillis) {
  const minutes = Math.floor(timeInMillis / 60000);
  const seconds = Math.floor((timeInMillis % 60000) / 1000);
  const milliseconds = Math.floor((timeInMillis % 1000) / 10);
  return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  document.querySelector('.time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}