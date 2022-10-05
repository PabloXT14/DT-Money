import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
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

          {/* Para colocar o nosso modal separado da lógica do Header, fazendo com que fique seja inserido até mesmo fora da div#root, facilitando o entendimento para os leitores de tela */}
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Nova transação</Dialog.Title>
              <Dialog.Description>
                Content of the modal
              </Dialog.Description>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}