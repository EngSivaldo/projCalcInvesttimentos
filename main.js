// Inteligencia do sistema
import { generateReturnsArray } from "./src/investimentGoals";

const form = document.getElementById('investment-form');

if (form) {
  form.addEventListener('submit', renderProgression);
} else {
  console.error('form calcular não encontrado');
}

function renderProgression(evt) {
  evt.preventDefault();
  // Verifique e obtenha todos os elementos necessários do DOM
  const startingAmount = Number(document.getElementById('starting-amount').value.replace(",", "."));
  const additionalContribution = Number(document.getElementById('additional-contribution').value.replace(",", "."));
  const timeAmount = Number(document.getElementById('time-amount').value);
  const timeAmountPeriod = document.getElementById('time-amount-period').value;
  const returnRate = Number(document.getElementById('return-rate').value.replace(",", "."));
  const returnRatePeriod = document.getElementById('return-rate-period').value;
  const taxRate = Number(document.getElementById('tax-rate').value.replace(",", "."));

  // Gere o array de retornos
  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}


// funcao de exibir o error, quando digitar algo errado no input 
function validateInput(evt) {
  if(evt.target.value === '') {
    return;
  }

  const {parentElement} = evt.target; // ref ao elemento pai (div) 
  const grandParentElement = evt.target.parentElement.parentElement;//ref. elem avo (div)
  const inputValue = evt.target.value.replace(",", ".");

  if(isNaN(inputValue) || Number(inputValue) <= 0 ) {
    const errorTextElement = document.createElement('p');//criar um paragrafo <p></p>
    errorTextElement.classList.add('text-red-500');//texto do parag red 
    errorTextElement.innerText = 'Insira um valor numérico e maior que zero!';

    parentElement.classList.add('error') ;//faz div pai ficar red na borda
    grandParentElement.appendChild(errorTextElement);//insere a msg de error no final da div avo
  }
}

for (const formElement of form) {
  if(formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener("blur", validateInput);

  }
}


form.addEventListener('submit', renderProgression);
