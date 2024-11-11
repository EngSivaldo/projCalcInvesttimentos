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

// funcao de exibir o error, quando digitar algo errado no input com class === name
function validateInput(evt) {
  if (evt.target.value === '') {
    return;
  }

  const parentElement = evt.target.parentElement; // elemento pai
  const grandParentElement = evt.target.parentElement.parentElement; // elemento avô
  const inputValue = evt.target.value.replace(",", ".");

  if (isNaN(inputValue) || Number(inputValue) <= 0) {
    // objetivo: <p class="text-red-500">Insira um valor numerico e maior que zero</p>
    const errorTextElement = document.createElement("p"); // <p></p>
    errorTextElement.classList.add('text-red-500'); // <p class='text-red-500'></p>
    errorTextElement.innerText = "Insira um valor numerico e maior que zero"; // <p class="text-red-500">Insira um valor numerico e maior que zero</p>

    parentElement.classList.add('error'); // recebe borda vermelha (error)
    grandParentElement.appendChild(errorTextElement);
  }
}

// Adicionar event listeners para blur
const inputs = document.querySelectorAll('input[name]');
inputs.forEach(input => {
  input.addEventListener('blur', validateInput);
});



form.addEventListener('submit', renderProgression);
