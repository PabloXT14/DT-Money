import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import * as S from './styles'

interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

const baseURL = `http://localhost:3333`;

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch(`${baseURL}/transactions`)
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);
  
  return (
    <div>
      <Header />
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />

        <S.TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr>
                <td width="50%">{transaction.description}</td>
                <td>
                  <S.PriceHighlight variant={transaction.type}>
                    { transaction.type === 'income' 
                      ? `R$ ${transaction.price}` 
                      : `- R$ ${transaction.price}`
                    }
                  </S.PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  )
}