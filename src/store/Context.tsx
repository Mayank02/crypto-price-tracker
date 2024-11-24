import {
  useState,
  useEffect,
  useMemo,
  createContext,
  useCallback,
} from "react";

export interface Crypto {
  id: string;
  display_name: string;
  price: string;
  volume: string;
  [key: string]: any;
}

interface ICryptoViewContextType {
  filteredCryptos: Crypto[];
  cryptos: Crypto[];
  filter: string;
  isLoaded: boolean;
  setFilter: (filter: string) => void;
  markCryptoAsFavorite: (id: string) => void;
  lastUpdated: string;
  isError: string;
}

interface ICryptoViewProviderProps {
  children: React.ReactNode;
}
const initialLoadSize = 20;

export const CryptoViewContext = createContext({} as ICryptoViewContextType);

export const CryptoViewProvider = (props: ICryptoViewProviderProps) => {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [filter, setFilter] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isError, setIsError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://api.exchange.coinbase.com/products"
      );
      const data = await response.json();
      const usdCryptos = data.filter((product: any) =>
        product?.id?.endsWith("-USD")
      );
      setCryptos(usdCryptos);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchTickers = async () => {
      let filteredList: Crypto[] =
        filter !== ""
          ? cryptos.filter((crypto) =>
              crypto.id.toLowerCase().includes(filter.toLowerCase())
            )
          : cryptos;

      const fetchCryptoData = async (list: Crypto[]) => {
        return await Promise.all(
          list.map(async (crypto: Crypto) => {
            const tickerResponse = await fetch(
              `https://api.exchange.coinbase.com/products/${crypto.id}/ticker`
            );
            if (tickerResponse.status > 400) {
              setIsError(
                "Server is experiencing high number of requests. Apply filter to reduce the number of requests."
              );
            }
            const tickerData = await tickerResponse.json();
            return { ...crypto, ...tickerData };
          })
        );
      };

      try {
        let initialList: Crypto[] = filteredList.slice(0, initialLoadSize);
        let remainingList: Crypto[] = filteredList.slice(initialLoadSize);
        const initialCryptoData = await fetchCryptoData(initialList);
        setFilteredCryptos(initialCryptoData);
        setIsLoaded(true);
        setLastUpdated(new Date().toLocaleString());
        setIsError("");
        // Fetch remaining list in the background
        if (remainingList.length > 0) {
          const remainingCryptoData = await fetchCryptoData(remainingList);
          setFilteredCryptos((prevData) => [
            ...prevData,
            ...remainingCryptoData,
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch tickers:", error);
      }
    };

    if (cryptos.length > 0) {
      fetchTickers();
      const interval = setInterval(fetchTickers, 10000);
      return () => clearInterval(interval);
    }
  }, [cryptos, filter]);

  const markCryptoAsFavorite = useCallback((id: string) => {
    setCryptos((prevCryptos) =>
      prevCryptos.map((crypto) =>
        crypto.id === id ? { ...crypto, favorite: !crypto.favorite } : crypto
      )
    );
  }, []);

  const value = useMemo(() => {
    return {
      filteredCryptos: filteredCryptos,
      cryptos: cryptos,
      filter: filter,
      isLoaded: isLoaded,
      setFilter: setFilter,
      markCryptoAsFavorite: markCryptoAsFavorite,
      lastUpdated: lastUpdated,
      isError: isError,
    };
  }, [
    filteredCryptos,
    cryptos,
    filter,
    isLoaded,
    markCryptoAsFavorite,
    lastUpdated,
    isError,
  ]);

  return (
    <CryptoViewContext.Provider value={value}>
      {children}
    </CryptoViewContext.Provider>
  );
};
