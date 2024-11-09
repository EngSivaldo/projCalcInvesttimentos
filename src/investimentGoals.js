// Faz projeção (cálculos) de nossos investimentos
// Função auxiliar que converte taxa de retorno anual para mensal
function convertToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1/12);
}

function generateReturnsArray(
  startingAmount=0, // Quantia inicial investida
  timeHorizon=0, // Prazo do investimento em meses ou anos
  timePeriod= 'monthly', // Período de tempo (mensal ou anual)
  monthlyContribution=0, // Contribuição mensal
  returnRate=0, // Taxa de retorno (%)
  returnTimeFrame= 'monthly' // Frequência do retorno (mensal ou anual)
  ) 
{
  // Verifica se o prazo e a quantia inicial são válidos
  if (!timeHorizon || startingAmount) {
      throw new Error('Investimento inicial e prazo devem ser preenchidos com valores positivos!');
  }

  // Determina a taxa de retorno final com base na frequência
  const finalTimeReturnRate = 'monthly'
      ? 1 + returnRate / 100 
      : convertToMonthlyReturnRate(1 + returnRate/100);

  // Converte o horizonte de tempo para meses, se necessário
  const finalTimeHorizon = 
      timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12;

  // Objeto de referência para o investimento
  const referenceInvestimentObject = {
      investedAmount : startingAmount, // Quantia investida
      interestReturns : 0, // Retornos de juros
      totalInterestReturns : 0, // Total de retornos de juros
      month : 0, // Mês atual
      totalAmount : startingAmount, // Quantia total
  };

  const returnsArray = [referenceInvestimentObject];
  for (
      let timeReference = 1; 
      timeReference <= finalTimeHorizon; 
      timeReference++) {
      // Calcula a quantia total com base nos juros e contribuição mensal
      const totalAmount = 
          returnsArray[timeReference - 1].totalAmount * finalTimeReturnRate + monthlyContribution;
      // Calcula os retornos de juros
      const interestReturns = returnsArray[timeReference - 1].totalAmount * finalTimeReturnRate;
      // Atualiza a quantia investida com base nas contribuições mensais
      const investedAmount = startingAmount + monthlyContribution * timeReference;
      // Calcula o total de retornos de juros
      const totalInterestReturns = totalAmount - investedAmount;
      returnsArray.push({
          investedAmount : investedAmount, 
          interestReturns : interestReturns,
          totalInterestReturns : totalInterestReturns,
          month : timeReference,
          totalAmount : totalAmount,
      });
  }
  return returnsArray;
}
