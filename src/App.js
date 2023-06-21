import React, { useState } from "react";
import logo from "./assets/investment-calculator-logo.png";
import FormSubmit from "./formSubmit";
import ResultHandler from "./resultHandler";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = []; // per-year results

  if (userInput) {
    let currentSavings = userInput["current-savings"];
    const yearlyContribution = userInput["yearly-contribution"];
    const expectedReturn = userInput["expected-return"] / 100;
    const duration = userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>
      <FormSubmit onCalculate={calculateHandler} />
      {!userInput && <p>no investment is there.</p>}
      {userInput && (
        <ResultHandler
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
      {/* <ResultHandler/> */}
    </div>
  );
}

export default App;
