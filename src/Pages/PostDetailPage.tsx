import {useEffect} from 'react'
import styled from 'styled-components'
import MapContainer from '../Common/MapContainer'
import banner1 from '../Assets/MainPage/banner-1.png'
import banner2 from '../Assets/MainPage/banner-2.png'
import banner3 from '../Assets/MainPage/banner-3.png'
import banner4 from '../Assets/MainPage/banner-4.png'
import banner5 from '../Assets/MainPage/banner-5.png'
import sangchu from '../Assets/sangchu.png'

export default function PostDetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const detailImage = [
    {
      image: banner1,
      name: '한국관광공사',
    },
    {
      image: banner2,
      name: '렛츠코레일',
    },
    {
      image: banner3,
      name: '가족여행카페',
    },
    {
      image: banner4,
      name: '비짓서울',
    },
    {
      image: banner5,
      name: '비짓서울',
    },
  ]

  return (
    <Detail>
      <Header>
        <Title>휴양지로 너무 좋습니다!</Title>
        <Buttons>
          <button>공유하기</button>
          <button>좋아요</button>
        </Buttons>
      </Header>
      <ImageArea>
        {detailImage.map((data, index) => (
          <Image key={index}>
            <img src={data.image} alt={data.name} />
          </Image>
        ))}
      </ImageArea>
      <Body>
        <Info>
          <Text>강릉 / 2023-01.05 ~ 2023.01.09</Text>
          <Status>댓글 21개 좋아요 10</Status>
        </Info>
        <ContentBox>
          <PostArea>
            <ProfileInfo>
              <ProfileImage>
                <img src={sangchu} alt='하상츄' />
              </ProfileImage>
              <NickName>hasangchu</NickName>
            </ProfileInfo>
            자연을 그대로 느낄수 있습니다. 반려견 sangchu와 함께 너무나도 즐거운 여행이었습니다.
          </PostArea>
        </ContentBox>
        <HashtagTitle>
          <Suggest># 이런 분들에게 추천합니다</Suggest>
          <Hashtag>#여행 #사진 # 가족여행</Hashtag>
        </HashtagTitle>
      </Body>
      <Bottom>
        <CommentBox></CommentBox>
        <MapContainer />
      </Bottom>
    </Detail>
  )
}

const Detail = styled.section`
  padding: 10rem 5rem 0 5rem;
`
const Header = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`
const Title = styled.h1`
  font-size: 2rem;
`
const Buttons = styled.div`
  display: flex;
`
const ImageArea = styled.section`
  height: 30rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
`
const Image = styled.div`
  :nth-child(1) {
    grid-row: 1 / span 2;
    height: 30rem;
  }
  background-color: #c0c0c0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const Body = styled.section`
  padding: 5rem 0;
  width: 100%;
  border-bottom: 1px solid #c0c0c0;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const Text = styled.h2`
  font-size: 1.5rem;
`
const Status = styled.h2`
  font-size: 1rem;
`
const ContentBox = styled.section`
  max-height: 50rem;
  margin-bottom: 3rem;
  display: flex;
`
const ProfileInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
`
const ProfileImage = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 5rem;
  background-color: #c0c0c0;
  img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 5rem;
  }
`
const NickName = styled.span`
  font-size: 1rem;
  padding: 1rem 0 0 1rem;
`
const PostArea = styled.section`
  font-size: 1.1rem;
  padding: 1.3rem;
  width: 100%;
  height: 15rem;
  border-radius: 1rem;
  background-color: #f0f0f0;
`
const HashtagTitle = styled.div``

const Suggest = styled.h2`
  font-size: 1.5rem;
`

const Hashtag = styled.h3`
  color: gray;
  padding-top: 2rem;
  font-size: 1.2rem;
`

const Bottom = styled.section`
  margin-top: 3rem;
  display: flex;
  height: 80rem;
  border: 1px solid red;
`
const CommentBox = styled.section`
  width: 50rem;
  height: 100rem;
  border: 1px solid red;
`
