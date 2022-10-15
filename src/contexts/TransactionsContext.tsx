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
  transactions: Transaction [];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const baseURL = `http://localhost:3333`;


  async function fetchTransactions(query?: string) {
    // definindo 
    const url = new URL(`${baseURL}/transactions`);

    if(query) {
      // passando parâmetro busca do tipo query a URL
      url.searchParams.append('q', query);
    }

    const response = await fetch(url)
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions,
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}