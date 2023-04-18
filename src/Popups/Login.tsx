import React, {useRef, useState} from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'
import {ImBubble} from 'react-icons/im'
import {TbSlash} from 'react-icons/tb'

interface PaymentModalProps {
  show: boolean
  setShowLoginModal: (value: boolean) => void
}

export default function Login({show, setShowLoginModal}: PaymentModalProps) {
  const [joinForm, setJoinForm] = useState(false)
  const [joinWelcomeText, setJoinWelcomeText] = useState('Compass에 오신 것을 환영합니다.')

  const loginEmailRef = useRef<HTMLInputElement>(null)
  const loginPasswordRef = useRef<HTMLInputElement>(null)

  const joinWelcomeTextRef = useRef<HTMLDivElement>(null)
  const joinEmailRef = useRef<HTMLInputElement>(null)
  const joinPasswordRef = useRef<HTMLInputElement>(null)
  const joinPassword2Ref = useRef<HTMLInputElement>(null)
  const joinNickNameRef = useRef<HTMLInputElement>(null)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('이메일 : ', loginEmailRef.current?.value)
    console.log('비밀번호 : ', loginPasswordRef.current?.value)
    setShowLoginModal(false)
  }

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (joinPasswordRef.current?.value !== joinPassword2Ref.current?.value) {
      if (joinWelcomeTextRef.current) {
        joinWelcomeTextRef.current.style.color = 'red'
      }

      setJoinWelcomeText('비밀번호가 일치하지 않습니다.')
      return
    }

    console.log('이메일 : ', joinEmailRef.current?.value)
    console.log('비밀번호 : ', joinPasswordRef.current?.value)
    console.log('닉네임 : ', joinNickNameRef.current?.value)
    setJoinForm(false)
    setShowLoginModal(false)
  }

  return (
    <ModalBackdrop show={show}>
      <ModalContent>
        {joinForm ? (
          <JoinForm onSubmit={e => handleJoin(e)}>
            <ModalCloseTitleBox>
              <CloseIcon
                onClick={() => {
                  setShowLoginModal(false), setJoinForm(false)
                }}
              />
              <ModalTitle>회원가입</ModalTitle>
            </ModalCloseTitleBox>
            <Line />
            <WelcomeText ref={joinWelcomeTextRef}>{joinWelcomeText}</WelcomeText>
            <InputGroupJoin>
              <Input
                type='email'
                pattern='[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*'
                placeholder='이메일'
                required
                ref={joinEmailRef}
              />
              <Input type='password' placeholder='비밀 번호' required ref={joinPasswordRef} />
              <Input type='password' placeholder='비밀 번호 확인' required ref={joinPassword2Ref} />
              <Input type='text' placeholder='닉네임' required ref={joinNickNameRef} />
            </InputGroupJoin>
            <LoginButton type='submit'>회원가입</LoginButton>
          </JoinForm>
        ) : (
          <LoginForm onSubmit={e => handleLogin(e)}>
            <ModalCloseTitleBox>
              <CloseIcon
                onClick={() => {
                  setShowLoginModal(false), setJoinForm(false)
                }}
              />
              <ModalTitle>로그인</ModalTitle>
            </ModalCloseTitleBox>
            <Line />
            <WelcomeText>Compass에 오신 것을 환영합니다.</WelcomeText>
            <InputGroup>
              <Input
                type='email'
                pattern='[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*'
                placeholder='이메일'
                required
                ref={loginEmailRef}
              />
              <Input type='password' placeholder='비밀 번호' required ref={loginPasswordRef} />
            </InputGroup>
            <JoinFindPassBox>
              <button onClick={() => setJoinForm(true)}>회원가입</button>
              <TbSlash />
              <button>비밀번호 찾기</button>
            </JoinFindPassBox>
            <LoginButton type='submit'>로그인</LoginButton>
            <Hrspan>또는</Hrspan>
            <KaKaoLoginButton>
              <ImBubble />
              카카오 로그인
            </KaKaoLoginButton>
          </LoginForm>
        )}
      </ModalContent>
    </ModalBackdrop>
  )
}

interface ModalProps {
  show: boolean
}

const JoinForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

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
`

const CloseIcon = styled(AiOutlineClose)`
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

const InputGroupJoin = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 2rem;
  input:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: none;
  }
  input:nth-child(2) {
    border-bottom: none;
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

const JoinFindPassBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  align-items: center;

  button {
    border: none;
    cursor: pointer;
    background: none;
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
  margin-top: 1rem;
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
    margin-right: 1rem;
  }
`
