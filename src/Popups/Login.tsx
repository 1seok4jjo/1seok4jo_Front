import React from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'
import {ImBubble} from 'react-icons/im'

interface PaymentModalProps {
  show: boolean
}

const handlePopUpclose = () => {
  const modalBack = document.querySelector('#modalBackdrop') as HTMLElement

  modalBack.style.display = 'none'
}

export default function Login({show}: PaymentModalProps) {
  return (
    <ModalBackdrop show={show} id='modalBackdrop'>
      <ModalContent>
        <ModalCloseTitleBox>
          <AiOutlineClose onClick={handlePopUpclose} />
          <ModalTitle>로그인</ModalTitle>
        </ModalCloseTitleBox>
        <Line />
        <WelcomeText>Compass에 오신 것을 환영합니다.</WelcomeText>
        <InputGroup>
          <Input type='email' pattern='.+@gmail\.com' placeholder='example@gmail.com' required />
          <Input type='password' placeholder='password' required />
        </InputGroup>
        <LoginButton>로그인</LoginButton>
        <Hrspan>또는</Hrspan>
        <KaKaoLoginButton>
          <ImBubble />
          카카오 로그인
        </KaKaoLoginButton>
      </ModalContent>
    </ModalBackdrop>
  )
}

interface ModalProps {
  show: boolean
}

const ModalBackdrop = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(122 122 122 / 20%);
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 999;
`

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 35rem;
  height: 33rem;
  z-index: 1000;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 0.3s ease-in-out;
  svg {
    font-size: 1.5rem;
    position: absolute;
    left: 1rem;
    top: 0.6rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;

    &:hover {
      background-color: #f7f7f7;
    }
  }
`

const ModalCloseTitleBox = styled.div`
  padding: 1rem;
`

const ModalTitle = styled.h1`
  font-size: 1.5rem;
`

const InputGroup = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  input:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  input:last-child {
    border-top: none;
    border-radius: 0 0 0.5rem 0.5rem;
  }
`
const Input = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  font-size: 1.3rem;
  box-sizing: border-box;
  border: 1px solid #c0c0c0;
  &:focus {
    outline: none;
  }
`
const Line = styled.hr`
  background: #f0f0f0;
  height: 1px;
  width: 100%;
  border: 0px;
  margin: 0;
  margin-bottom: 2rem;
`

const WelcomeText = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 3rem;
`

const LoginButton = styled.button`
  margin-top: 3rem;
  width: 80%;
  height: 3rem;
  background: #1877f2;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 0.5rem;
`

const Hrspan = styled.span`
  position: relative;
  width: 80%;
  text-align: center;
  color: #7a7a7a;
  margin: 2rem 0;
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 50%;
    width: 45%;
    height: 1px;
    background-color: #7a7a7a;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`

const KaKaoLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 3rem;
  background: #fee500;
  border: none;
  color: #3c1e1e;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 0.5rem;
  svg {
    position: inherit;
  }
`