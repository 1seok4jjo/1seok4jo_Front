import {FormEvent, FormEventHandler, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import DatePicker from 'react-datepicker'
import DaumPostcode from 'react-daum-postcode'
import styled from 'styled-components'
import PageTitle from '../Common/PageTitle'
import ThemeSlide from '../Common/ThemeSlide'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {RiCloseFill} from 'react-icons/ri'
import {scrollToTop} from '../util/scrollToTop'
import {text} from 'express'
import {fetchThemePostDetailApi} from '../Service/postDetailService'
import {fetchPostEditApi} from '../Service/postWriteService'

export default function PostEditPage() {
  scrollToTop()
  const navigate = useNavigate()
  const {id} = useParams()
  const [categoryId, setCategoryId] = useState<number>(1)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [address, setAddress] = useState('')
  const [isOpenPost, setIsOpenPost] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [imageNames, setImageNames] = useState(['# 이미지첨부 버튼을 누르시고 이미지를 첨부해주세요.(최대 5장)'])
  const [hashtag, setHashtag] = useState<string[]>([])
  const [cookies] = useCookies(['token'])
  const token = cookies.token
  const [fileList, setFileList] = useState<File[]>([])

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await fetchThemePostDetailApi(Number(id))
        setTitle(postData.title)
        setContent(postData.detail)
        setAddress(postData.location)
        setStartDate(postData.startDate.toIsoString())
        setFinishDate(postData.endDate.toIsoString())
        setHashtag(postData.hashtag.split(','))
        setCategoryId(postData.themeId)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPostData()
    console.log({startDate}, {finishDate})
  }, [id])

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost)
  }

  const onCompletePost = (data: any) => {
    let addr = data.address

    setAddress(addr)
    setIsOpenPost(false)
  }

  const handlePostInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    const data = {
      title,
      detail: content,
      startDate: String(startDate.toLocaleDateString('ko-KR', {year: 'numeric', month: 'short', day: 'numeric'})),
      endDate: String(finishDate.toLocaleDateString('ko-KR', {year: 'numeric', month: 'short', day: 'numeric'})),
      location: address,
      hashtag: hashtag.toString(),
      themeId: `${categoryId}`,
    }
    for (let list of fileList) {
      formData.append('images', list)
    }
    const dataBlob = new Blob([JSON.stringify(data)], {type: 'application/json'})
    formData.append('data', dataBlob)

    try {
      const response = await fetchPostEditApi(Number(id), formData, token)
      if (response.code === 200) {
        alert('게시글이 수정되었습니다.')
        navigate('/MyPage')
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleLoadImg = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files
    if (!file || file.length > 5) {
      alert('이미지 첨부 갯수를 조정해주세요!')
      return
    }
    setImageNames(Array.from(file).map(file => file.name))
    setFileList(prev => prev.concat(Array.from(file)))
  }

  const handleEnterHash = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (hashtag.length >= 3) {
      alert('해쉬 태그가 3개를 초과합니다.')
      return
    }

    if (e.key === 'Enter') {
      const inputElement = e.target as HTMLInputElement
      const inputValue = inputElement.value
      setHashtag(prevHashtags => [...prevHashtags, `#${inputValue}`])
      inputElement.value = ''
    }
  }

  const handleTagDel = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setHashtag(prevHashtags => prevHashtags.filter((_, i) => i !== index))
  }

  return (
    <PostForm onSubmit={handlePostInfo} onKeyUp={e => e.key === 'Enter' && e.preventDefault()}>
      <PageTitle title='Edit Post' sub='나의 여행 정보를 수정할 수 있습니다.' />
      <Section>
        <Title># 테마</Title>
        <ThemeSlide setCategoryId={setCategoryId} />
        <ContentBox>
          <Title># 날짜</Title>
          <DateBox>
            <DateText>시작 :</DateText>
            <DatePickerBox>
              <DatePicker
                dateFormat='yyyy.MM.dd'
                selected={startDate ? new Date(startDate) : null}
                onChange={date => date && setStartDate(date)}
              />
            </DatePickerBox>
            <Wave>~</Wave>
            <DateText>종료 :</DateText>
            <DatePickerBox>
              <DatePicker
                dateFormat='yyyy.MM.dd'
                selected={finishDate ? new Date(finishDate) : null}
                onChange={date => date && setFinishDate(date)}
              />
            </DatePickerBox>
          </DateBox>
        </ContentBox>
        <ContentBox>
          <Title># 주소</Title>
          <AddressBox>
            <AddressInput type='text' defaultValue={address} placeholder='# 주소' required readOnly />
            <FaMapMarkerAlt onClick={onChangeOpenPost} />
            {isOpenPost ? (
              <div>
                <DaumPostcode
                  style={{
                    position: 'absolute',
                    marginTop: '0.2rem',
                    borderRadius: '0.5rem',
                    width: '25rem',
                    height: '29rem',
                    display: 'block',
                    overflow: 'hidden',
                    border: '2px solid #cacaca',
                    background: '#fff',
                  }}
                  autoClose
                  onComplete={onCompletePost}
                />
              </div>
            ) : null}
          </AddressBox>
        </ContentBox>
        <ContentBox>
          <Title># 제목</Title>
          <TitleInput
            type='text'
            maxLength={20}
            placeholder='# 제목을 입력하세요 (최대 20자)'
            required
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
          />
        </ContentBox>
        <ContentBox>
          <Title># 내용</Title>
          <TextArea
            maxLength={500}
            placeholder='# 내용을 입력하세요 (최대 500자)'
            required
            value={content}
            onChange={e => {
              setContent(e.target.value)
            }}
          />
        </ContentBox>
        <ContentBox>
          <ImageBox>
            <ImgLabel htmlFor='image'>
              <TitleImg># 이미지 첨부</TitleImg>
              <ImageInput
                id='image'
                type='file'
                multiple
                accept='.jpg, .jpeg, .png'
                // value={imageNames}
                onChange={handleLoadImg}
              />
            </ImgLabel>
            <SelectImgs>
              {imageNames.map((name, index) => {
                return <ImgName key={index}>{name}</ImgName>
              })}
            </SelectImgs>
          </ImageBox>
        </ContentBox>
        <ContentBox>
          <Title># 이런분들에게 추천합니다</Title>
          <HashtagBox>
            <TagBox>
              {hashtag.map((tag, index) => {
                return (
                  <TagName key={index}>
                    {tag}
                    <TagDel onClick={e => handleTagDel(index, e)}>
                      <RiCloseFill />
                    </TagDel>
                  </TagName>
                )
              })}
            </TagBox>
            {hashtag.length >= 3 ? null : (
              <HashTagsInput
                placeholder='# 해쉬태그를 입력하세요 (최대 3개)'
                value={hashtag}
                onKeyUp={handleEnterHash}
              />
            )}
          </HashtagBox>
        </ContentBox>
        <SubmitInput type='submit' value={'수정 완료'} />
      </Section>
    </PostForm>
  )
}

const PostForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-right: 2rem;
`

const TitleInput = styled.input`
  border: none;
  border-bottom: 1px solid #c0c0c0;
  flex: 1 1 0;
  font-size: 1.5rem;
  width: 25rem;
  margin-top: 3rem;
  &:focus {
    outline: none;
    border-bottom: 2px solid #6b7280;
  }
`

const AddressBox = styled.div`
  svg {
    font-size: 1.8rem;
    margin-left: 1rem;

    &:hover {
      cursor: pointer;
      color: #1877f2;
    }
  }
`

const DateBox = styled.div`
  display: flex;
  margin-top: 3rem;
`

const DatePickerBox = styled.div`
  width: 10rem;
  display: flex;
  align-items: center;
  input {
    font-size: 1rem;
    border: none;
    text-align: center;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      color: #1877fe;
    }
  }
`

const Wave = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-right: 2rem;
`

const DateText = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`

const AddressInput = styled.input`
  border: none;
  border-bottom: 1px solid #c0c0c0;
  flex: 1 1 0;
  font-size: 1.5rem;
  width: 25rem;
  margin-top: 3rem;
  &:focus {
    outline: none;
  }
`

const TextArea = styled.textarea`
  font-size: 1.3rem;
  padding: 1rem;
  margin-top: 3rem;
  width: 100%;
  height: 15rem;
  border: 1px solid #c0c0c0;
  border-radius: 1rem;
  resize: none;

  &:focus {
    outline: none;
    border: 2px solid #c0c0c0;
  }
`
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
`

const ImgLabel = styled.label``

const SelectImgs = styled.span`
  margin-top: 2rem;
  min-height: 3rem;
`

const ImageInput = styled.input`
  display: none;
`

const TitleImg = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 0.5rem;
  padding: 0.3rem 0.3rem 0.3rem 0;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`

const ImgName = styled.span`
  margin-right: 0.5rem;

  &:not(:last-child)::after {
    content: ',';
  }
`

const HashtagBox = styled.div`
  display: flex;
  margin-top: 2rem;
  font-size: 1.2rem;
`

const TagBox = styled.div`
  display: flex;
`

const HashTagsInput = styled.input`
  border: none;
  width: 17rem;
  font-size: 1.2rem;
  &:focus {
    outline: none;
    border-bottom: 2px solid #6b7280;
  }
`

const TagName = styled.span`
  margin-right: 0.5rem;
  display: flex;

  &:not(:last-child)::after {
    content: ',';
  }
`

const TagDel = styled.div`
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: none;
  margin-left: 0.3rem;

  transition: background ease-in-out 0.1s;
  &:hover {
    background: #f0f0f0;
  }
`

const SubmitInput = styled.input`
  margin-top: 5rem;
  margin-left: auto;
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  background: #1877f2;
  border: none;
  border-radius: 0.5rem;
`
