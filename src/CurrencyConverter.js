import React from "react";

export default function CurrencyConverter({
  currencies,
  amount,
  currency,
  onChangeCurrency,
  handleChange,
}) {
  return (
    <div className="currency-converter">
      <div>
        <input type="number" value={amount} onChange={handleChange} />
        <select value={currency} onChange={onChangeCurrency}>
          {currencies.map((currency) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
