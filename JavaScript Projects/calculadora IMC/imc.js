const botaoCalcular = document.getElementById('calcular');


function imc() {
    const resultadoIMC = document.getElementById('resultado');
    const nome = document.getElementById('nome').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;

    if (nome !== '' && altura !== '' && peso !== '') {
        const valorIMC = (peso/(altura*altura)).toFixed(1);
        
        let classificacao = ``;
        if (valorIMC < 18.5) {
            classificacao = `Abaixo do Peso`;
        }else if (valorIMC < 25){
            classificacao = `Peso Ideal, parabéns!`;
        }else if (valorIMC < 30){
            classificacao = `Levemente Acima do Peso`;
        }else if (valorIMC < 35) {
            classificacao = `com Obesidade grau I`;
        }else if (valorIMC < 40) {
            classificacao = `com Obesidade grau II`;
        }else{
            classificacao = `com Obesidade grau III. Cuidado!`
        }

        resultadoIMC.textContent = `${nome}, seu IMC é ${valorIMC} e você está ${classificacao}`;
    }else{
        resultadoIMC.textContent = 'Os campos devem ser preenchidos!'
    }
}

botaoCalcular.addEventListener('click', imc);