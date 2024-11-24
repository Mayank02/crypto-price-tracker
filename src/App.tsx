import React from "react";
import { CryptoViewProvider } from "./store/Context";
import { CryptoView } from "./components/CryptoView/CryptoView";
import Header from "./components/Header/Header";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary"; // Import the ErrorBoundary

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CryptoViewProvider>
        <Header title={"Crypto Price Tracker"} />
        <CryptoView />
      </CryptoViewProvider>
    </ErrorBoundary>
  );
};

export default App;
