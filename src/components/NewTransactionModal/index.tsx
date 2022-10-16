import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import * as zod from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

// ESQUEMA DE VALIDAÇÃO
const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']), // depois vamos fazer a validação desse campo
});

// TIPAGEM DOS DADOS DO FORMULÁRIO
type NewTransactionModalInputs = zod.infer<typeof newTransactionFormSchema>;


export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionModalInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {// valores padrão
      type: 'income'
    }
  });

  async function handleCreateNewTransaction(data: NewTransactionModalInputs) {
    const { description, price, category, type } = data;
    
    await createTransaction({
      description,
      price,
      category,
      type,
    });
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input 
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input 
            type="text"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input 
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller // componente controlled do React Hook Form
            control={control}
            name="type"// referencia a qual valor do formulário do esquema de validação
            
            // rendiza o componente e recebe com parâmetro dados do field, fieldState e formState
            render={({ field }) => {
              return (
                // field.onChange: altera para outro valor possível o input
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
        
      </Content>
    </Dialog.Portal>
  )
}