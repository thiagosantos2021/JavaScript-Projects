const lampOn = document.getElementById('lampOn');
const lampOff = document.getElementById('lampOff');
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

lampOn.addEventListener('click', acendeLampada);
lampOff.addEventListener('click', apagaLampada);
lampada.addEventListener('mouseover', acendeLampada);
lampada.addEventListener('mouseleave', apagaLampada);
lamp.addEventListener('dblclick', QuebraLampada);
