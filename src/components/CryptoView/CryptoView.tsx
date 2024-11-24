import React, { useContext } from "react";
import { CryptoGrid } from "../CryptoGrid/CryptoGrid";
import { CryptoViewContext } from "../../store/Context";
import styles from "../Styles.module.css";
import { InvestmentCalculator } from "../InvestmentCalculator/InvestmentCalculator";
import { Accordion } from "../Accordion/Accordion";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const CryptoView = () => {
  const {
    setFilter,
    cryptos,
    filteredCryptos,
    filter,
    isLoaded,
    markCryptoAsFavorite,
    lastUpdated,
    isError,
  } = useContext(CryptoViewContext);

  return (
    <div className={`${styles.wrapper} ${styles.container}`}>
      <Accordion title="Investment Calculator">
        <InvestmentCalculator
          cryptos={cryptos}
          filteredCryptos={filteredCryptos}
        />
      </Accordion>
      <CryptoGrid
        cryptos={filteredCryptos}
        markCryptoAsFavorite={markCryptoAsFavorite}
        isLoaded={isLoaded}
        lastUpdated={lastUpdated}
        setFilter={setFilter}
        filter={filter}
      />
      {/* {isError && <ErrorMessage message={isError} />} */}
    </div>
  );
};

export default CryptoView;
