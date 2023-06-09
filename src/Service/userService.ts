import axios from 'axios'

const remote = axios.create()

// 회원가입
export const fetchJoinApi = async (blobData: Blob) => {
  const postJoinURL = `http://localhost:8080/api/member/signup`

  const joinData = new FormData()
  joinData.append('data', blobData)

  const params = {
    method: 'POST',
    url: `${postJoinURL}`,
    data: joinData,
  }
  await remote(params)
}

// 로그인
export const fetchLoginApi = async (email: string, password: string) => {
  const postLoginURL = `http://localhost:8080/api/member/sign-in`
  const params = {
    method: 'POST',
    url: `${postLoginURL}`,
    data: {
      email: `${email}`,
      password: `${password}`,
    },
  }
  const response = await remote(params)
  console.log('로그인 데이터', response.data)

  return response.data
}
// 회원정보 수정
export const fetchProfileEditApi = async (
  stringBlob: Blob,
  userProfileImg: File,
  userBannerImg: File,
  token: string,
) => {
  // console.log(stringBlob, userProfileImg, userBannerImg)
  const postEditURL = `http://localhost:8080/api/member/update`

  const editData = new FormData()
  editData.append('data', stringBlob)
  editData.append('profileImg', userProfileImg)
  editData.append('bannerImg', userBannerImg)

  const params = {
    method: 'PUT',
    url: `${postEditURL}`,
    data: editData,
    headers: {Authorization: token},
  }
  const response = await remote(params)

  return response.data
}

// 비밀번호 수정
export const fetchEditPassWordApi = async (password: string, newPassword: string, token: string) => {
  // console.log(token)

  const postEditPasswordURL = `http://localhost:8080/api/member/password/update`
  const params = {
    method: 'PUT',
    url: `${postEditPasswordURL}`,
    data: {
      password: `${password}`,
      newPassword: `${newPassword}`,
    },
    headers: {Authorization: token},
  }
  const response = await remote(params)
  console.log(response)

  return response.data
}

// 초기화 메일
export const fetchMailPassWordApi = async (mail: string) => {
  const sendMailURL = `http://localhost:8080/api/member/password/send`

  const paramsMail = {
    method: 'POST',
    url: `${sendMailURL}`,
    data: {
      email: mail,
    },
  }
  await remote(paramsMail)
}

// 비밀번호 초기화
export const fetchInitPassWordApi = async (mail: string, uuid: string, newPassword: string) => {
  const postInitPasswordURL = `http://localhost:8080/api/member/password/reset`

  const paramsInit = {
    method: 'POST',
    url: `${postInitPasswordURL}`,
    data: {
      email: mail,
      password: newPassword,
      uuid: uuid,
    },
  }
  await remote(paramsInit)
}

// 회원 탈퇴
export const fetchDeleteUserApi = async (token: string) => {
  const deleteUserURL = `http://localhost:8080/api/member/withdraw`

  const paramsMail = {
    method: 'DELETE',
    url: `${deleteUserURL}`,
    headers: {Authorization: token},
  }
  await remote(paramsMail)
}
