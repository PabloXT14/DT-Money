import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { useContext } from 'react';
import { useTheme } from 'styled-components'
import { TransactionsContext } from '../../contexts/TransactionsContext';

import * as S from './styles'

export function Summary() {
  const theme = useTheme();

  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      acc.income += transaction.price;
      acc.total += transaction.price;
    } else {
      acc.outcome += transaction.price;
      acc.total -= transaction.price;
    }

    return acc
  }, {
    income: 0,
    outcome: 0,
    total: 0,
  });

  console.log(transactions);

  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={theme['green-300']} />
        </header>

        <strong>R$ {summary.income}</strong>
      </S.SummaryCard>

      <S.SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={theme['red-300']} />
        </header>

        <strong>R$ {summary.outcome}</strong>
      </S.SummaryCard>

      <S.SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={theme.white} />
        </header>

        <strong>R$ {summary.total}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  )
}