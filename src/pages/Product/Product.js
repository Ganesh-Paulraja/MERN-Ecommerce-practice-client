import React, {useEffect} from 'react';
import './Product.scss';
import './Home.scss'
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import payIcon from '../../Images/payment-icons/payment.png';
import viewIcon from '../../Images/payment-icons/view.png';
import buyIcon from '../../Images/payment-icons/buy.png';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import CatIcon from '../../components/CatIcon/CatIcon';
import { addCartItem } from '../../Redux/productSlice';

function Product() {
  const { filterby } = useParams();
  const productData = useSelector(state => state.product.productList);
  const productDisplay = productData.filter(el => el._id === filterby);
  const homeProductVegetable = productData.filter((el) => el.category === 'Vegetable');
  const homeProductVegetableList = [...homeProductVegetable].reverse();
  const handleRandom = (min, max) => Math.floor(Math.random() * (max - min) ) + min;
  const dispatch = useDispatch();

  let price, forPrice;
  if (productDisplay.length > 0 && productDisplay[0].price) {
    price = Number(productDisplay[0].price);
    forPrice = price.toFixed(2);
  }
  const handleCartProduct = () => {
    dispatch(addCartItem(productData[0]))
  }
  useEffect(() => {
    window.scrollTo(0, 0); 
  }); 
  return (
     (
      <div className="product-wrap">
        {
          productDisplay.length > 0 ? 
          <div className="product-box">
          <div className="prodcut-left">
            <div className="pro-img">
              <img src={productDisplay[0].image} alt={productDisplay[0].name} />
            </div>
          </div>
          <div className="product-right">
            <div className="pro-name">
              {productDisplay[0].name}
            </div>
            <div className="pro-cat">
              {productDisplay[0].category}
            </div>
            <div className="pro-price">
              ${forPrice}
            </div>
            <div className="pro-desc">
            {productDisplay[0].description}
            </div>
            <div className='gg-social'>
              <div className="gg-view">
                <span className='gg-img'><img src={viewIcon} alt="view" />&nbsp;</span> <span className='gg-count'>{handleRandom(70, 200)}</span> People Viewed
                </div>
              <div className="gg-bought"><img src={buyIcon} alt="bought" />&nbsp;<span className='gg-img'></span> <span className='gg-count'>{handleRandom(10, 45)}</span> People Bought</div>
            </div>
            <div className="pro-cta">
              <button onClick={handleCartProduct}>Add to Cart</button>
            </div>
            <div className="pay-wrap">
              <img src={payIcon} alt="" />
            </div>
          </div>
        </div> 
        : 
          <div className="pro-loading">
            Loading...
          </div>
        }
        
        <section>
        <h2 className=''>Farm-fresh produce</h2>  
        <ProductSlider productList={homeProductVegetableList} id="one" />
      </section>
      <CatIcon />
      </div>
    ) 
  );
}

export default Product;