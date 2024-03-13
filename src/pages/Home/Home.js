import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Delivery } from '../../components/Svg/svg';
import { HomeCard } from '../../components/Homecard/HomeCard';
import CatIcon from '../../components/CatIcon/CatIcon';
import './Home.scss';
import ProductSlider from '../../components/ProductSlider/ProductSlider';


export default function Home() {
  const productData = useSelector((state) => state.product.productList);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const bannerCardList =
    windowWidth < 513 || (windowWidth < 1300 && windowWidth > 930)
      ? productData.slice(20, 24)
      : productData.slice(20, 26);
  const loadingArray = 
  windowWidth < 513 || (windowWidth < 1300 && windowWidth > 930)
      ? new Array(4).fill(null)
      : new Array(6).fill(null);
  const homeProductVegetable = productData.filter((el) => el.category === 'Vegetable');
  const homeProductVegetableList = [...homeProductVegetable].reverse();
  return (
    <div className='home-wrap'>   
      <div className='banner-wrap'>
        <div className='gg-left-section'>
          <p className='gg-delivery'>
            Fastest Delivery <span><Delivery /></span>
          </p>
          <h2>
            Nature's best, farm-fresh <span>fruits and veggies daily.</span>
          </h2>
          <p>
            Maintaining a diet rich in fruits and veggies daily is essential for optimal health. These nutrient-packed foods provide vitamins, minerals, and fiber necessary for overall well-being. Incorporating a variety of colorful produce into your meals ensures a balanced diet, promoting vitality and longevity. Embrace nature's bounty for a healthier lifestyle.
          </p>
          <a href="#gg-cat123" className='order-btn'>Order Now</a>
        </div>
        <div className='gg-right-section'>
  {bannerCardList.length > 0 ?
    bannerCardList.map((val) => (
      <HomeCard key={val._id} val={val} />
    ))
     :
    loadingArray.map((val, i) => (
      <HomeCard key={i} val={val} />
    ))
  }
</div>
      </div>
      <section>
        <h2 className=''>Farm-fresh produce</h2>  
        <ProductSlider productList={homeProductVegetableList}  id="one" />
      </section>
      <CatIcon />
    </div>
  );
}
