class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        this.results = results;        
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
        
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    
    step() {
        if (!this.running) {
            return;
        } 
        this.calculate();
        this.print();
    }
    
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    
    resetTimer() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        stopwatch.print();
    }
    
    
    lap() {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li); 
        }
    
    clear() {
        clearChildren(this.results);
    }    
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

function clearChildren(node) {
    while (node.lastChild) {
        node.removeChild(node.lastChild);
    }
}

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

let lapButton = document.getElementById('lap');
lapButton.addEventListener('click', () => stopwatch.lap());

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));