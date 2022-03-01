let currentNumberWrapper = document.getElementById('currentNumber');
let adicionar = document.getElementById('adicionar');
let subtrair = document.getElementById('subtrair');
var currentNumber = 0;



function increment() {
    currentNumber += 1;
    currentNumberWrapper.innerHTML = currentNumber;
    if (currentNumber == 30) {
        document.getElementById('adicionar').disabled = true;
    }
}

function decrement() {
    currentNumber -= 1;
    currentNumberWrapper.innerHTML = currentNumber;
    if (currentNumber == -30) {
        document.getElementById('subtrair').disabled = true;
    }
}

adicionar.addEventListener('click', increment);
subtrair.addEventListener('click', decrement);