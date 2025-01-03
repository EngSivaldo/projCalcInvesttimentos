// Importa a função generateReturnsArray do módulo investimentGoals
import { data } from "autoprefixer";
import { generateReturnsArray } from "./src/investimentGoals";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/table";

         
const finalMoneyChart = document.getElementById('final-money-distribution')
const progressionChart = document.getElementById('progression')
// Obtém o formulário de investimento pelo ID
const form = document.getElementById('investment-form');
const clearFormButton = document.getElementById('clear-form');
//const calculateButton = document.getElementById('calculate-results');
let doughnutChartReference = {}  //variavel que guarda o gráficos
let progressionChartReference = {}  //variavel que guarda o gráficos

//criacao da tabela
const columnArray = [
  {columnLabel: "Mês", accessor: "month"}, //Colunatotal investido, formatado como moeda
  {columnLabel: "Total Investido", accessor: "investedAmount", format: (numberInfo) => formatCurrencyToTable(numberInfo)},
  {columnLabel: "Rendimento Mensal", accessor: "interestReturns",format: (numberInfo) => formatCurrencyToTable(numberInfo) },
  {columnLabel: "Rendimento Total", accessor: "totalInterestReturns",format: (numberInfo) => formatCurrencyToTable(numberInfo) },
  {columnLabel: "Quantia Total", accessor: "totalAmount",format: (numberInfo) => formatCurrencyToTable(numberInfo) }, //Colunaquantia total, formatada como moeda
]

function formatCurrencyToTable(value) {
  return value.toLocaleString("pt-BR", {style: "currency", currency: 'BRL'});
}

function formatCurrencyToGraph(value) {
  return value.toFixed(2);
}

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
//chamada da funcão limpar gráficos
  resetCharts();
  
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

 const finalInvestimentObject = returnsArray[returnsArray.length - 1];
//variável que armazena o gráfico
 doughnutChartReference = new Chart(finalMoneyChart, {
    type: 'doughnut',
    data: {
      labels: [
        'Total investido',
        'Rendimento',
        'Imposto'
      ],
      datasets: [
        {      
        data: [
          formatCurrencyToGraph(finalInvestimentObject.investedAmount),
          formatCurrencyToGraph(finalInvestimentObject.totalInterestReturns * (1-taxRate/100)), 
          formatCurrencyToGraph(finalInvestimentObject.totalInterestReturns * (taxRate/100))
          ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4,
      },
    ],
    },
  
 });
//variável que armazena o gráfico
 progressionChartReference =  new Chart(progressionChart, {
  type: 'bar',
  data: {
    labels: returnsArray.map(InvestimentObject => InvestimentObject.month),
    datasets: [{
      label: 'Total Investido',
      data: returnsArray.map(InvestimentObject => formatCurrencyToGraph(InvestimentObject.investedAmount)),
      backgroundColor:  'rgb(255, 99, 132)',
    },{
      label: 'Retorno do Investimento',
      data: returnsArray.map(InvestimentObject => formatCurrencyToGraph(InvestimentObject.interestReturns)),
      backgroundColor:  'rgb(54, 162, 235)',
    },]

  }, 
  options: {
    resposive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
});

// A função é projetada para criar uma tabela HTML e preenchê-la com os dados fornecidos em columnArray e returnsArray, inserindo-a no elemento HTML com o ID 'results-table'
createTable(columnArray, returnsArray, 'results-table');

 }

//funcao auxiliar para verificar se o obj esta vazio
function isObjectEmpty(obj){
  return Object.keys(obj).length === 0;
}

//funcão de limpar gráficos
function resetCharts() {
  if (!isObjectEmpty(doughnutChartReference) && !isObjectEmpty(progressionChart)) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();

  }
}

//função para limpar o formulário
function clearForm() {
  form['starting-amount'].value = '';
  form['additional-contribution'].value = '';
  form['time-amount'].value = '';
  form['return-rate'].value = '';
  form['tax-rate'].value = '';

  //chamada da função para limpar graficos
  resetCharts();

  //limpar erro
  const errorInputContainers = document.querySelectorAll('.error');
  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove('error');
    errorInputContainer.parentElement.querySelector('p').remove();
  }
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

//logica do carrossel
const mainEl = document.querySelector('main');
const carouselEl = document.getElementById('carousel');
const nextButton = document.getElementById('slide-arrow-next')
const previousButton = document.getElementById('slide-arrow-previous')

nextButton.addEventListener('click', () => {
  carouselEl.scrollLeft += mainEl.clientWidth;
});

previousButton.addEventListener('click', () => {
  carouselEl.scrollLeft -= mainEl.clientWidth;
});



// Adiciona novamente o evento de submissão ao formulário
form.addEventListener('submit', renderProgression);
// calculateButton.addEventListener('click', renderProgression);
clearFormButton.addEventListener('click', clearForm);

