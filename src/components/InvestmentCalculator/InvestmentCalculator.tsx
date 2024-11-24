import React, { useState, useEffect } from "react";
import { Crypto } from "../../store/Context";
import styles from "./InvestmentCalculator.module.css";
import Select from "react-select";

interface InvestmentCalculatorProps {
  cryptos: Crypto[];
  filteredCryptos: Crypto[];
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> =
  React.memo(({ cryptos, filteredCryptos }) => {
    const [selectedCrypto, setSelectedCrypto] = useState<string>("");
    const [investmentAmount, setInvestmentAmount] = useState<number>(0.0);
    const [cryptoAmount, setCryptoAmount] = useState<number>(0.0);

    useEffect(() => {
      if (selectedCrypto && investmentAmount) {
        const crypto = filteredCryptos.find((c) => c.id === selectedCrypto);
        if (crypto) {
          const amount = investmentAmount / parseFloat(crypto.price);
          setCryptoAmount(isNaN(amount) ? 0 : amount);
        }
      } else {
        setCryptoAmount(0);
      }
    }, [selectedCrypto, investmentAmount, filteredCryptos]);

    const cryptoOptions = cryptos.map((crypto) => ({
      value: crypto.id,
      label: crypto.id,
    }));

    return (
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="crypto-select" className={styles.label}>
              Select Cryptocurrency:
            </label>
            <Select
              id="crypto-select"
              data-testid="crypto-select"
              className={styles.select}
              options={cryptoOptions}
              onChange={(option) => {
                if (option) {
                  setSelectedCrypto(option.value);
                }
              }}
              aria-label="Select Cryptocurrency"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="investment-amount" className={styles.label}>
              Investment Amount (USD):
            </label>
            <input
              type="number"
              id="investment-amount"
              className={styles.input}
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
              aria-label="Investment Amount"
            />
          </div>
        </form>
        <div className={styles.result}>
          <h3 className={styles.resultTitle}>Result</h3>
          {selectedCrypto && investmentAmount > 0 ? (
            <p className={styles.resultText} data-testid="result-text">
              You would own{" "}
              <strong>{cryptoAmount.toFixed(6) || "0.00"} </strong>
              {selectedCrypto.split("-")[0]} for an investment of $
              <strong>{investmentAmount}</strong>.
            </p>
          ) : (
            <p className={styles.resultText}>
              Please select a cryptocurrency and enter an investment amount.
            </p>
          )}
        </div>
      </div>
    );
  });

export default InvestmentCalculator;
