'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

        /*if (operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if(operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if(operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if(operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual);
        }*/
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
//display.textContent = evento.target.textContent;

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const botaoIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', botaoIgual);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const inverterNumero = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('mais-menos').addEventListener('click', inverterNumero);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const Decimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('virgula').addEventListener('click', Decimal);

const teclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDivisao',
    '*': 'operadorMultiplicacao',
    '-': 'operadorSubtracao',
    '+': 'operadorAdicao',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    'c': 'limparDisplay',
    'Escape': 'limparCalculo',
    ',': 'virgula'
}
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(teclado).indexOf(tecla) !== -1;
    if(teclaPermitida()) document.getElementById(teclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);