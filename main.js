// Inteligencia do sistema
import { generateReturnsArray } from "./src/investimentGoals";

const form = document.getElementById('investment-form');
// const calculateButton = document.getElementById('calculate-results');


if (form) {
  form.addEventListener('submit', renderProgression);
} else {
  console.error('form calcular não encontrado');
}

function renderProgression(evt) {
  evt.preventDefault();
  // Verifique e obtenha todos os elementos necessários do DOM
  // const startingAmountElement = Number(form['starting-amount'].value);//outra forma acessar value atraves do name
  const startingAmountElement = document.getElementById('starting-amount');
  const additionalContributionElement = document.getElementById('additional-contribution');
  const timeAmountElement = document.getElementById('time-amount');
  const timeAmountPeriodElement = document.getElementById('time-amount-period');
  const returnRateElement = document.getElementById('return-rate');
  const returnRatePeriodElement = document.getElementById('return-rate-period');
  const taxRateElement = document.getElementById('tax-rate');
  
  // Verifique se todos os elementos foram encontrados
  if (startingAmountElement && additionalContributionElement && timeAmountElement && 
      timeAmountPeriodElement && returnRateElement && returnRatePeriodElement && taxRateElement) {

    // Obtenha os valores dos elementos
    const startingAmount = Number(startingAmountElement.value);
    const additionalContribution = Number(additionalContributionElement.value);
    const timeAmount = Number(timeAmountElement.value);
    const timeAmountPeriod = timeAmountPeriodElement.value;
    const returnRate = Number(returnRateElement.value);
    const returnRatePeriod = returnRatePeriodElement.value;
    const taxRate = Number(taxRateElement.value);

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
  } else {
    console.error('Um ou mais elementos necessários não foram encontrados no DOM');
  }
}

form.addEventListener('submit', renderProgression);
// calculateButton.addEventListener('submit', renderProgression);