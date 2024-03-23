import React, {useRef, useEffect, useState }  from 'react'
import './ProductSlider.scss'
import leftArrow from '../../Images/home/leftarrow.svg';
import rightArrow from '../../Images/home/rightarrow.svg';
import CartFuture from '../CartFuture/CartFuture';
import 'swiper/swiper.min.css'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// npm i swiper swiper-react

export default function ProductSlider({productList, id}) {
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef(null);
  let product = productList;
  const loadingArray = new Array(6).fill(null)
  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.updateSize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log(productList);
  useEffect(() => {
    setSwiperKey((prevKey) => prevKey + 1);
  }, [productList]);
  const breakpoints = {
    50: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 2,
    },
    700: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1400: {
      slidesPerView: 6,
    },
  };
  return (
    <div className={`slider-wrap slider-wrap-${id}`}>
      <Swiper
        key={swiperKey}
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={6}
        breakpoints={breakpoints}
        direction='horizontal' 
        navigation={{
          nextEl: `.swiper-button-next-${id}`,
          prevEl: `.swiper-button-prev-${id}`,
        }}
      >
        {product[0] ? product.map((val) => (
          <SwiperSlide key={val._id}>
            <div className="slide-ele">
              <CartFuture val={val} />
            </div>
          </SwiperSlide>
        ))
        :
        loadingArray.map((val, i) => (
          <SwiperSlide key={i}>
            <div className="slide-ele">
              <CartFuture val={val} />
            </div>
          </SwiperSlide>
        ))
        }
      </Swiper>
      <div className={`swiper-button-next swiper-button-next-${id}`}>
        <img src={rightArrow} alt='next' />
      </div>
      <div className={`swiper-button-prev swiper-button-prev-${id}`}>
        <img src={leftArrow} alt='previous' />
      </div>
    </div>
  )
}
