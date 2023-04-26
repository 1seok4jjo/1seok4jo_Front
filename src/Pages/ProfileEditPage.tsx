import React, {useState} from 'react'
import MyPageBanner from '../Common/MyPageBanner'
import styled from 'styled-components'

import ChangePassword from '../Popups/ChangePassword'

import {scrollToTop} from '../util/scrollToTop'
import {useCookies} from 'react-cookie'
import NoToken from '../Common/NoToken'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'
import {basicUser} from '../Mock/users'
import Secession from '../Popups/Secession'

export default function ProfileEditPage() {
  scrollToTop()
  const user = useSelector((state: RootState) => state.user)
  console.log(user)

  const [token, setToken] = useCookies(['token'])
  const [changePassword, setChangePassword] = useState<boolean>(false)
  const [secession, setSecession] = useState<boolean>(false)
  const [profilePreview, setProfilePreview] = useState<string>(
    user.profileUrl === null ? basicUser.profile : user.profileUrl,
  )
  const [profileBackgroundPreview, setProfileBackgroundPreview] = useState<string>(
    user.bannerUrl === null ? basicUser.background : user.bannerUrl,
  )

  const handlePasswordChange = (e: React.MouseEvent) => {
    e.preventDefault()
    setChangePassword(true)
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setProfilePreview(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleProfileBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setProfileBackgroundPreview(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleEditForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <ProfileEditPageSection>
      {Object.keys(token).length === 0 ? (
        // <NoToken />
        <>
          <MyPageBanner />
          <EditForm onSubmit={handleEditForm} onKeyUp={e => e.key === 'Enter' && e.preventDefault()}>
            <PageTitle>회원정보 수정</PageTitle>
            <Content>
              <Title># 이메일</Title>
              <Input value={user.email} type='email' readOnly />
            </Content>
            <Content>
              <Title># 비밀번호</Title>
              <PasswordBox>
                <Input type='password' required />
                <PassWordChange
                  onClick={e => {
                    handlePasswordChange(e)
                  }}
                >
                  *비밀번호 변경
                </PassWordChange>
              </PasswordBox>
            </Content>
            <Content>
              <Title># 닉네임</Title>
              <Input value={user.nickName} type='text' readOnly />
            </Content>
            <Content>
              <Title># 나를 소개하는 한 줄</Title>
              <Input
                type='text'
                maxLength={40}
                placeholder={user.introduction === null ? '나를 소개하는 한문장을 등록해주세요.' : user.introduction}
              />
            </Content>
            <Content>
              <Title># 프로필 이미지</Title>
              <ProfileImgBox>
                <ProfileImg src={profilePreview} alt='ProfileImg' />
                <ImgLabel htmlFor='profileImg'>이미지 선택</ImgLabel>
                <InputImg id='profileImg' type='file' accept='.jpg, .jpeg, .png' onChange={handleProfileImageChange} />
              </ProfileImgBox>
            </Content>
            <Content>
              <Title># 배경 이미지</Title>
              <ProfileImgBox>
                <ProfileBackgroundImg src={profileBackgroundPreview} alt='ProfileBackgroundImg' />
                <ImgLabel htmlFor='profileBackgroundImg'>배경이미지 선택</ImgLabel>
                <InputImg
                  id='profileBackgroundImg'
                  type='file'
                  accept='.jpg, .jpeg, .png'
                  onChange={handleProfileBackgroundImageChange}
                />
              </ProfileImgBox>
            </Content>
            <ButtonBox>
              <SecessionButton onClick={() => setSecession(true)}>탈퇴 하기</SecessionButton>
              <SubmitInput type='submit' value={'수정 완료'} />
            </ButtonBox>
          </EditForm>
          <ChangePassword show={changePassword} setChangePassword={setChangePassword} />
          <Secession show={secession} setSecession={setSecession} />
        </>
      ) : (
        <>
          <MyPageBanner />
          <EditForm onSubmit={handleEditForm} onKeyUp={e => e.key === 'Enter' && e.preventDefault()}>
            <PageTitle>회원정보 수정</PageTitle>
            <Content>
              <Title># 이메일</Title>
              <Input value={user.email} type='email' readOnly />
            </Content>
            <Content>
              <Title># 비밀번호</Title>
              <PasswordBox>
                <Input type='password' required />
                <PassWordChange
                  onClick={e => {
                    handlePasswordChange(e)
                  }}
                >
                  *비밀번호 변경
                </PassWordChange>
              </PasswordBox>
            </Content>
            <Content>
              <Title># 닉네임</Title>
              <Input value={user.nickName} type='text' readOnly />
            </Content>
            <Content>
              <Title># 나를 소개하는 한 줄</Title>
              <Input
                type='text'
                maxLength={40}
                placeholder={user.introduction === null ? '나를 소개하는 한문장을 등록해주세요.' : user.introduction}
              />
            </Content>
            <Content>
              <Title># 프로필 이미지</Title>
              <ProfileImgBox>
                <ProfileImg src={profilePreview} alt='ProfileImg' />
                <ImgLabel htmlFor='profileImg'>이미지 선택</ImgLabel>
                <InputImg id='profileImg' type='file' accept='.jpg, .jpeg, .png' onChange={handleProfileImageChange} />
              </ProfileImgBox>
            </Content>
            <Content>
              <Title># 배경 이미지</Title>
              <ProfileImgBox>
                <ProfileBackgroundImg src={profileBackgroundPreview} alt='ProfileBackgroundImg' />
                <ImgLabel htmlFor='profileBackgroundImg'>배경이미지 선택</ImgLabel>
                <InputImg
                  id='profileBackgroundImg'
                  type='file'
                  accept='.jpg, .jpeg, .png'
                  onChange={handleProfileBackgroundImageChange}
                />
              </ProfileImgBox>
            </Content>
            <SubmitInput type='submit' value={'수정 완료'} />
          </EditForm>
          <ChangePassword show={changePassword} setChangePassword={setChangePassword} />
        </>
      )}
    </ProfileEditPageSection>
  )
}

const ProfileEditPageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-top: 4rem;
  text-align: center;
`
const EditForm = styled.form`
  width: 89%;
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  background: rgb(247, 247, 247);
  border-radius: 1rem;
  padding: 0px 2rem 2rem;
  box-sizing: border-box;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-right: 2rem;
  width: 15rem;
  text-align: center;

  @media (max-width: 576px) {
    text-align: left;
    margin-bottom: 1.5rem;
  }
`

const Input = styled.input`
  font-size: 1.3rem;
  width: 25rem;
  border: none;
  padding: 0.8rem 0.8rem 0.8rem 1.3rem;
  border-radius: 1.5rem;
  &:focus {
    outline: none;
  }
`
const PassWordChange = styled.button`
  margin-left: 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: inherit;
  cursor: pointer;

  &:hover {
    color: #1877f2;
  }

  @media (max-width: 960px) {
    margin-top: 1rem;
    text-align: right;
  }
`

const PasswordBox = styled.div`
  display: flex;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const ProfileImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 1rem;
`

const ProfileImg = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  padding: 0.5rem;
`

const ProfileBackgroundImg = styled.img`
  width: 100%;
  height: 25rem;
  border-radius: 1rem;
  padding-bottom: 0.3rem;
  min-width: 27.5rem;
`

const InputImg = styled.input`
  display: none;
`

const ImgLabel = styled.label`
  cursor: pointer;
  font-size: 1.2rem;
  height: 2rem;
  display: flex;
  width: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 0 0 1rem 1rem;
  &:hover {
    color: #1877f2;
    background: #fff;
    border-color: #1877fe;
  }
`

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 5rem;
`

const SubmitInput = styled.input`
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  background: #1877f2;
  border: none;
  border-radius: 0.5rem;
`

const SecessionButton = styled.button`
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  background: #c0c0c0;
  border: none;
  border-radius: 0.5rem;
  margin-right: 1rem;

  &:hover {
    background: #fff;
    color: red;
  }
`
