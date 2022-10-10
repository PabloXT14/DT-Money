import { createContext, ReactNode, useEffect, useState } from "react";

// TIPAGEM DOS DADOS DE TRANSAÇÃO
interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction []
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const baseURL = `http://localhost:3333`;


  async function loadTransactions() {
    const response = await fetch(`${baseURL}/transactions`)
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      { children }
    </TransactionsContext.Provider>
  )
}