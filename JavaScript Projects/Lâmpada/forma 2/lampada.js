const lampOnOff = document.getElementById('lampOnOff');
const lampada = document.getElementById('lamp');


function VerificaLampadaQuebrada() {
    return lamp.src.indexOf('quebrada') > -1
}

function acendeLampada() {
    if (!VerificaLampadaQuebrada()) {
        lampada.src = './img/acesa.jpg';
    }
}

function apagaLampada() {
    if (!VerificaLampadaQuebrada()) {
        lampada.src = './img/apagada.jpg';
    }
}

function QuebraLampada() {
    lampada.src = './img/quebrada.jpg';
}

function AcendeApagaLampada() {
    if (lampOnOff.textContent == 'Ligar') {
        acendeLampada();
        lampOnOff.textContent = 'Desligar';
    }else{
        apagaLampada();
        lampOnOff.textContent = 'Ligar';
    }
}

lampOnOff.addEventListener('click', AcendeApagaLampada);
lampada.addEventListener('mouseover', acendeLampada);
lampada.addEventListener('mouseleave', apagaLampada);
lamp.addEventListener('dblclick', QuebraLampada);
