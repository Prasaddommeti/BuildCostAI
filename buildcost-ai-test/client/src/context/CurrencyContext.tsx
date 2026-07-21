import React, { createContext, useContext, useState } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (c: string) => void;
  unit: string;
  setUnit: (u: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>(() => localStorage.getItem('buildcost_currency') || 'USD');
  const [unit, setUnit] = useState<string>(() => localStorage.getItem('buildcost_unit') || 'sq.ft');

  const updateCurrency = (c: string) => {
    setCurrency(c);
    localStorage.setItem('buildcost_currency', c);
  };

  const updateUnit = (u: string) => {
    setUnit(u);
    localStorage.setItem('buildcost_unit', u);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: updateCurrency, unit, setUnit: updateUnit }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
