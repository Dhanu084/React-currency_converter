import React, { useState, useEffect } from "react";
import CurrencyConverter from "./CurrencyConverter";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangerate, setExchangeRate] = useState();
  const [from, setFrom] = useState(true);

  let toAmount, fromAmount;
  if (from) {
    fromAmount = amount;
    toAmount = amount * exchangerate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangerate;
  }
  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
      .then((response) => response.json())
      .then((data) => {
        setCurrencies([data.base, ...Object.keys(data.rates)]);
        const first = Object.keys(data.rates)[0];
        setFromCurrency(data.base);
        setToCurrency(first);
        setExchangeRate(data.rates[first]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency == null || toCurrency == null) return;
    fetch(
      `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  const handleFromChange = (e) => {
    setAmount(e.target.value);
    setFrom(true);
  };

  const handleToChange = (e) => {
    setAmount(e.target.value);
    setFrom(false);
  };
  return (
    <div className="App">
      <CurrencyConverter
        currencies={currencies}
        amount={fromAmount}
        currency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        handleChange={handleFromChange}
      />
      <div className="equals">=</div>
      <div>
        <CurrencyConverter
          currencies={currencies}
          amount={toAmount}
          currency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          handleChange={handleToChange}
        />
      </div>
    </div>
  );
}

export default App;
