//Faz projecao(calculos) de nossos investimentos
//funcao auxiliar que converte de ano /mes
function convertToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1/12);
}

function generateReturnsArray(
  startingAmount=0,
  timeHorizon=0,
  timePeriod= 'monthly',
  monthlyContribution=0,
  returnRate=0, 
  returnTimeFrame= 'monthly') 
  {
    if (!timeHorizon || startingAmount) {
      throw new Error('Investimento inicial e prazo devem ser preenchidos com valores positivos!');

    }

    const finalTimeReturnRate = 'monthly'
    ? 1 + returnRate / 100 
    : convertToMonthlyReturnRate(1 + returnRate/100);

    const finalTimeHorizon = 
    timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12;

    const referenceInvestimentObject = {
      investedAmount : startingAmount, 
      interestReturns : 0,
      totalInterestReturns : 0,
      month : 0,
      totalAmount : startingAmount,
    };

    const returnsArray = [referenceInvestimentObject];
    for (
      let timeReference = 1; 
      timeReference <= finalTimeHorizon; 
      timeReference++) {
      const totalAmount = 
      returnsArray[timeReference - 1].totalAmount * finalTimeReturnRate + monthlyContribution;
      const interestReturns = returnsArray[timeReference - 1].totalAmount * finalTimeReturnRate;
      const investedAmount = startingAmount + monthlyContribution * timeReference;
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