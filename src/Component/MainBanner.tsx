import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled, {keyframes} from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
SwiperCore.use([Navigation, Pagination, Autoplay]) // *
import {bannerSwiper} from '../Mock/mainBanner'
import {FaExternalLinkAlt} from 'react-icons/fa'

export default function MainBanner() {
  const slide_settings = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 50,
    speed: 700,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    className: 'picture-swiper',
  }

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <BannerSwiper>
      <Swiper {...slide_settings}>
        {bannerSwiper.map((data, index) => (
          <SwiperSlide key={data.name}>
            <div className='swiper-slide'>
              <SwiperImage>
                <img key={index} src={data.image} alt={data.name} />
                <TextContentStyled style={{visibility: isVisible ? 'visible' : 'hidden'}}>
                  <p>{data.content}</p>
                  <Link to={data.link} target='_blank'>
                    <FaExternalLinkAlt />
                    {data.subContent}
                  </Link>
                </TextContentStyled>
              </SwiperImage>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerSwiper>
  )
}

const BannerSwiper = styled.section`
  width: 100%;
  padding-top: 4.2rem;
`
const SwiperImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  img {
    width: 100%;
    height: 41rem;
    object-fit: cover;
  }

  @media (max-width: 576px) {
    img {
      width: 100%;
      height: 35rem;
      object-fit: cover;
    }
  }
`
const slideIn = keyframes`
  from {
    bottom: -100%;
  }
  to {
    bottom: 0%;
  }
`
const TextContentStyled = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
  height: 12rem;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  color: #fff;
  bottom: -100%;
  animation-name: ${slideIn};
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  p {
    font-size: 3rem;
    font-weight: bold;
    font-align: left;
    z-index: 1;
    margin-bottom: 1rem;
  }
  svg {
    padding-right: 1rem;
  }
  a {
    margin-top: 2rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }

  @media (max-width: 576px) {
    p {
      font-size: 2.2rem;
      font-weight: bold;
      font-align: left;
      z-index: 1;
      margin-bottom: 1rem;
    }
  }
`
