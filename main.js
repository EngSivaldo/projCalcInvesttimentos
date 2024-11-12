// Importa a função generateReturnsArray do módulo investimentGoals
import { generateReturnsArray } from "./src/investimentGoals";

// Obtém o formulário de investimento pelo ID
const form = document.getElementById('investment-form');

// Verifica se o formulário foi encontrado
if (form) {
  // Adiciona um evento de submissão ao formulário
  form.addEventListener('submit', renderProgression);
} else {
  // Exibe um erro no console se o formulário não for encontrado
  console.error('form calcular não encontrado');
}

// Função para renderizar a progressão dos investimentos
function renderProgression(evt) {
  // Previne o comportamento padrão do formulário
  evt.preventDefault();
  
  // Verifica se há algum erro no formulário
  if (document.querySelector('.error')){
    return;
  }
  
  // Obtém e converte os valores dos campos do formulário
  const startingAmount = Number(document.getElementById('starting-amount').value.replace(",", "."));
  const additionalContribution = Number(document.getElementById('additional-contribution').value.replace(",", "."));
  const timeAmount = Number(document.getElementById('time-amount').value);
  const timeAmountPeriod = document.getElementById('time-amount-period').value;
  const returnRate = Number(document.getElementById('return-rate').value.replace(",", "."));
  const returnRatePeriod = document.getElementById('return-rate-period').value;
  const taxRate = Number(document.getElementById('tax-rate').value.replace(",", "."));

  // Gera o array de retornos usando a função importada
  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  // Exibe o array de retornos no console
  console.log(returnsArray);
}

// Função para validar a entrada do usuário
function validateInput(evt) {
  // Se o campo estiver vazio, não faz nada
  if(evt.target.value === '') {
    return;
  }

  // Obtém referências aos elementos pai e avô do campo
  const {parentElement} = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  // Adiciona uma mensagem de erro se o valor não for numérico ou for menor ou igual a zero
  if(!parentElement.classList.contains("error") && (isNaN(inputValue) || Number(inputValue) <= 0)) {
    const errorTextElement = document.createElement('p');
    errorTextElement.classList.add('text-red-500');
    errorTextElement.innerText = 'Insira um valor numérico e maior que zero!';

    parentElement.classList.add('error');
    grandParentElement.appendChild(errorTextElement);
  } else if (parentElement.classList.contains("error") && !isNaN(inputValue) && Number(inputValue) > 0) {
    // Remove a mensagem de erro se o valor for válido
    parentElement.classList.remove('error');
    grandParentElement.querySelector('p').remove();
  }
}

// Adiciona o evento de validação a todos os campos de entrada do formulário
for (const formElement of form) {
  if(formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener("blur", validateInput);
  }
}

// Adiciona novamente o evento de submissão ao formulário
form.addEventListener('submit', renderProgression);
