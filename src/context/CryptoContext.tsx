import { createContext, useContext, useEffect, useState } from 'react';

interface CryptoContextProps {
  currency: string;
  symbol: string;
  changeCurrency?: (currency: string) => void;
}
const Crypto = createContext<CryptoContextProps>({ currency: '', symbol: '' });

const CryptoContext = ({ children }: any) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  const changeCurrency = (currency: string) => {
    setCurrency(currency);
  };

  useEffect(() => {
    if(currency === 'USD') setSymbol('$')
    if(currency === 'INR') setSymbol('₹') 
    if(currency === 'RUB') setSymbol('₽')  
  }, [currency])
  

  return (
    <Crypto.Provider value={{ currency, changeCurrency,symbol }}>
      {children}
    </Crypto.Provider>
  );
};

const useCrypto = (): CryptoContextProps => {
  return useContext(Crypto);
};

export { CryptoContext, useCrypto };
