import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto;
  padding: 0 1.5rem;
`

export const TableContainer = styled.div`
  margin-top: 1.5rem;
  overflow: auto;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate; // cada celula da table tera a borda individual
  border-spacing: 0 0.5rem; // espaçamente a partir da borda entre as células da tabela (horizontal, vertical)
  min-width: 768px;

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ variant, theme }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`
