// investimentGoals.js

export function generateReturnsArray(
    startingAmount = 0,
    timeHorizon = 0,
    timePeriod = 'monthly',
    monthlyContribution = 0,
    returnRate = 0,
    returnTimeFrame = 'monthly'
  ) {
    if (!timeHorizon || !startingAmount) {
      throw new Error('Investimento inicial e prazo devem ser preenchidos com valores positivos!');
    }
  
    const finalTimeReturnRate = returnTimeFrame === 'monthly'
      ? 1 + returnRate / 100
      : (1 + returnRate / 100) ** (1 / 12);
  
    const finalTimeHorizon = timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12;
  
    const referenceInvestmentObject = {
      investedAmount: startingAmount,
      interestReturns: 0,
      totalInterestReturns: 0,
      month: 0,
      totalAmount: startingAmount,
    };
  
    const returnsArray = [referenceInvestmentObject];
    for (let timeReference = 1; timeReference <= finalTimeHorizon; timeReference++) {
      const totalAmount = returnsArray[timeReference - 1].totalAmount * finalTimeReturnRate + monthlyContribution;
      const interestReturns = totalAmount - returnsArray[timeReference - 1].totalAmount;
      const investedAmount = startingAmount + monthlyContribution * timeReference;
      const totalInterestReturns = totalAmount - investedAmount;
      returnsArray.push({
        investedAmount,
        interestReturns,
        totalInterestReturns,
        month: timeReference,
        totalAmount,
      });
    }
    return returnsArray;
  }
  