import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import * as S from './styles'

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>{/* asChild informa ao Trigger para utilizar o componente <button> filho como base de estilização, e não precisar criar um <button> dentro de outro <button>*/}
            <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />

        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}